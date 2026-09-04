import mongoose, { Schema, Document } from 'mongoose';

export interface IStyleProfile extends Document {
  sessionId: string;
  userId?: string;
  preferredColors: string[];
  preferredFabrics: string[];
  preferredStyles: string[];
  preferredOccasions: string[];
  budgetMin?: number;
  budgetMax?: number;
  savedProducts: string[];
  likedProducts: string[];
  tryOnHistory: Array<{
    productId: string;
    drape: string;
    previewUrl: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const StyleProfileSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, index: true },
    preferredColors: [{ type: String }],
    preferredFabrics: [{ type: String }],
    preferredStyles: [{ type: String }],
    preferredOccasions: [{ type: String }],
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    savedProducts: [{ type: String }],
    likedProducts: [{ type: String }],
    tryOnHistory: [
      {
        productId: { type: String },
        drape: { type: String },
        previewUrl: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const StyleProfile = mongoose.models.StyleProfile || mongoose.model<IStyleProfile>('StyleProfile', StyleProfileSchema);
