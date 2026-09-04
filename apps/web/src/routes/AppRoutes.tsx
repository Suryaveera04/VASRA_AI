import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { SearchModal } from '../components/ui/SearchModal';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { CartDrawer } from '../components/ui/CartDrawer';
import { AIStylistModal } from '../components/ai/AIStylistModal';
import { VirtualTryOnModal } from '../components/ai/VirtualTryOnModal';
import { SareeCompareModal } from '../components/ai/SareeCompareModal';
import { VisualSearchModal } from '../components/ai/VisualSearchModal';

// Public pages — eager loaded
import { Home } from '../pages/Home';
import { Catalog } from '../pages/Catalog';
import { CategoryDetail } from '../pages/CategoryDetail';
import { ProductDetail } from '../pages/ProductDetail';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Privacy } from '../pages/Privacy';
import { Terms } from '../pages/Terms';
import { NotFound } from '../pages/NotFound';

// Admin pages — lazy loaded
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminForgotPassword = lazy(() => import('../pages/admin/AdminForgotPassword').then((m) => ({ default: m.AdminForgotPassword })));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts').then((m) => ({ default: m.AdminProducts })));
const AdminProductEditor = lazy(() => import('../pages/admin/AdminProductEditor').then((m) => ({ default: m.AdminProductEditor })));
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories').then((m) => ({ default: m.AdminCategories })));
const AdminHomepageCMS = lazy(() => import('../pages/admin/AdminHomepageCMS').then((m) => ({ default: m.AdminHomepageCMS })));
const AdminMediaLibrary = lazy(() => import('../pages/admin/AdminMediaLibrary').then((m) => ({ default: m.AdminMediaLibrary })));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings').then((m) => ({ default: m.AdminSettings })));

// V2 Admin AI Pages
const AdminAIStudio = lazy(() => import('../pages/admin/AdminAIStudio').then((m) => ({ default: m.AdminAIStudio })));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders').then((m) => ({ default: m.AdminOrders })));
const AdminAIRevenue = lazy(() => import('../pages/admin/AdminAIRevenue').then((m) => ({ default: m.AdminAIRevenue })));
const AdminAIAudit = lazy(() => import('../pages/admin/AdminAIAudit').then((m) => ({ default: m.AdminAIAudit })));

import { useAuthStore } from '../store/useAuthStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const AdminFallback = (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400 text-xs font-cinzel">
      Loading VASRĀ merchant intelligence module...
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-obsidian-950 text-ivory-100 selection:bg-gold-500 selection:text-obsidian-950">
      {!isAdminRoute && <Navbar />}

      <div className="flex-1 w-full">
        <Suspense fallback={AdminFallback}>
          <Routes>
            {/* Public Showroom Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/search" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/products/new" element={<ProtectedRoute><AdminProductEditor /></ProtectedRoute>} />
            <Route path="/admin/products/:id" element={<ProtectedRoute><AdminProductEditor /></ProtectedRoute>} />
            <Route path="/admin/ai-studio" element={<ProtectedRoute><AdminAIStudio /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/ai-revenue" element={<ProtectedRoute><AdminAIRevenue /></ProtectedRoute>} />
            <Route path="/admin/ai-audit" element={<ProtectedRoute><AdminAIAudit /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/homepage" element={<ProtectedRoute><AdminHomepageCMS /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><AdminMediaLibrary /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {!isAdminRoute && <Footer />}

      {/* Global AI & Commerce Modals */}
      <SearchModal />
      <QuickViewModal />
      <CartDrawer />
      <AIStylistModal />
      <VirtualTryOnModal />
      <SareeCompareModal />
      <VisualSearchModal />
    </div>
  );
}
