import { Request, Response } from 'express';
import { SareeDNAService } from '../services/sareeDNAService.js';
import { AIJobQueue } from '../services/aiJobQueue.js';
import { ShoppingAgentService } from '../services/shoppingAgentService.js';
import { imageAIProvider } from '../services/imageAIProvider.js';
import { config, updateRuntimeAIConfig } from '../config/env.js';

export async function chatWithShoppingAgent(req: Request, res: Response) {
  try {
    const { sessionId, message, context, userConfirmedPayment } = req.body;
    const response = await ShoppingAgentService.handleMessage({
      sessionId,
      message,
      context,
      userConfirmedPayment,
    });
    res.json({ success: true, data: response });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function requestVirtualTryOn(req: Request, res: Response) {
  try {
    const { customerPhotoUrl, sareeImageUrl, sareeName, drapeStyle, sareeAssets, sareeDNA } = req.body;

    // Validate photo first
    const validation = await imageAIProvider.validateCustomerPhoto(customerPhotoUrl);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.feedbackMessage || 'Photo validation failed',
        validation,
      });
    }

    const jobId = await AIJobQueue.createJob('TRY_ON', 'HIGH', {
      customerPhotoUrl,
      sareeImageUrl,
      sareeName,
      drapeStyle: drapeStyle || 'Nivi',
      sareeAssets,
      sareeDNA,
    });

    res.status(202).json({
      success: true,
      data: {
        jobId,
        status: 'QUEUED',
        message: 'Virtual Try-On generation enqueued with high priority.',
        validation,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getJobStatus(req: Request, res: Response) {
  try {
    const { jobId } = req.params;
    const job = await AIJobQueue.getJob(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'AI Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function analyzeGarment(req: Request, res: Response) {
  try {
    const { imageUrl, sareeName } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, error: 'Garment image URL is required' });
    }

    const result = await SareeDNAService.analyzeGarmentImage(imageUrl, sareeName);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function generateModelPhotos(req: Request, res: Response) {
  try {
    const { sareeImageUrl, sareeName, modelProfile, pose, background, lighting, cameraFraming } = req.body;
    const jobId = await AIJobQueue.createJob('MODEL_PHOTO', 'MEDIUM', {
      sareeImageUrl,
      sareeName,
      modelProfile,
      pose,
      background,
      lighting,
      cameraFraming,
    });

    res.status(202).json({
      success: true,
      data: {
        jobId,
        status: 'QUEUED',
        message: 'AI Model Photography rendering started.',
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function generateCampaign(req: Request, res: Response) {
  try {
    const { prompt, collectionTitle } = req.body;

    const campaign = {
      title: `Imperial Splendor: ${collectionTitle || 'Royal Wedding Silk Edit'}`,
      targetAudience: 'Bridal parties, wedding attendees, and heritage textile connoisseurs',
      headline: 'Draped in 24K Gold: The Ultimate Wedding Silk Showcase',
      description: 'Discover master-crafted Kanchipuram and Banarasi handlooms designed for unforgettable moments.',
      whatsAppCopy: `👑 *VASRĀ AI Exclusive Showroom Drop*\n\nCelebrate your special moments with authentic 24K Gold Zari Kanchipuram & Banarasi silk sarees.\n\n✨ *Virtual Try-On now live:* Visualize how any saree looks on your photo before ordering.\n\n🛍️ *Shop the new collection:* https://vasra.ai/catalog\n\n_Reply to this message for bespoke bridal curation._`,
      instagramCaption: `Elegance woven across centuries. Step into the VASRĀ AI digital showroom and experience the confluence of heritage handlooms and AI virtual draping. ✨\n\n#SareeStyle #KanchipuramSilk #VASRAAI #HandloomHeritage #BridalSaree #IndianFashion`,
      bannerConcept: {
        background: 'Imperial Palace Sunset with Gold Particle Ambient Glow',
        focalElement: 'Model A in Crimson Gold Zari Drape holding raw silk warp threads',
        ctaText: 'Experience Virtual Try-On',
      },
      createdAt: new Date(),
    };

    res.json({ success: true, data: campaign });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getAISettings(req: Request, res: Response) {
  try {
    const hasNvidiaKey = Boolean(config.nvidiaApiKey && config.nvidiaApiKey.length > 5);
    const maskedKey = hasNvidiaKey
      ? `${config.nvidiaApiKey.slice(0, 7)}...${config.nvidiaApiKey.slice(-4)}`
      : '';

    res.json({
      success: true,
      data: {
        hasNvidiaKey,
        maskedKey,
        nvidiaLlmModel: config.nvidiaLlmModel,
        nvidiaImageModel: config.nvidiaImageModel,
        nvidiaBaseUrl: config.nvidiaBaseUrl,
        customAiApiKey: config.customAiApiKey ? '********' : '',
        customAiBaseUrl: config.customAiBaseUrl,
        customAiModel: config.customAiModel,
        availableLlmModels: [
          { id: 'nvidia/nemotron-3-ultra-550b-a55b', name: 'NVIDIA Nemotron-3-Ultra-550B (Ultra Deep Reasoning — Recommended)' },
          { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'NVIDIA Nemotron-70B Instruct (High Precision Styling)' },
          { id: 'nvidia/nemotron-3-super-120b-a12b', name: 'NVIDIA Nemotron-3-Super-120B (High Speed & Fidelity)' },
          { id: 'mistralai/mistral-large-2-instruct', name: 'Mistral Large 2 (Multi-lingual & Fast)' },
        ],
        availableImageModels: [
          { id: 'black-forest-labs/flux-1-dev', name: 'Black Forest Labs FLUX.1-dev (Photorealistic Textures)' },
          { id: 'stabilityai/stable-diffusion-xl-base-1.0', name: 'Stability AI SDXL 1.0 (Studio Renders)' },
        ],
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateAISettings(req: Request, res: Response) {
  try {
    const { nvidiaApiKey, nvidiaLlmModel, nvidiaImageModel, customAiApiKey, customAiBaseUrl, customAiModel } = req.body;

    updateRuntimeAIConfig({
      nvidiaApiKey: nvidiaApiKey !== undefined ? nvidiaApiKey : undefined,
      nvidiaLlmModel: nvidiaLlmModel !== undefined ? nvidiaLlmModel : undefined,
      nvidiaImageModel: nvidiaImageModel !== undefined ? nvidiaImageModel : undefined,
      customAiApiKey: customAiApiKey !== undefined ? customAiApiKey : undefined,
      customAiBaseUrl: customAiBaseUrl !== undefined ? customAiBaseUrl : undefined,
      customAiModel: customAiModel !== undefined ? customAiModel : undefined,
    });

    res.json({
      success: true,
      message: 'AI Model configuration updated successfully.',
      data: {
        hasNvidiaKey: Boolean(config.nvidiaApiKey && config.nvidiaApiKey.length > 5),
        nvidiaLlmModel: config.nvidiaLlmModel,
        nvidiaImageModel: config.nvidiaImageModel,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function testAIConnection(req: Request, res: Response) {
  try {
    const apiKey = config.nvidiaApiKey || req.body.apiKey;
    const model = config.nvidiaLlmModel || req.body.model || 'nvidia/llama-3.1-nemotron-70b-instruct';
    const baseUrl = config.nvidiaBaseUrl || 'https://integrate.api.nvidia.com/v1';

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'No NVIDIA API Key provided. Please paste your nvapi key from https://build.nvidia.com',
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const testRes = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Respond with: "NVIDIA NIM Connected Successfully"' }],
        max_tokens: 20,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!testRes.ok) {
      const errText = await testRes.text();
      return res.status(400).json({
        success: false,
        error: `NVIDIA NIM responded with error: ${errText}`,
      });
    }

    const data = await testRes.json();
    const reply = data.choices?.[0]?.message?.content || 'Connected';

    res.json({
      success: true,
      message: 'NVIDIA NIM connection verified successfully!',
      reply,
      model,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: `Failed to connect to NVIDIA NIM: ${err.message}`,
    });
  }
}
