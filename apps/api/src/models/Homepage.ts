import mongoose, { Schema, Document } from 'mongoose';

export interface IHomepageSection {
  id: string;
  type: 'hero' | 'featured_collection' | 'categories' | 'new_arrivals' | 'heritage_story' | 'promo_banner';
  title: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
  data?: Record<string, any>;
}

export interface IHomepageConfig extends Document {
  hero: {
    title: string;
    subtitle: string;
    badgeText?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundStyle: '3D_SILK' | 'GOLD_PARTICLES' | 'DARK_HERITAGE';
  };
  sections: IHomepageSection[];
  updatedAt: Date;
}

const HomepageSchema: Schema = new Schema(
  {
    hero: {
      title: { type: String, default: 'SREE RAM SILKS' },
      subtitle: { type: String, default: 'Heritage • Reimagined. Handcrafted Indian Textile Masterpieces.' },
      badgeText: { type: String, default: 'Royal Handloom Collection 2026' },
      ctaText: { type: String, default: 'Explore Catalog' },
      ctaLink: { type: String, default: '/catalog' },
      secondaryCtaText: { type: String, default: 'Discover Heritage' },
      secondaryCtaLink: { type: String, default: '/about' },
      backgroundStyle: { type: String, default: '3D_SILK' },
    },
    sections: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String },
        enabled: { type: Boolean, default: true },
        order: { type: Number, required: true },
        data: { type: Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

export const Homepage = mongoose.models.Homepage || mongoose.model<IHomepageConfig>('Homepage', HomepageSchema);
