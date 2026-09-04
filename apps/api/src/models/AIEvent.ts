import mongoose, { Schema, Document } from 'mongoose';

export type AIEventType =
  | 'AI_SESSION_START'
  | 'AI_QUERY'
  | 'PRODUCT_RECOMMENDED'
  | 'TRYON_REQUESTED'
  | 'TRYON_COMPLETED'
  | 'PRODUCT_COMPARED'
  | 'ADD_TO_CART'
  | 'CHECKOUT_STARTED'
  | 'PAYMENT_AUTHORIZATION'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILURE'
  | 'CHECKOUT_ABANDONED';

export interface IAIEvent extends Document {
  type: AIEventType;
  sessionId: string;
  userId?: string;
  productId?: string;
  productName?: string;
  amount?: number;
  metadata?: Record<string, any>;
  timestamp: Date;
}

const AIEventSchema: Schema = new Schema(
  {
    type: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    userId: { type: String, index: true },
    productId: { type: String, index: true },
    productName: { type: String },
    amount: { type: Number },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const AIEvent = mongoose.models.AIEvent || mongoose.model<IAIEvnt>('AIEvent', AIEventSchema);
type IAIEvnt = IAIEvent;
