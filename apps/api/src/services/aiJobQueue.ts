import { isMongoConnected } from '../config/db.js';
import { AIJob, IAIJob, AIJobType } from '../models/AIJob.js';
import { MemoryStore } from '../seed/memoryStore.js';
import { imageAIProvider } from './imageAIProvider.js';

export class AIJobQueue {
  /**
   * Enqueues an asynchronous AI generation job and starts background processing.
   */
  static async createJob(type: AIJobType, priority: 'HIGH' | 'MEDIUM' | 'LOW', input: Record<string, any>): Promise<string> {
    const jobId = `job_${type.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const jobData: Partial<IAIJob> = {
      jobId,
      type,
      priority,
      status: 'QUEUED',
      progress: 5,
      currentStage: 'Queued for processing',
      input,
      estimatedCost: type === 'TRY_ON' ? 0.04 : 0.08,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    if (isMongoConnected) {
      await AIJob.create(jobData);
    } else {
      MemoryStore.aiJobs.set(jobId, { ...jobData });
    }

    // Process asynchronously in background
    setTimeout(() => {
      this.processJob(jobId, type, input);
    }, 100);

    return jobId;
  }

  /**
   * Retrieves the current status and progress of an AI job.
   */
  static async getJob(jobId: string): Promise<any | null> {
    if (isMongoConnected) {
      const job = await AIJob.findOne({ jobId });
      return job ? job.toObject() : null;
    }
    return MemoryStore.aiJobs.get(jobId) || null;
  }

  /**
   * Internal worker execution simulation with realistic stage transitions.
   */
  private static async processJob(jobId: string, type: AIJobType, input: Record<string, any>) {
    const updateStage = async (status: string, progress: number, currentStage: string, result?: any) => {
      if (isMongoConnected) {
        await AIJob.findOneAndUpdate(
          { jobId },
          { status, progress, currentStage, ...(result ? { result } : {}) }
        );
      } else {
        const current = MemoryStore.aiJobs.get(jobId);
        if (current) {
          MemoryStore.aiJobs.set(jobId, {
            ...current,
            status,
            progress,
            currentStage,
            ...(result ? { result } : {}),
            updatedAt: new Date(),
          });
        }
      }
    };

    try {
      if (type === 'TRY_ON') {
        await updateStage('PROCESSING', 25, 'Analyzing customer photo & pose alignment...');
        await new Promise((resolve) => setTimeout(resolve, 350));

        await updateStage('PROCESSING', 55, 'Understanding Saree DNA and motif boundaries...');
        await new Promise((resolve) => setTimeout(resolve, 350));

        await updateStage('PROCESSING', 80, `Synthesizing ${input.drapeStyle || 'Nivi'} drape fall & gold zari reflection...`);
        await new Promise((resolve) => setTimeout(resolve, 350));

        const result = await imageAIProvider.generateTryOn({
          customerPhotoUrl: input.customerPhotoUrl,
          sareeImageUrl: input.sareeImageUrl,
          sareeName: input.sareeName || 'Saree',
          drapeStyle: input.drapeStyle || 'Nivi',
          sareeAssets: input.sareeAssets,
          sareeDNA: input.sareeDNA,
        });

        await updateStage('COMPLETED', 100, 'AI Virtual Try-On completed with high garment fidelity.', result);
      } else if (type === 'MODEL_PHOTO') {
        await updateStage('PROCESSING', 30, 'Setting up model silhouette & luxury studio lighting...');
        await new Promise((resolve) => setTimeout(resolve, 400));

        await updateStage('PROCESSING', 70, 'Rendering 4 editorial candidates preserving zari texture...');
        await new Promise((resolve) => setTimeout(resolve, 400));

        const result = await imageAIProvider.generateModelImages({
          sareeImageUrl: input.sareeImageUrl,
          sareeName: input.sareeName || 'Saree',
          modelProfile: input.modelProfile || 'Model A (Modern Regal)',
          pose: input.pose || 'Front Formal',
          background: input.background || 'Royal Palace Archway',
          lighting: input.lighting || 'Warm Gold',
          cameraFraming: input.cameraFraming || 'Full Body',
        });

        await updateStage('COMPLETED', 100, '4 high-definition model candidates generated.', result);
      }
    } catch (err: any) {
      if (isMongoConnected) {
        await AIJob.findOneAndUpdate({ jobId }, { status: 'FAILED', error: err.message, progress: 100 });
      } else {
        const current = MemoryStore.aiJobs.get(jobId);
        if (current) {
          MemoryStore.aiJobs.set(jobId, { ...current, status: 'FAILED', error: err.message, progress: 100 });
        }
      }
    }
  }
}
