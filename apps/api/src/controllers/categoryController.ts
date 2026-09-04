import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { isMongoConnected } from '../config/db.js';
import { Category } from '../models/Category.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function getCategories(req: Request, res: Response) {
  try {
    if (isMongoConnected) {
      const categories = await Category.find({ visible: true }).sort({ displayOrder: 1 });
      return res.json({ success: true, data: categories });
    }
    const categories = MemoryStore.categories
      .filter((c: any) => c.visible)
      .sort((a: any, b: any) => a.displayOrder - b.displayOrder);
    return res.json({ success: true, data: categories });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.name) return res.status(400).json({ success: false, error: 'Category name is required.' });

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isMongoConnected) {
      // Let MongoDB auto-generate a valid ObjectId _id
      const created = await Category.create({
        name: body.name,
        slug,
        description: body.description || '',
        image: body.image || '/images/products/kanchipuram_red_gold.png',
        icon: body.icon || 'Sparkles',
        displayOrder: body.displayOrder ? Number(body.displayOrder) : (Date.now() % 10000),
        visible: true,
        productCount: 0,
      });
      return res.status(201).json({ success: true, data: created });
    }

    // In-memory fallback — use string IDs
    const newCat: any = {
      _id: `cat-mem-${Date.now()}`,
      name: body.name,
      slug,
      description: body.description || '',
      image: body.image || '/images/products/kanchipuram_red_gold.png',
      icon: body.icon || 'Sparkles',
      displayOrder: body.displayOrder ? Number(body.displayOrder) : (MemoryStore.categories.length + 1) * 100,
      visible: true,
      productCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MemoryStore.categories.push(newCat);
    return res.status(201).json({ success: true, data: newCat });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (isMongoConnected) {
      const updated = await Category.findByIdAndUpdate(id, body, { new: true });
      if (!updated) return res.status(404).json({ success: false, error: 'Category not found.' });
      return res.json({ success: true, data: updated });
    }

    const index = MemoryStore.categories.findIndex((c: any) => String(c._id) === id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Category not found.' });

    MemoryStore.categories[index] = { ...MemoryStore.categories[index], ...body, updatedAt: new Date() };
    return res.json({ success: true, data: MemoryStore.categories[index] });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Category.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Category deleted.' });
    }
    MemoryStore.categories = MemoryStore.categories.filter((c: any) => String(c._id) !== id);
    return res.json({ success: true, message: 'Category deleted.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
