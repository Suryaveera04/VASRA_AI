import { Request, Response } from 'express';
import { isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function searchCatalog(req: Request, res: Response) {
  try {
    const q = (req.query.q as string || '').trim().toLowerCase();
    if (!q) {
      return res.json({
        success: true,
        data: {
          products: [],
          categories: [],
          suggestions: ['Red Silk', 'Kanchipuram', 'Banarasi Brocade', 'Wedding Saree', 'Rose Gold Tissue'],
        },
      });
    }

    if (isMongoConnected) {
      const products = await Product.find({
        visible: true,
        archived: false,
        $or: [
          { name: new RegExp(q, 'i') },
          { sku: new RegExp(q, 'i') },
          { tags: new RegExp(q, 'i') },
          { 'attributes.fabric': new RegExp(q, 'i') },
          { 'attributes.color': new RegExp(q, 'i') },
        ],
      }).limit(12);

      return res.json({
        success: true,
        data: {
          products,
          categories: MemoryStore.categories.filter(c => c.name.toLowerCase().includes(q)),
          suggestions: [q, 'Red Silk', 'Gold Zari'],
        },
      });
    }

    const matchedProducts = MemoryStore.products.filter(p =>
      p.visible &&
      !p.archived &&
      (p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.toLowerCase().includes(q)) ||
        p.attributes?.fabric?.toLowerCase().includes(q) ||
        p.attributes?.color?.toLowerCase().includes(q) ||
        p.attributes?.occasion?.toLowerCase().includes(q))
    ).slice(0, 12);

    const matchedCategories = MemoryStore.categories.filter(c => c.name.toLowerCase().includes(q));

    return res.json({
      success: true,
      data: {
        products: matchedProducts,
        categories: matchedCategories,
        suggestions: [q, 'Red Kanchipuram', 'Banarasi Brocade', 'Wedding'],
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
