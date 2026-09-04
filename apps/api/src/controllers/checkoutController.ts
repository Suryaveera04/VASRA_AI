import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Cart } from '../models/Cart.js';
import { MemoryStore } from '../seed/memoryStore.js';
import { PaymentService } from '../services/paymentService.js';

export async function getCart(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;
    let cart: any = null;

    if (isMongoConnected) {
      cart = await Cart.findOne({ sessionId });
    } else {
      cart = MemoryStore.carts.get(sessionId);
    }

    if (!cart) {
      cart = {
        sessionId,
        items: [],
        subtotal: 0,
        currency: 'INR',
        total: 0,
        source: 'DIRECT',
      };
    }

    res.json({ success: true, data: cart });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function saveCart(req: Request, res: Response) {
  try {
    const { sessionId, items, source } = req.body;
    let subtotal = 0;
    (items || []).forEach((item: any) => {
      subtotal += (item.price || 0) * (item.quantity || 1);
    });

    const cartData = {
      sessionId,
      items: items || [],
      subtotal,
      currency: 'INR',
      total: subtotal,
      source: source || 'DIRECT',
      updatedAt: new Date(),
    };

    if (isMongoConnected) {
      const cart = await Cart.findOneAndUpdate({ sessionId }, cartData, { upsert: true, new: true });
      res.json({ success: true, data: cart });
    } else {
      MemoryStore.carts.set(sessionId, cartData);
      res.json({ success: true, data: cartData });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function createRazorpayOrder(req: Request, res: Response) {
  try {
    const { sessionId, items, customer, source, aiExplanation } = req.body;
    const result = await PaymentService.createRazorpayOrder({
      sessionId: sessionId || `sess_${Date.now()}`,
      items,
      customer,
      source,
      aiExplanation,
    });

    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function verifyPayment(req: Request, res: Response) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, sessionId } = req.body;
    const order = await PaymentService.completePayment({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      sessionId,
    });

    res.json({
      success: true,
      data: {
        order,
        message: 'Payment verified and order confirmed successfully.',
      },
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function handleRazorpayWebhook(req: Request, res: Response) {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const result = await PaymentService.handleWebhook(req.body, signature);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
