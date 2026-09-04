import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Collection } from '../models/Collection.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function getCollections(req: Request, res: Response) {
  try {
    if (isMongoConnected) {
      const collections = await Collection.find({ visible: true }).sort({ displayOrder: 1 });
      return res.json({ success: true, data: collections });
    }
    return res.json({ success: true, data: MemoryStore.collections.filter(c => c.visible) });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
