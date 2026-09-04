import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Homepage } from '../models/Homepage.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function getHomepageConfig(req: Request, res: Response) {
  try {
    if (isMongoConnected) {
      let configDoc = await Homepage.findOne();
      if (!configDoc) {
        configDoc = await Homepage.create(MemoryStore.homepage);
      }
      return res.json({ success: true, data: configDoc });
    }
    return res.json({ success: true, data: MemoryStore.homepage });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateHomepageConfig(req: Request, res: Response) {
  try {
    const body = req.body;
    if (isMongoConnected) {
      const updated = await Homepage.findOneAndUpdate({}, body, { new: true, upsert: true });
      return res.json({ success: true, data: updated });
    }
    MemoryStore.homepage = { ...MemoryStore.homepage, ...body };
    return res.json({ success: true, data: MemoryStore.homepage });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
