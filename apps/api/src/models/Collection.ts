import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  slug: string;
  description: string;
  image?: string;
  productIds: string[];
  displayOrder: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },
    image: { type: String },
    productIds: [{ type: String }],
    displayOrder: { type: Number, default: 100, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Collection = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
