import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Cart } from '../models/Cart.js';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { AgentAction } from '../models/AgentAudit.js';
import { AIEvent } from '../models/AIEvent.js';
import { AIJob } from '../models/AIJob.js';
import { MemoryStore } from '../seed/memoryStore.js';

/**
 * Resets test transactions, carts, orders, and telemetry sessions while preserving the 30+ catalog products.
 */
export async function resetDemoData(req: Request, res: Response) {
  try {
    if (isMongoConnected) {
      await Promise.all([
        Cart.deleteMany({}),
        Order.deleteMany({}),
        Payment.deleteMany({}),
        AgentAction.deleteMany({}),
        AIEvent.deleteMany({}),
        AIJob.deleteMany({}),
      ]);
    }
    MemoryStore.reset();

    res.json({
      success: true,
      message: 'Demo environment reset to pristine state successfully. Catalog sarees preserved.',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
