/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Hero } from './components/home/Hero';
import { CategoryBar } from './components/home/CategoryBar';
import { ProductCard } from './components/common/ProductCard';
import { SpecialOffers } from './components/home/SpecialOffers';
import { HowItWorks } from './components/home/HowItWorks';
import { ReviewsSection } from './components/home/ReviewsSection';
import { MenuPage } from './components/menu/MenuPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AboutPage } from './components/about/AboutPage';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductQuickView } from './components/menu/ProductQuickView';
import { api } from './services/api';
import { Product, Order, ContactMessage, CustomerReview, BusinessSettings, FoodCategory } from './types';
import { ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  // State Stores
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Home category filter
  const [homeCategory, setHomeCategory] = useState<FoodCategory>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial Data Load
  useEffect(() => {
    async function initData() {
      try {
        const [prodList, orderList, msgList, revList, sett] = await Promise.all([
          api.getProducts(),
          api.getOrders(),
          api.getContactMessages(),
          api.getReviews(),
          api.getSettings(),
        ]);
        setProducts(prodList);
        setOrders(orderList);
        setMessages(msgList);
        setReviews(revList);
        setSettings(sett);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Category list with counts for home
  const categorySummary = [
    { id: 'All' as FoodCategory, label: 'All Items', count: products.length },
    {
      id: 'Indian Street Food' as FoodCategory,
      label: 'Indian Street Food',
      count: products.filter((p) => p.category === 'Indian Street Food').length,
    },
    {
      id: 'Burgers & Sandwiches' as FoodCategory,
      label: 'Burgers & Sandwiches',
      count: products.filter((p) => p.category === 'Burgers & Sandwiches').length,
    },
    {
      id: 'Snacks & Puffs' as FoodCategory,
      label: 'Snacks & Puffs',
      count: products.filter((p) => p.category === 'Snacks & Puffs').length,
    },
    {
      id: 'Beverages' as FoodCategory,
      label: 'Chilled Beverages',
      count: products.filter((p) => p.category === 'Beverages').length,
    },
    {
      id: 'Desserts' as FoodCategory,
      label: 'Sweet Bites',
      count: products.filter((p) => p.category === 'Desserts').length,
    },
  ];

  const homeFilteredProducts = products.filter(
    (p) => homeCategory === 'All' || p.category === homeCategory
  );

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FFF8F1] text-[#202124]">
          {/* Top Navbar */}
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          {/* Main View Container */}
          <main className="flex-1">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-3 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-[#777777]">
                  Loading Campus Bite...
                </span>
              </div>
            ) : (
              <>
                {/* 1. HOME VIEW */}
                {currentPage === 'home' && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    {/* Hero Section */}
                    <Hero
                      onExploreMenu={() => navigateTo('menu')}
                      onHowItWorks={() => {
                        const el = document.getElementById('how-it-works-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />

                    {/* Category Filter Bar */}
                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#202124]">
                            Popular Canteen Categories
                          </h2>
                          <p className="text-xs text-[#777777] mt-0.5">
                            Select a category or browse all 14 student favorites.
                          </p>
                        </div>
                        <button
                          onClick={() => navigateTo('menu')}
                          className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Menu</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <CategoryBar
                        categories={categorySummary}
                        selectedCategory={homeCategory}
                        onSelectCategory={(cat) => setHomeCategory(cat)}
                      />
                    </div>

                    {/* Featured Food Grid */}
                    <div className="py-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {homeFilteredProducts.slice(0, 8).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={(p) => setQuickViewProduct(p)}
                          />
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <button
                          onClick={() => navigateTo('menu')}
                          className="px-6 py-3 bg-white border border-[#EAEAEA] hover:border-[#FF6B35] text-[#202124] hover:text-[#FF6B35] text-xs font-bold rounded-xl transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>View All {products.length} Items & Combos</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Student Special Offers Banner */}
                    <SpecialOffers />

                    {/* How It Works Section */}
                    <div id="how-it-works-section">
                      <HowItWorks />
                    </div>

                    {/* Genuine Reviews Section */}
                    <ReviewsSection
                      reviews={reviews}
                      onAddReview={async (newRev) => {
                        const created = await api.addReview(newRev);
                        setReviews((prev) => [created, ...prev]);
                      }}
                    />
                  </div>
                )}

                {/* 2. MENU VIEW */}
                {currentPage === 'menu' && <MenuPage products={products} />}

                {/* 3. CHECKOUT VIEW */}
                {currentPage === 'checkout' && (
                  <CheckoutPage
                    onOrderComplete={(order) => {
                      setOrders((prev) => [order, ...prev]);
                      navigateTo('account');
                    }}
                    onExploreMenu={() => navigateTo('menu')}
                  />
                )}

                {/* 4. ABOUT VIEW */}
                {currentPage === 'about' && (
                  <AboutPage onExploreMenu={() => navigateTo('menu')} />
                )}

                {/* 5. CONTACT VIEW */}
                {currentPage === 'contact' && <ContactPage />}

                {/* 6. REVIEWS VIEW */}
                {currentPage === 'reviews' && (
                  <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ReviewsSection
                      reviews={reviews}
                      onAddReview={async (newRev) => {
                        const created = await api.addReview(newRev);
                        setReviews((prev) => [created, ...prev]);
                      }}
                    />
                  </div>
                )}

                {/* 7. ACCOUNT VIEW */}
                {currentPage === 'account' && (
                  <AccountPage
                    orders={orders}
                    products={products}
                    onExploreMenu={() => navigateTo('menu')}
                  />
                )}

                {/* 8. ADMIN DASHBOARD */}
                {currentPage === 'admin' && (
                  <AdminDashboard
                    products={products}
                    orders={orders}
                    messages={messages}
                    settings={settings!}
                    onAddProduct={async (p) => {
                      const created = await api.addProduct(p);
                      setProducts((prev) => [created, ...prev]);
                      return created;
                    }}
                    onUpdateProduct={async (p) => {
                      const updated = await api.updateProduct(p);
                      setProducts((prev) => prev.map((item) => (item.id === p.id ? updated : item)));
                      return updated;
                    }}
                    onDeleteProduct={async (id) => {
                      const success = await api.deleteProduct(id);
                      if (success) {
                        setProducts((prev) => prev.filter((item) => item.id !== id));
                      }
                      return success;
                    }}
                    onUpdateOrderStatus={async (id, status) => {
                      const updated = await api.updateOrderStatus(id, status);
                      if (updated) {
                        setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
                      }
                    }}
                    onUpdateMessageStatus={async (id, status) => {
                      await api.updateContactStatus(id, status);
                      setMessages((prev) =>
                        prev.map((m) => (m.id === id ? { ...m, status } : m))
                      );
                    }}
                    onUpdateSettings={async (newSettings) => {
                      const updated = await api.updateSettings(newSettings);
                      setSettings(updated);
                      return updated;
                    }}
                    onReturnToStore={() => navigateTo('home')}
                  />
                )}
              </>
            )}
          </main>

          {/* Quick View Modal */}
          <ProductQuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />

          {/* Slide-over Cart Drawer */}
          <CartDrawer
            onNavigateToCheckout={() => navigateTo('checkout')}
            onExploreMenu={() => navigateTo('menu')}
          />

          {/* Global Footer */}
          <Footer onNavigate={navigateTo} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
