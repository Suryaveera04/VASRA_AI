import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Order } from '../models/Order.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function getOrders(req: Request, res: Response) {
  try {
    const { status, source, limit = 50 } = req.query;
    let orders: any[] = [];

    if (isMongoConnected) {
      const query: any = {};
      if (status) query.status = status;
      if (source) query.source = source;
      orders = await Order.find(query).sort({ createdAt: -1 }).limit(Number(limit)).lean();
    } else {
      orders = MemoryStore.orders;
      if (status) orders = orders.filter((o) => o.status === status);
      if (source) orders = orders.filter((o) => o.source === source);
      orders = orders.slice(0, Number(limit));
    }

    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    if (isMongoConnected) {
      const updated = await Order.findByIdAndUpdate(
        id,
        {
          ...(status ? { status } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, error: 'Order not found' });
      return res.json({ success: true, data: updated });
    } else {
      const order = MemoryStore.orders.find((o) => o._id === id || o._id.toString() === id);
      if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
      if (status) order.status = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      order.updatedAt = new Date();
      return res.json({ success: true, data: order });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
