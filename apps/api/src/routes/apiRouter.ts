import { Router } from 'express';
import { login, logout, getMe, forgotPassword, resetPassword } from '../controllers/authController.js';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, reorderProducts } from '../controllers/productController.js';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { getCollections } from '../controllers/collectionController.js';
import { getHomepageConfig, updateHomepageConfig } from '../controllers/homepageController.js';
import { searchCatalog } from '../controllers/searchController.js';
import { requireAdminAuth } from '../middleware/auth.js';

// V2 Controllers
import { getCart, saveCart, createRazorpayOrder, verifyPayment, handleRazorpayWebhook } from '../controllers/checkoutController.js';
import { chatWithShoppingAgent, requestVirtualTryOn, getJobStatus, analyzeGarment, generateModelPhotos, generateCampaign, getAISettings, updateAISettings, testAIConnection } from '../controllers/aiStudioController.js';
import { getRevenueMetrics, getConversionFunnel, getMerchantInsights, getCostAnalytics, getAgentAuditTrail } from '../controllers/aiAnalyticsController.js';
import { getAgentReadableCatalog, transactAIBuyer } from '../controllers/aiCatalogController.js';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { resetDemoData } from '../controllers/demoController.js';
import { runBenchmarkEval } from '../controllers/evalController.js';

const router = Router();

// ─── Public Catalog Routes ──────────────────────────────────────────────────
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/categories', getCategories);
router.get('/collections', getCollections);
router.get('/homepage', getHomepageConfig);
router.get('/search', searchCatalog);

// ─── Agent-Readable Catalog & AI Buyer Protocol ─────────────────────────────
router.get('/catalog/ai', getAgentReadableCatalog);
router.post('/catalog/ai/transact', transactAIBuyer);

// ─── Customer AI Shopping Agent & Try-On Routes ─────────────────────────────
router.post('/ai/agent/chat', chatWithShoppingAgent);
router.post('/ai/try-on', requestVirtualTryOn);
router.get('/ai/jobs/:jobId', getJobStatus);
router.get('/ai/eval/benchmark', runBenchmarkEval);

// ─── Agentic Commerce & Razorpay Checkout ───────────────────────────────────
router.get('/checkout/cart/:sessionId', getCart);
router.post('/checkout/cart', saveCart);
router.post('/checkout/create-razorpay-order', createRazorpayOrder);
router.post('/checkout/verify-payment', verifyPayment);
router.post('/checkout/webhook', handleRazorpayWebhook);

// ─── Auth Public Routes ─────────────────────────────────────────────────────
router.post('/admin/auth/login', login);
router.post('/admin/auth/logout', logout);
router.post('/admin/auth/forgot-password', forgotPassword);
router.post('/admin/auth/reset-password', resetPassword);

// ─── Auth Protected Routes ──────────────────────────────────────────────────
router.get('/admin/auth/me', requireAdminAuth, getMe);

// ─── Admin Product & Category Routes ────────────────────────────────────────
router.post('/admin/products', requireAdminAuth, createProduct);
router.patch('/admin/products/:id', requireAdminAuth, updateProduct);
router.delete('/admin/products/:id', requireAdminAuth, deleteProduct);
router.post('/admin/products/reorder', requireAdminAuth, reorderProducts);
router.post('/admin/categories', requireAdminAuth, createCategory);
router.patch('/admin/categories/:id', requireAdminAuth, updateCategory);
router.delete('/admin/categories/:id', requireAdminAuth, deleteCategory);
router.patch('/admin/homepage', requireAdminAuth, updateHomepageConfig);

// ─── Admin AI Settings & Open Source NIM Configuration ──────────────────────
router.get('/admin/ai-settings', requireAdminAuth, getAISettings);
router.patch('/admin/ai-settings', requireAdminAuth, updateAISettings);
router.post('/admin/ai-settings/test', requireAdminAuth, testAIConnection);

// ─── Admin AI Studio & Merchant Hub Routes ──────────────────────────────────
router.post('/admin/ai-studio/analyze-garment', requireAdminAuth, analyzeGarment);
router.post('/admin/ai-studio/generate-model-photos', requireAdminAuth, generateModelPhotos);
router.post('/admin/ai-studio/campaign', requireAdminAuth, generateCampaign);

// ─── Admin Orders & Commerce Hub ────────────────────────────────────────────
router.get('/admin/orders', requireAdminAuth, getOrders);
router.patch('/admin/orders/:id/status', requireAdminAuth, updateOrderStatus);

// ─── Admin AI Analytics & Audit Trail ───────────────────────────────────────
router.get('/admin/ai-analytics/revenue', requireAdminAuth, getRevenueMetrics);
router.get('/admin/ai-analytics/funnel', requireAdminAuth, getConversionFunnel);
router.get('/admin/ai-analytics/insights', requireAdminAuth, getMerchantInsights);
router.get('/admin/ai-analytics/cost', requireAdminAuth, getCostAnalytics);
router.get('/admin/ai-analytics/audit', requireAdminAuth, getAgentAuditTrail);

// ─── Demo Reset Route ───────────────────────────────────────────────────────
router.post('/admin/demo/reset', resetDemoData);

export default router;
