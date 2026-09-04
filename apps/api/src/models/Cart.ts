import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  fabric?: string;
  selectedDrape?: string;
}

export interface ICart extends Document {
  sessionId: string;
  userId?: string;
  items: ICartItem[];
  subtotal: number;
  currency: string;
  appliedDiscount?: number;
  total: number;
  source: 'AI_AGENT' | 'DIRECT';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    fabric: { type: String },
    selectedDrape: { type: String },
  },
  { _id: false }
);

const CartSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true, index: true },
    userId: { type: String, index: true },
    items: [CartItemSchema],
    subtotal: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    appliedDiscount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    source: { type: String, enum: ['AI_AGENT', 'DIRECT'], default: 'DIRECT' },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
