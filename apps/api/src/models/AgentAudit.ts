import mongoose, { Schema } from 'mongoose';

export interface IAgentAction {
  sessionId: string;
  userId?: string;
  intent?: string;
  state: string;
  action: string;
  tool?: string;
  input?: Record<string, any>;
  resultSummary?: string;
  resultReference?: Record<string, any>;
  authorization?: {
    required: boolean;
    granted: boolean;
    authorizedAmount?: number;
    userConfirmedAt?: Date;
  };
  latencyMs?: number;
  model?: string;
  provider?: string;
  timestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const AgentActionSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true, index: true },
    userId: { type: String, index: true },
    intent: { type: String },
    state: { type: String, required: true, index: true },
    action: { type: String, required: true, index: true },
    tool: { type: String, index: true },
    input: { type: Schema.Types.Mixed },
    resultSummary: { type: String },
    resultReference: { type: Schema.Types.Mixed },
    authorization: {
      required: { type: Boolean, default: false },
      granted: { type: Boolean, default: false },
      authorizedAmount: { type: Number },
      userConfirmedAt: { type: Date },
    },
    latencyMs: { type: Number },
    model: { type: String, default: 'nemotron-70b-instruct' },
    provider: { type: String, default: 'nvidia-nemotron' },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const AgentAction = mongoose.models.AgentAction || mongoose.model<IAgentAction>('AgentAction', AgentActionSchema);
