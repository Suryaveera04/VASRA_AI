import mongoose, { Schema, Document } from 'mongoose';

export type AIJobType = 'TRY_ON' | 'MODEL_PHOTO' | 'GARMENT_ANALYSIS' | 'CAMPAIGN_GEN';
export type AIJobStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface IAIJob extends Document {
  jobId: string;
  type: AIJobType;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: AIJobStatus;
  progress: number;
  currentStage: string;
  input: Record<string, any>;
  result?: Record<string, any>;
  error?: string;
  estimatedCost?: number;
  durationMs?: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AIJobSchema: Schema = new Schema(
  {
    jobId: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, index: true },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
    status: {
      type: String,
      enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'EXPIRED'],
      default: 'QUEUED',
      index: true,
    },
    progress: { type: Number, default: 0 },
    currentStage: { type: String, default: 'Queued for processing' },
    input: { type: Schema.Types.Mixed },
    result: { type: Schema.Types.Mixed },
    error: { type: String },
    estimatedCost: { type: Number, default: 0.02 },
    durationMs: { type: Number },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

export const AIJob = mongoose.models.AIJob || mongoose.model<IAIJob>('AIJob', AIJobSchema);
