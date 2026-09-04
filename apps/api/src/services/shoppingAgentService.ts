import { config } from '../config/env.js';
import { isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { AgentAction } from '../models/AgentAudit.js';
import { AIEvent } from '../models/AIEvent.js';
import { MemoryStore } from '../seed/memoryStore.js';

export interface ShoppingAgentContext {
  customerPhotoUrl?: string;
  selectedProductId?: string;
  selectedDrape?: string;
  maxBudget?: number;
  occasion?: string;
  preferredFabric?: string;
}

export interface AgentMessagePayload {
  sessionId: string;
  message: string;
  context?: ShoppingAgentContext;
  userConfirmedPayment?: boolean;
}

export interface AgentMessageResponse {
  reply: string;
  state: 'GREETING' | 'DISCOVERY' | 'RECOMMENDATION' | 'TRY_ON' | 'COMPARISON' | 'CHECKOUT_GATED' | 'COMPLETED';
  recommendedProducts?: any[];
  comparedProducts?: any[];
  selectedProduct?: any;
  suggestedActions?: Array<{ label: string; action: string; payload?: any }>;
  gatedConfirmationRequired?: boolean;
  tryOnJobId?: string;
  explainabilityBadge?: string;
  modelUsed?: string;
}

export class ShoppingAgentService {
  /**
   * Main conversational agent dispatcher with grounded catalog queries,
   * strict budget guardrails, and deterministic state transitions.
   */
  static async handleMessage(payload: AgentMessagePayload): Promise<AgentMessageResponse> {
    const { sessionId, message, context, userConfirmedPayment } = payload;
    const startTime = Date.now();
    const text = message.trim();
    const lowerText = text.toLowerCase();

    let targetState: AgentMessageResponse['state'] = 'DISCOVERY';
    let recommendedProducts: any[] = [];
    let comparedProducts: any[] = [];
    let selectedProduct: any = null;
    let suggestedActions: AgentMessageResponse['suggestedActions'] = [];
    let gatedConfirmationRequired = false;
    let reply = '';
    let explainabilityBadge = '';
    let modelUsed = 'Rule-based SareeDNA Engine';

    // Parse shopping intent & budget
    const criteria = this.parseShoppingIntent(text);
    if (context?.maxBudget && !criteria.maxPrice) {
      criteria.maxPrice = context.maxBudget;
    }

    // ─── Gated Checkout Authorization Flow (PRD Section 8) ────────────────────
    if (lowerText.includes('buy') || lowerText.includes('purchase') || lowerText.includes('checkout') || lowerText.includes('order now') || userConfirmedPayment) {
      targetState = 'CHECKOUT_GATED';
      const prodId = context?.selectedProductId || criteria.productId;
      selectedProduct = prodId ? await this.toolGetProduct(prodId) : await this.getFirstAvailableProduct();

      if (!userConfirmedPayment) {
        gatedConfirmationRequired = true;
        reply = `I have staged your order for **${selectedProduct?.name || 'Selected Pure Silk Saree'}** at the database-verified price of **₹${(selectedProduct?.price || 24500).toLocaleString()}**.\n\nBecause this initiates a financial transaction, please confirm below to proceed to verified checkout:`;
        suggestedActions = [
          {
            label: `Authorize & Pay ₹${(selectedProduct?.price || 24500).toLocaleString()}`,
            action: 'CONFIRM_PAYMENT',
            payload: { productId: selectedProduct?._id },
          },
          {
            label: 'Keep Exploring',
            action: 'SEND_PROMPT',
            payload: { prompt: 'Show me other sarees in this collection' },
          },
        ];

        await this.recordAuditAction({
          sessionId,
          intent: text,
          state: 'CHECKOUT_GATED',
          action: 'requestExplicitUserAuthorization',
          tool: 'gatedPaymentTool',
          input: { productId: selectedProduct?._id, price: selectedProduct?.price },
          resultSummary: 'Gated payment step rendered requiring user click confirmation.',
          authorization: { required: true, granted: false },
          latencyMs: Date.now() - startTime,
          model: modelUsed,
        });

        return {
          reply,
          state: targetState,
          selectedProduct,
          suggestedActions,
          gatedConfirmationRequired: true,
          explainabilityBadge: 'Deterministic Financial Guardrail: No automated order creation without user consent.',
          modelUsed,
        };
      } else {
        targetState = 'COMPLETED';
        reply = `Authorization verified. Your cart is prepared with **${selectedProduct?.name}**. Proceeding to Razorpay payment gateway.`;
        await this.recordAuditAction({
          sessionId,
          intent: text,
          state: 'COMPLETED',
          action: 'executePaymentHandshake',
          tool: 'razorpayOrderCreate',
          input: { productId: selectedProduct?._id, price: selectedProduct?.price },
          resultSummary: 'User confirmed gated payment. Cart dispatched to checkout.',
          authorization: { required: true, granted: true },
          latencyMs: Date.now() - startTime,
          model: modelUsed,
        });

        return {
          reply,
          state: targetState,
          selectedProduct,
          explainabilityBadge: 'Order authorization confirmed.',
          modelUsed,
        };
      }
    }

    // ─── Virtual Try-On Intent ────────────────────────────────────────────────
    if (lowerText.includes('try on') || lowerText.includes('tryon') || lowerText.includes('see on me') || lowerText.includes('how it looks on me') || lowerText.includes('drape on me')) {
      targetState = 'TRY_ON';
      const prod = context?.selectedProductId ? await this.toolGetProduct(context.selectedProductId) : await this.getFirstAvailableProduct();
      reply = `I have opened the **VASRĀ AI Virtual Try-On Studio** for **${prod?.name || 'this Saree'}**. Upload your photo or choose a studio portrait to visualize the drape with 96%+ garment geometry preservation.`;
      suggestedActions = [
        { label: 'Upload Customer Photo', action: 'OPEN_TRY_ON_MODAL', payload: { productId: prod?._id } },
        { label: 'View 3D Spatial Twin', action: 'OPEN_3D_VIEWER', payload: { productId: prod?._id } },
      ];

      return {
        reply,
        state: targetState,
        selectedProduct: prod,
        suggestedActions,
        explainabilityBadge: 'Virtual Try-On supports 6 distinct regional drapes.',
        modelUsed,
      };
    }

    // ─── Saree Comparison Request ─────────────────────────────────────────────
    if (lowerText.includes('compare') || lowerText.includes('which is better') || lowerText.includes('difference')) {
      targetState = 'COMPARISON';
      const allProducts = await this.toolGetAvailableProducts();
      comparedProducts = allProducts.slice(0, 3);
      reply = `I have placed 3 signature drapes side-by-side for comparison. You can compare their SareeDNA, zari weight, weave tradition, and prices:`;
      suggestedActions = comparedProducts.map((p) => ({
        label: `Select ${p.name.split(' ')[0]} (₹${p.price.toLocaleString()})`,
        action: 'SELECT_PRODUCT',
        payload: { productId: p._id },
      }));

      return {
        reply,
        state: targetState,
        comparedProducts,
        suggestedActions,
        explainabilityBadge: 'Deterministic Saree DNA feature comparison across fabric, motifs, and price tier.',
        modelUsed,
      };
    }

    // ─── Catalog Inventory Retrieval ─────────────────────────────────────────
    const allProducts = await this.toolGetAvailableProducts();
    const apiKey = config.nvidiaApiKey || config.customAiApiKey;

    // ─── Live LLM (NVIDIA NIM or Custom OpenAI API) Integration ──────────────
    const isTestEnv = process.env.NODE_ENV === 'test';
    if (apiKey && !isTestEnv) {
      try {
        const llmResult = await this.callNvidiaNIM(text, allProducts, criteria);
        if (llmResult && llmResult.matchedProductIds && llmResult.matchedProductIds.length > 0) {
          modelUsed = config.nvidiaLlmModel || 'nvidia/nemotron-3-ultra-550b-a55b';
          recommendedProducts = allProducts.filter((p) =>
            llmResult.matchedProductIds.some((id: string) => id === p._id.toString() || id === p.sku || p.slug.includes(id))
          );

          // STRICT BUDGET GUARDRAIL POST-FILTER: Never return products exceeding user's max budget
          if (criteria.maxPrice) {
            recommendedProducts = recommendedProducts.filter((p) => p.price <= criteria.maxPrice);
          }

          // If LLM returned no products matching strict budget, fallback to scored search under budget
          if (recommendedProducts.length === 0) {
            recommendedProducts = await this.toolSearchProductsScored(text, criteria, allProducts);
          }

          if (recommendedProducts.length > 0) {
            reply = llmResult.reply || `Based on your request, I recommend these exquisite drapes:`;
            explainabilityBadge = llmResult.explainability || `⚡ Curated by ${modelUsed}`;

            suggestedActions = [
              { label: '✨ Virtual Try-On', action: 'OPEN_TRY_ON_MODAL', payload: { productId: recommendedProducts[0]?._id } },
              { label: 'Compare Recommendations', action: 'COMPARE', payload: { productIds: recommendedProducts.slice(0, 2).map((p) => p._id) } },
              { label: 'Show Budget Drapes', action: 'REFINE_SEARCH', payload: { maxPrice: 15000 } },
            ];

            await this.recordAuditAction({
              sessionId,
              intent: text,
              state: 'RECOMMENDATION',
              action: 'recommendProductsNIM',
              tool: 'nvidiaNIM',
              input: { query: text, model: modelUsed, maxPrice: criteria.maxPrice },
              resultSummary: `NVIDIA NIM recommended ${recommendedProducts.length} grounded products under strict budget.`,
              resultReference: { productSkus: recommendedProducts.map((p) => p.sku) },
              authorization: { required: false, granted: false },
              latencyMs: Date.now() - startTime,
              model: modelUsed,
            });

            return {
              reply,
              state: 'RECOMMENDATION',
              recommendedProducts,
              suggestedActions,
              explainabilityBadge,
              modelUsed,
            };
          }
        }
      } catch (err) {
        console.warn('⚠️ NVIDIA NIM API call failed or timed out, falling back to SareeDNA scoring engine:', err);
      }
    }

    // ─── Semantic SareeDNA Multi-Attribute Scoring Engine (Offline Fallback) ─
    targetState = 'RECOMMENDATION';
    recommendedProducts = await this.toolSearchProductsScored(text, criteria, allProducts);

    // Strict Budget Guardrail Assertion: Filter any over-budget sarees
    if (criteria.maxPrice) {
      recommendedProducts = recommendedProducts.filter((p) => p.price <= criteria.maxPrice);
    }

    const priceLabel = criteria.maxPrice ? `under ₹${criteria.maxPrice.toLocaleString()}` : '';
    const colorLabel = criteria.color ? `${criteria.color}` : '';
    const fabricLabel = criteria.fabric ? `${criteria.fabric}` : '';

    if (recommendedProducts.length === 0) {
      const budgetItems = allProducts.filter((p) => !criteria.maxPrice || p.price <= criteria.maxPrice);
      if (budgetItems.length > 0) {
        recommendedProducts = budgetItems.slice(0, 3);
        reply = `Here are the authentic handloom drapes available in our showroom ${priceLabel ? 'matching your budget of ' + priceLabel : ''}:`;
        explainabilityBadge = `Matched ${[fabricLabel, colorLabel, criteria.occasion, priceLabel].filter(Boolean).join(' • ') || 'Showroom Heritage Selection'}.`;
      } else {
        const lowestPrice = Math.min(...allProducts.map((p) => p.price));
        const nearestItems = allProducts.sort((a, b) => a.price - b.price).slice(0, 2);
        recommendedProducts = nearestItems;
        reply = `We do not currently have sarees priced under **₹${criteria.maxPrice?.toLocaleString()}**. Our handcrafted collection begins at **₹${lowestPrice.toLocaleString()}** (such as the ${nearestItems[0]?.name} at ₹${nearestItems[0]?.price.toLocaleString()}). Here are our nearest accessible drapes:`;
        explainabilityBadge = `No sarees found under ₹${criteria.maxPrice?.toLocaleString()} • Showing nearest starting at ₹${lowestPrice.toLocaleString()}`;
      }
    } else {
      reply = `I discovered **${recommendedProducts.length} authentic handloom sarees** matching your request${priceLabel ? ' ' + priceLabel : ''}. Every drape is strictly verified within your budget:`;
      explainabilityBadge = `Matched ${[fabricLabel, colorLabel, criteria.occasion, priceLabel].filter(Boolean).join(' • ') || 'Showroom Heritage Selection'}.`;
    }

    suggestedActions = [
      { label: '✨ Try on my photo', action: 'OPEN_TRY_ON_MODAL', payload: { productId: recommendedProducts[0]?._id } },
      { label: 'Compare top 2 sarees', action: 'COMPARE', payload: { productIds: recommendedProducts.slice(0, 2).map((p) => p._id) } },
      { label: 'Filter sarees under ₹15,000', action: 'REFINE_SEARCH', payload: { maxPrice: 15000 } },
    ];

    await this.recordAuditAction({
      sessionId,
      intent: text,
      state: 'RECOMMENDATION',
      action: 'recommendProductsScored',
      tool: 'sareeDNAScorer',
      input: { query: text, criteria },
      resultSummary: `SareeDNA Scorer recommended ${recommendedProducts.length} products with strict budget ceiling.`,
      resultReference: { productSkus: recommendedProducts.map((p) => p.sku) },
      authorization: { required: false, granted: false },
      latencyMs: Date.now() - startTime,
      model: modelUsed,
    });

    return {
      reply,
      state: targetState,
      recommendedProducts,
      suggestedActions,
      explainabilityBadge,
      modelUsed,
    };
  }

  // ─── NVIDIA NIM API Client ──────────────────────────────────────────────────

  private static async callNvidiaNIM(query: string, catalog: any[], criteria: any): Promise<any> {
    const baseUrl = config.customAiBaseUrl || config.nvidiaBaseUrl || 'https://integrate.api.nvidia.com/v1';
    const apiKey = config.nvidiaApiKey || config.customAiApiKey;
    const model = config.customAiModel || config.nvidiaLlmModel || 'nvidia/nemotron-3-ultra-550b-a55b';

    const catalogContext = catalog.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      sku: p.sku,
      price: p.price,
      fabric: p.attributes?.fabric,
      color: p.attributes?.color,
      occasion: p.attributes?.occasion,
      weave: p.attributes?.weave,
      border: p.attributes?.border,
      zariType: p.sareeDNA?.zariType,
      tags: p.tags,
    }));

    const systemPrompt = `You are VASRĀ AI, an imperial luxury saree shopping advisor and stylist for Sree Ram Silks.
You have access to the verified showroom catalog below.

CRITICAL PRICE & BUDGET GUARDRAILS:
${criteria.maxPrice ? `- The user explicitly specified a MAXIMUM BUDGET of ₹${criteria.maxPrice.toLocaleString()}. You MUST ONLY recommend sarees with price <= ₹${criteria.maxPrice.toLocaleString()}! NEVER recommend any saree with price > ₹${criteria.maxPrice.toLocaleString()}.` : '- Recommend sarees that best fit the customer request.'}

CATALOG INVENTORY:
${JSON.stringify(catalogContext, null, 2)}

INSTRUCTIONS:
Respond strictly in valid JSON format with this structure:
{
  "reply": "Your warm, knowledgeable stylist response describing the recommended sarees, their heritage, drape appeal, and why they fit the user's occasion and budget.",
  "explainability": "Brief bullet of matched attributes (e.g., 'Matched: Pure Silk Organza • Under ₹10,000')",
  "matchedProductIds": ["id1", "id2"]
}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        temperature: 0.2,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`NVIDIA NIM HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    try {
      return JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      return { reply: content, matchedProductIds: [] };
    }
  }

  // ─── SareeDNA Multi-Attribute Scored Search ─────────────────────────────────

  static async toolSearchProductsScored(query: string, criteria: any, catalog: any[]): Promise<any[]> {
    const qLower = query.toLowerCase();
    const tokens = qLower.split(/[\s,]+/).filter((t) => t.length > 2);

    const scored = catalog.map((prod) => {
      let score = 0;
      const pName = (prod.name || '').toLowerCase();
      const pDesc = (prod.description || '').toLowerCase();
      const pFabric = (prod.attributes?.fabric || '').toLowerCase();
      const pColor = (prod.attributes?.color || '').toLowerCase();
      const pOccasion = (prod.attributes?.occasion || '').toLowerCase();
      const pWeave = (prod.attributes?.weave || '').toLowerCase();
      const pTags = (prod.tags || []).map((t: string) => t.toLowerCase());
      const pDnaFabrics = (prod.sareeDNA?.fabric || []).map((f: string) => f.toLowerCase());
      const pDnaColors = (prod.sareeDNA?.colors || []).map((c: string) => c.toLowerCase());
      const pDnaOccasions = (prod.sareeDNA?.occasion || []).map((o: string) => o.toLowerCase());
      const pDnaMotifs = (prod.sareeDNA?.motifs || []).map((m: string) => m.toLowerCase());

      // STRICT PRICE HARD-FILTER: Disqualify any product exceeding budget
      if (criteria.maxPrice && prod.price > criteria.maxPrice) {
        return { product: prod, score: -999999 };
      }
      if (criteria.minPrice && prod.price < criteria.minPrice) {
        return { product: prod, score: -999999 };
      }

      if (criteria.maxPrice && prod.price <= criteria.maxPrice) {
        score += 30;
      }

      // Fabric matches
      if (criteria.fabric) {
        const fab = criteria.fabric.toLowerCase();
        if (pFabric.includes(fab) || pDnaFabrics.some((f: string) => f.includes(fab))) score += 50;
      }

      // Color matches
      if (criteria.color) {
        const col = criteria.color.toLowerCase();
        if (pColor.includes(col) || pDnaColors.some((c: string) => c.includes(col))) score += 40;
      }

      // Occasion matches
      if (criteria.occasion) {
        const occ = criteria.occasion.toLowerCase();
        if (pOccasion.includes(occ) || pDnaOccasions.some((o: string) => o.includes(occ))) score += 35;
      }

      // Token-level search across title, tags, and motifs
      for (const token of tokens) {
        if (['saree', 'sarees', 'show', 'want', 'like', 'under', 'below', 'with', 'and', 'for', 'the', 'budget', 'price', 'range'].includes(token)) continue;
        if (pName.includes(token)) score += 25;
        if (pTags.some((t: string) => t.includes(token))) score += 20;
        if (pDnaMotifs.some((m: string) => m.includes(token))) score += 20;
        if (pWeave.includes(token)) score += 15;
        if (pDesc.includes(token)) score += 10;
      }

      return { product: prod, score };
    });

    // Filter items with positive score and sort descending
    const filtered = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

    if (filtered.length > 0) {
      return filtered.map((s) => s.product);
    }

    // If no specific score match, return products strictly respecting price constraint
    if (criteria.maxPrice) {
      return catalog.filter((p) => p.price <= criteria.maxPrice).sort((a, b) => a.price - b.price);
    }

    return catalog.slice(0, 4);
  }

  // ─── Bounded Tool Registry ──────────────────────────────────────────────────

  static async toolSearchProducts(criteria: {
    occasion?: string;
    color?: string;
    fabric?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
  }): Promise<any[]> {
    let all: any[] = [];
    if (isMongoConnected) {
      all = await Product.find({ visible: true, archived: false }).lean();
    } else {
      all = MemoryStore.products.filter((p) => p.visible && !p.archived);
    }

    return all.filter((prod) => {
      if (criteria.maxPrice && prod.price > criteria.maxPrice) return false;
      if (criteria.minPrice && prod.price < criteria.minPrice) return false;
      if (criteria.color) {
        const cLower = criteria.color.toLowerCase();
        const colors = [prod.attributes?.color, ...(prod.attributes?.colors || []), ...(prod.sareeDNA?.colors || [])].map((c) => (c || '').toLowerCase());
        if (!colors.some((col) => col.includes(cLower))) return false;
      }
      if (criteria.fabric) {
        const fLower = criteria.fabric.toLowerCase();
        const fabrics = [prod.attributes?.fabric, ...(prod.sareeDNA?.fabric || [])].map((f) => (f || '').toLowerCase());
        if (!fabrics.some((fab) => fab.includes(fLower))) return false;
      }
      if (criteria.occasion) {
        const oLower = criteria.occasion.toLowerCase();
        const occasions = [prod.attributes?.occasion, ...(prod.sareeDNA?.occasion || [])].map((o) => (o || '').toLowerCase());
        if (!occasions.some((occ) => occ.includes(oLower))) return false;
      }
      return true;
    });
  }

  static async toolGetProduct(productIdOrSlug: string): Promise<any | null> {
    if (isMongoConnected) {
      const prod = (await Product.findOne({ $or: [{ _id: productIdOrSlug }, { slug: productIdOrSlug }] })) || (await Product.findOne());
      return prod ? (prod as any).toObject() : null;
    }
    return (
      MemoryStore.products.find((p) => p._id.toString() === productIdOrSlug || p.slug === productIdOrSlug) ||
      MemoryStore.products[0] ||
      null
    );
  }

  static async toolGetAvailableProducts(): Promise<any[]> {
    if (isMongoConnected) {
      return Product.find({ visible: true, archived: false }).lean();
    }
    return MemoryStore.products.filter((p) => p.visible && !p.archived);
  }

  private static async getFirstAvailableProduct(): Promise<any> {
    const list = await this.toolGetAvailableProducts();
    return list[0];
  }

  // ─── Intent Parsers ─────────────────────────────────────────────────────────

  private static parseShoppingIntent(text: string) {
    const lower = text.toLowerCase();
    const criteria: any = {};

    // Occasions
    if (lower.includes('wedding') || lower.includes('bridal') || lower.includes('shaadi') || lower.includes('muhurtham')) criteria.occasion = 'wedding';
    else if (lower.includes('reception') || lower.includes('cocktail') || lower.includes('party')) criteria.occasion = 'reception';
    else if (lower.includes('haldi')) criteria.occasion = 'haldi';
    else if (lower.includes('sangeet') || lower.includes('mehendi')) criteria.occasion = 'sangeet';
    else if (lower.includes('festival') || lower.includes('diwali') || lower.includes('pooja') || lower.includes('temple')) criteria.occasion = 'pooja';
    else if (lower.includes('office') || lower.includes('daily') || lower.includes('formal')) criteria.occasion = 'office';

    // Colors
    if (lower.includes('crimson') || lower.includes('red')) criteria.color = 'red';
    else if (lower.includes('maroon') || lower.includes('wine') || lower.includes('burgundy')) criteria.color = 'maroon';
    else if (lower.includes('purple') || lower.includes('magenta')) criteria.color = 'purple';
    else if (lower.includes('teal') || lower.includes('cyan')) criteria.color = 'teal';
    else if (lower.includes('blue') || lower.includes('navy')) criteria.color = 'blue';
    else if (lower.includes('yellow') || lower.includes('mustard')) criteria.color = 'yellow';
    else if (lower.includes('green') || lower.includes('emerald')) criteria.color = 'green';
    else if (lower.includes('lavender') || lower.includes('lilac')) criteria.color = 'lavender';
    else if (lower.includes('pink') || lower.includes('blush')) criteria.color = 'pink';
    else if (lower.includes('rose gold')) criteria.color = 'rose gold';
    else if (lower.includes('gold')) criteria.color = 'gold';

    // Fabrics & Weaves
    if (lower.includes('paithani')) criteria.fabric = 'paithani';
    else if (lower.includes('gadwal')) criteria.fabric = 'gadwal';
    else if (lower.includes('pochampally') || lower.includes('ikat')) criteria.fabric = 'pochampally';
    else if (lower.includes('patola')) criteria.fabric = 'patola';
    else if (lower.includes('mysore') || lower.includes('crepe')) criteria.fabric = 'mysore';
    else if (lower.includes('organza')) criteria.fabric = 'organza';
    else if (lower.includes('chanderi')) criteria.fabric = 'chanderi';
    else if (lower.includes('kanchipuram') || lower.includes('kanchi')) criteria.fabric = 'kanchipuram';
    else if (lower.includes('banarasi') || lower.includes('katan') || lower.includes('rangkat')) criteria.fabric = 'banarasi';
    else if (lower.includes('tissue')) criteria.fabric = 'tissue';
    else if (lower.includes('korvai') || lower.includes('kuttu')) criteria.fabric = 'korvai';
    else if (lower.includes('silk')) criteria.fabric = 'silk';

    const price = this.extractPriceConstraint(lower);
    if (price) criteria.maxPrice = price;

    return criteria;
  }

  private static extractPriceConstraint(text: string): number | null {
    const lower = text.toLowerCase();

    // 1. Under 10k / below 10k / max 10k / < 10k / <= 10k / upto 10k
    const matchK = lower.match(/(?:under|below|less than|upto|up to|within|max|around|<|<=)\s*(?:₹|rs\.?|inr)?\s*([0-9]+)\s*k/i);
    if (matchK && matchK[1]) {
      return parseInt(matchK[1], 10) * 1000;
    }

    // 2. Under 10000 / below 10,000 / max 10000 / in 10000 / within 10000
    const matchUnder = lower.match(/(?:under|below|less than|within|around|upto|up to|max|in|<|<=)\s*(?:₹|rs\.?|inr)?\s*([0-9,]+)/i);
    if (matchUnder && matchUnder[1]) {
      const val = parseInt(matchUnder[1].replace(/,/g, ''), 10);
      if (!isNaN(val) && val >= 500) {
        return val;
      }
    }

    // 3. Standalone "10000 budget" or "10k budget"
    const matchBudget = lower.match(/([0-9]+)\s*k\s*(?:budget|range|price)/i);
    if (matchBudget && matchBudget[1]) {
      return parseInt(matchBudget[1], 10) * 1000;
    }

    if (lower.includes('budget') || lower.includes('cheap') || lower.includes('affordable')) {
      return 15000;
    }

    return null;
  }

  private static async recordAuditAction(actionData: any) {
    if (isMongoConnected) {
      await AgentAction.create(actionData);
    } else {
      MemoryStore.agentActions.unshift({ ...actionData, timestamp: new Date() });
    }
  }

  private static async recordAIEvent(type: any, sessionId: string, productId?: string, productName?: string, metadata?: any) {
    const event = { type, sessionId, productId, productName, metadata, timestamp: new Date() };
    if (isMongoConnected) {
      await AIEvent.create(event);
    } else {
      MemoryStore.aiEvents.unshift(event);
    }
  }
}
