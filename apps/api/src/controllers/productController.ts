import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { MemoryStore } from '../seed/memoryStore.js';

export async function getProducts(req: Request, res: Response) {
  try {
    const {
      category,
      fabric,
      color,
      occasion,
      weave,
      border,
      minPrice,
      maxPrice,
      sort = 'custom',
      q,
      featured,
      limit = '24',
      page = '1',
      includeHidden = 'false'
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);

    if (isMongoConnected) {
      const filterQuery: any = { archived: false };
      if (includeHidden !== 'true') filterQuery.visible = true;

      if (category) {
        filterQuery.$or = [{ categoryId: category }, { categoryName: new RegExp(category as string, 'i') }];
      }
      if (fabric) filterQuery['attributes.fabric'] = new RegExp(fabric as string, 'i');
      if (color) filterQuery['attributes.color'] = new RegExp(color as string, 'i');
      if (occasion) filterQuery['attributes.occasion'] = new RegExp(occasion as string, 'i');
      if (weave) filterQuery['attributes.weave'] = new RegExp(weave as string, 'i');
      if (border) filterQuery['attributes.border'] = new RegExp(border as string, 'i');
      if (featured === 'true') filterQuery.featured = true;

      if (minPrice || maxPrice) {
        filterQuery.price = {};
        if (minPrice) filterQuery.price.$gte = Number(minPrice);
        if (maxPrice) filterQuery.price.$lte = Number(maxPrice);
      }

      if (q) {
        filterQuery.$or = [
          { name: new RegExp(q as string, 'i') },
          { sku: new RegExp(q as string, 'i') },
          { tags: new RegExp(q as string, 'i') },
          { description: new RegExp(q as string, 'i') },
        ];
      }

      let sortOption: any = { displayOrder: 1 };
      if (sort === 'price-asc') sortOption = { price: 1 };
      if (sort === 'price-desc') sortOption = { price: -1 };
      if (sort === 'newest') sortOption = { createdAt: -1 };
      if (sort === 'name-asc') sortOption = { name: 1 };

      const total = await Product.countDocuments(filterQuery);
      const items = await Product.find(filterQuery)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        success: true,
        data: items,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      });
    }

    // In-memory filter logic fallback
    let list = MemoryStore.products.filter(p => !p.archived);
    if (includeHidden !== 'true') {
      list = list.filter(p => p.visible);
    }

    if (category) {
      list = list.filter(p => p.categoryId === category || p.categoryName?.toLowerCase().includes((category as string).toLowerCase()));
    }
    if (fabric) {
      list = list.filter(p => p.attributes?.fabric?.toLowerCase().includes((fabric as string).toLowerCase()));
    }
    if (color) {
      list = list.filter(p => p.attributes?.color?.toLowerCase().includes((color as string).toLowerCase()));
    }
    if (occasion) {
      list = list.filter(p => p.attributes?.occasion?.toLowerCase().includes((occasion as string).toLowerCase()));
    }
    if (weave) {
      list = list.filter(p => p.attributes?.weave?.toLowerCase().includes((weave as string).toLowerCase()));
    }
    if (border) {
      list = list.filter(p => p.attributes?.border?.toLowerCase().includes((border as string).toLowerCase()));
    }
    if (featured === 'true') {
      list = list.filter(p => p.featured);
    }
    if (minPrice) {
      list = list.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter(p => p.price <= Number(maxPrice));
    }
    if (q) {
      const queryStr = (q as string).toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(queryStr) ||
        p.sku.toLowerCase().includes(queryStr) ||
        p.tags.some((t: string) => t.toLowerCase().includes(queryStr))
      );
    }

    // Sorting
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => a.displayOrder - b.displayOrder);

    const total = list.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = list.slice(startIndex, startIndex + limitNum);

    return res.json({
      success: true,
      data: paginatedItems,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const isObjectId = mongoose.Types.ObjectId.isValid(slug);

    if (isMongoConnected) {
      const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };
      const product = await Product.findOne(query);
      if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
      return res.json({ success: true, data: product });
    }

    const product = (MemoryStore.products as any[]).find(p => p.slug === slug || String(p._id) === slug);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    return res.json({ success: true, data: product });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.name || !body.sku || !body.price) {
      return res.status(400).json({ success: false, error: 'Name, SKU, and Price are required.' });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProductData = {
      // Do NOT set _id — let MongoDB auto-generate a valid ObjectId
      name: body.name,
      slug,
      sku: body.sku,
      shortDescription: body.shortDescription || '',
      description: body.description || '',
      categoryId: body.categoryId || 'buttas',
      categoryName: body.categoryName || 'General',
      collectionIds: body.collectionIds || [],
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      currency: body.currency || 'INR',
      showPrice: body.showPrice !== false,
      availability: body.availability || 'AVAILABLE',
      images: body.images && body.images.length > 0 ? body.images : [
        { url: '/images/products/kanchipuram_red_gold.png', alt: body.name, isPrimary: true, order: 0 }
      ],
      has3DModel: Boolean(body.has3DModel),
      model3dUrl: body.model3dUrl,
      attributes: body.attributes || {},
      tags: body.tags || [],
      featured: Boolean(body.featured),
      visible: body.visible !== false,
      archived: false,
      displayOrder: body.displayOrder ? Number(body.displayOrder) : (MemoryStore.products.length + 1) * 100,
      seo: body.seo || { title: body.name, description: body.shortDescription },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isMongoConnected) {
      const created = await Product.create(newProductData);
      return res.status(201).json({ success: true, data: created });
    }

    (MemoryStore.products as any[]).unshift(newProductData);
    return res.status(201).json({ success: true, data: newProductData });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (isMongoConnected) {
      const updated = await Product.findByIdAndUpdate(id, { ...body, updatedAt: new Date() }, { new: true });
      if (!updated) return res.status(404).json({ success: false, error: 'Product not found.' });
      return res.json({ success: true, data: updated });
    }

    const index = (MemoryStore.products as any[]).findIndex(p => String(p._id) === id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Product not found.' });

    MemoryStore.products[index] = {
      ...MemoryStore.products[index],
      ...body,
      updatedAt: new Date(),
    };

    return res.json({ success: true, data: MemoryStore.products[index] });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
      product.archived = true;
      await product.save();
      return res.json({ success: true, message: 'Product archived successfully.' });
    }

    const product = (MemoryStore.products as any[]).find(p => String(p._id) === id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found.' });
    product.archived = true;
    return res.json({ success: true, message: 'Product archived successfully.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function reorderProducts(req: Request, res: Response) {
  try {
    const { items } = req.body; // array of { id, displayOrder }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, error: 'Items array is required.' });
    }

    if (isMongoConnected) {
      const bulkOps = items.map(item => ({
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { displayOrder: item.displayOrder } },
        },
      }));
      await Product.bulkWrite(bulkOps);
    } else {
      items.forEach(item => {
        const prod = (MemoryStore.products as any[]).find(p => String(p._id) === item.id);
        if (prod) prod.displayOrder = item.displayOrder;
      });
      MemoryStore.products.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    return res.json({ success: true, message: 'Product order updated successfully.' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
