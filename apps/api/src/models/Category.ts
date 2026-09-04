import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  displayOrder: number;
  visible: boolean;
  productCount?: number;
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },
    image: { type: String },
    icon: { type: String },
    displayOrder: { type: Number, default: 100, index: true },
    visible: { type: Boolean, default: true, index: true },
    productCount: { type: Number, default: 0 },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
