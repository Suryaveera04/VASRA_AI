import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { MemoryStore } from '../seed/memoryStore.js';
import { PaymentService } from '../services/paymentService.js';

/**
 * Exposes a machine-readable, agent-consumable catalog schema.
 * Standardized endpoint for AI Buyers, LLM crawlers, and Autonomous Agents.
 */
export async function getAgentReadableCatalog(req: Request, res: Response) {
  try {
    let products: any[] = [];
    if (isMongoConnected) {
      products = await Product.find({ visible: { $ne: false }, archived: { $ne: true } }).lean();
    } else {
      products = MemoryStore.products.filter(
        (p) => p.visible !== false && !p.archived && (p.availability === 'AVAILABLE' || p.availability === undefined || (p.stock && p.stock > 0))
      );
    }

    const agentCatalog = products.map((p) => ({
      id: p._id.toString(),
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      price: p.price,
      currency: p.currency || 'INR',
      availability: p.availability,
      category: p.categoryName || p.categoryId,
      fabric: p.attributes?.fabric,
      color: p.attributes?.color,
      sareeDNA: p.sareeDNA,
      tryOnAvailable: p.tryOn?.enabled ?? true,
      supportedDrapes: p.tryOn?.supportedDrapes || ['Nivi', 'Bengali', 'Gujarati', 'Modern'],
      images: p.images?.map((img: any) => img.url) || [],
      directPurchaseUrl: `/product/${p.slug}`,
      agenticPurchaseEndpoint: '/api/v1/catalog/ai/transact',
    }));

    res.json({
      success: true,
      version: '2.0.0',
      protocol: 'VASRA_AGENTIC_COMMERCE_V2',
      merchant: {
        name: 'VASRĀ AI Showroom (Sree Ram Silks)',
        currency: 'INR',
        paymentGateway: 'Razorpay',
        supportsAgenticTransactions: true,
      },
      catalogSize: agentCatalog.length,
      catalog: agentCatalog,
      products: agentCatalog,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * AI Buyer Interface: Allows autonomous AI agents to transact on behalf of external buyers.
 */
export async function transactAIBuyer(req: Request, res: Response) {
  try {
    const { buyerAgentId, productId, quantity, buyerCustomer, authorizationProof } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, error: 'Product ID required for AI transaction' });
    }

    const orderResult = await PaymentService.createRazorpayOrder({
      sessionId: `agent_buyer_${buyerAgentId || 'ext_agent'}_${Date.now()}`,
      items: [{ productId, quantity: quantity || 1, selectedDrape: 'Nivi' }],
      customer: buyerCustomer || {
        name: `AI Buyer (${buyerAgentId || 'Autonomous Agent'})`,
        email: 'ai-buyer@agentnetwork.io',
        phone: '+919876543210',
      },
      source: 'AI_AGENT',
      aiExplanation: `Transacted autonomously via AI Buyer API. Authorization proof: ${authorizationProof || 'VERIFIED_AGENT_SIGNATURE'}`,
    });

    res.status(201).json({
      success: true,
      message: 'Autonomous AI purchase order prepared.',
      transaction: orderResult,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}
