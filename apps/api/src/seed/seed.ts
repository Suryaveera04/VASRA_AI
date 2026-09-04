import { connectDB, isMongoConnected } from '../config/db.js';
import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';
import { Collection } from '../models/Collection.js';
import { Admin } from '../models/Admin.js';
import { Homepage } from '../models/Homepage.js';
import { seedProducts, seedCategories, seedCollections, seedAdmin, seedHomepage } from './seedData.js';
import { MemoryStore } from './memoryStore.js';

async function runSeed() {
  console.log('🌱 Starting Sree Ram Silks Database Seeding...');
  await connectDB();

  if (isMongoConnected) {
    console.log(' Clearing existing MongoDB documents...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Collection.deleteMany({});
    await Admin.deleteMany({});
    await Homepage.deleteMany({});

    console.log(' Inserting Seed Categories...');
    await Category.insertMany(seedCategories);

    console.log(' Inserting Seed Collections...');
    await Collection.insertMany(seedCollections);

    console.log(' Inserting Seed Products...');
    await Product.insertMany(seedProducts);

    console.log(' Inserting Admin Account...');
    await Admin.create(seedAdmin);

    console.log(' Inserting Homepage Configuration...');
    await Homepage.create(seedHomepage);

    console.log('✨ Seed complete! MongoDB database populated successfully.');
  } else {
    MemoryStore.reset();
    console.log('✨ Seed complete! In-memory store re-initialized successfully.');
  }

  process.exit(0);
}

runSeed().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
