import mongoose, { Schema, Document } from 'mongoose';

export interface SareeDNA {
  colors: string[];
  fabric: string[];
  motifs: string[];
  pattern: string;
  border?: {
    color?: string;
    weight?: string;
    type?: string;
  };
  zari: boolean;
  zariType?: string;
  occasion: string[];
  style: string;
  visualEmbedding?: number[];
  palluDetails?: string;
}

export interface AIQualityScore {
  imageQuality: number;
  metadataCompleteness: number;
  sareeVisibility: number;
  garmentFidelity: number;
  seoCompleteness: number;
  overall: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  collectionIds: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  showPrice: boolean;
  availability: 'AVAILABLE' | 'OUT_OF_STOCK' | 'COMING_SOON' | 'HIDDEN';
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
    order?: number;
  }[];
  videoUrl?: string;
  has3DModel: boolean;
  model3dUrl?: string;
  attributes: {
    fabric?: string;
    color?: string;
    colors?: string[];
    pattern?: string;
    occasion?: string;
    weave?: string;
    border?: string;
    length?: string;
    blousePiece?: boolean;
    custom?: Record<string, string | string[]>;
  };
  sareeDNA?: SareeDNA;
  tryOn?: {
    enabled: boolean;
    supportedDrapes: string[];
    recommendedDrape?: string;
  };
  ai?: {
    analysisStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
    detectedAttributes?: Record<string, any>;
    aiQualityScore?: AIQualityScore;
    aiGeneratedStory?: string;
    tags?: string[];
  };
  generatedMedia?: {
    url: string;
    modelProfile: string;
    pose: string;
    background: string;
    createdAt: Date;
    generatedByAI: boolean;
  }[];
  tags: string[];
  featured: boolean;
  visible: boolean;
  archived: boolean;
  displayOrder: number;
  seo: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    categoryId: { type: String, required: true, index: true },
    categoryName: { type: String },
    collectionIds: [{ type: String }],
    price: { type: Number, required: true, index: true },
    compareAtPrice: { type: Number },
    currency: { type: String, default: 'INR' },
    showPrice: { type: Boolean, default: true },
    availability: {
      type: String,
      enum: ['AVAILABLE', 'OUT_OF_STOCK', 'COMING_SOON', 'HIDDEN'],
      default: 'AVAILABLE',
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    videoUrl: { type: String },
    has3DModel: { type: Boolean, default: false },
    model3dUrl: { type: String },
    attributes: {
      fabric: { type: String, index: true },
      color: { type: String, index: true },
      colors: [{ type: String }],
      pattern: { type: String },
      occasion: { type: String, index: true },
      weave: { type: String },
      border: { type: String },
      length: { type: String },
      blousePiece: { type: Boolean, default: true },
      custom: { type: Schema.Types.Mixed },
    },
    sareeDNA: {
      colors: [{ type: String }],
      fabric: [{ type: String }],
      motifs: [{ type: String }],
      pattern: { type: String },
      border: {
        color: { type: String },
        weight: { type: String },
        type: { type: String },
      },
      zari: { type: Boolean, default: false },
      zariType: { type: String },
      occasion: [{ type: String }],
      style: { type: String },
      visualEmbedding: [{ type: Number }],
      palluDetails: { type: String },
    },
    tryOn: {
      enabled: { type: Boolean, default: true },
      supportedDrapes: [{ type: String, default: ['Nivi', 'Bengali', 'Gujarati', 'Seedha Pallu', 'Maharashtrian', 'Modern'] }],
      recommendedDrape: { type: String, default: 'Nivi' },
    },
    ai: {
      analysisStatus: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED', 'SKIPPED'], default: 'COMPLETED' },
      detectedAttributes: { type: Schema.Types.Mixed },
      aiQualityScore: {
        imageQuality: { type: Number, default: 94 },
        metadataCompleteness: { type: Number, default: 92 },
        sareeVisibility: { type: Number, default: 96 },
        garmentFidelity: { type: Number, default: 90 },
        seoCompleteness: { type: Number, default: 88 },
        overall: { type: Number, default: 92 },
      },
      aiGeneratedStory: { type: String },
      tags: [{ type: String }],
    },
    generatedMedia: [
      {
        url: { type: String },
        modelProfile: { type: String },
        pose: { type: String },
        background: { type: String },
        createdAt: { type: Date, default: Date.now },
        generatedByAI: { type: Boolean, default: true },
      },
    ],
    tags: [{ type: String, index: true }],
    featured: { type: Boolean, default: false, index: true },
    visible: { type: Boolean, default: true, index: true },
    archived: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 100, index: true },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', description: 'text', sku: 'text', tags: 'text' });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
