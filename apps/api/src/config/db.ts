import mongoose from 'mongoose';
import { config } from './env.js';

export let isMongoConnected = false;

export async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log('✅ MongoDB connected successfully to:', config.mongoUri);
  } catch (err: any) {
    isMongoConnected = false;
    console.log('ℹ️ MongoDB not available locally. Running in seamless In-Memory Mock Data mode.');
  }
}
