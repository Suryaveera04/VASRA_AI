import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saree_catalog',
  jwtSecret: process.env.JWT_SECRET || 'sree_ram_silks_super_secret_jwt_key_2026_luxury',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '+919483757825',

  // NVIDIA NIM & Open Source AI Engine Configuration
  nvidiaApiKey: process.env.NVIDIA_API_KEY || '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',
  nvidiaLlmModel: process.env.NVIDIA_LLM_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b',
  nvidiaImageModel: process.env.NVIDIA_IMAGE_MODEL || 'black-forest-labs/flux-1-dev',
  nvidiaBaseUrl: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',

  // OpenAI / Groq / Ollama compatible fallback
  customAiApiKey: process.env.CUSTOM_AI_API_KEY || '',
  customAiBaseUrl: process.env.CUSTOM_AI_BASE_URL || '',
  customAiModel: process.env.CUSTOM_AI_MODEL || '',
};

export function updateRuntimeAIConfig(updates: {
  nvidiaApiKey?: string;
  nvidiaLlmModel?: string;
  nvidiaImageModel?: string;
  customAiApiKey?: string;
  customAiBaseUrl?: string;
  customAiModel?: string;
}) {
  if (updates.nvidiaApiKey !== undefined) config.nvidiaApiKey = updates.nvidiaApiKey;
  if (updates.nvidiaLlmModel !== undefined) config.nvidiaLlmModel = updates.nvidiaLlmModel;
  if (updates.nvidiaImageModel !== undefined) config.nvidiaImageModel = updates.nvidiaImageModel;
  if (updates.customAiApiKey !== undefined) config.customAiApiKey = updates.customAiApiKey;
  if (updates.customAiBaseUrl !== undefined) config.customAiBaseUrl = updates.customAiBaseUrl;
  if (updates.customAiModel !== undefined) config.customAiModel = updates.customAiModel;
}
