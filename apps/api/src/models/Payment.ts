import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  status: 'CREATED' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  method?: string;
  email?: string;
  contact?: string;
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
  webhookEvents?: Array<{
    event: string;
    idempotencyKey?: string;
    receivedAt: Date;
    payload: Record<string, any>;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    orderId: { type: String, required: true, index: true },
    orderNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['CREATED', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED'],
      default: 'CREATED',
      index: true,
    },
    method: { type: String },
    email: { type: String },
    contact: { type: String },
    error: {
      code: { type: String },
      description: { type: String },
      source: { type: String },
      step: { type: String },
      reason: { type: String },
    },
    webhookEvents: [
      {
        event: { type: String },
        idempotencyKey: { type: String },
        receivedAt: { type: Date, default: Date.now },
        payload: { type: Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
