import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  fabric?: string;
  selectedDrape?: string;
}

export interface IOrderCustomer {
  name: string;
  email: string;
  phone: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface IOrder extends Document {
  orderNumber: string;
  sessionId: string;
  userId?: string;
  customer: IOrderCustomer;
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
  status: 'PENDING_PAYMENT' | 'PAID' | 'PAYMENT_FAILED' | 'CANCELLED' | 'FULFILLED';
  paymentStatus: 'UNPAID' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  source: 'AI_AGENT' | 'DIRECT';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  aiExplanation?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    fabric: { type: String },
    selectedDrape: { type: String },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, required: true, index: true },
    userId: { type: String, index: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        line1: { type: String, default: '124 Temple Street' },
        line2: { type: String, default: 'Heritage Quarter' },
        city: { type: String, default: 'Kanchipuram' },
        state: { type: String, default: 'Tamil Nadu' },
        postalCode: { type: String, default: '631501' },
        country: { type: String, default: 'India' },
      },
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['PENDING_PAYMENT', 'PAID', 'PAYMENT_FAILED', 'CANCELLED', 'FULFILLED'],
      default: 'PENDING_PAYMENT',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'],
      default: 'UNPAID',
      index: true,
    },
    source: {
      type: String,
      enum: ['AI_AGENT', 'DIRECT'],
      default: 'DIRECT',
      index: true,
    },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    aiExplanation: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
