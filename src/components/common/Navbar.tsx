import React, { useState } from 'react';
import { ShoppingBag, User, ShieldCheck, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { itemCount, openDrawer } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Explore Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F1]/95 backdrop-blur-md border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-[#202124] whitespace-nowrap shrink-0">
              Campus<span className="text-[#FF6B35]">Bite</span>
            </span>
          </button>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 relative py-1 ${
                    isActive
                      ? 'text-[#FF6B35] font-semibold'
                      : 'text-[#202124]/80 hover:text-[#FF6B35]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Cart, Account, Admin, Mobile Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              aria-label="View shopping cart"
              className="relative p-2.5 rounded-lg border border-[#EAEAEA] bg-white text-[#202124] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Account Profile Trigger */}
            <button
              onClick={() => onNavigate('account')}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                currentPage === 'account'
                  ? 'bg-[#202124] text-white border-[#202124]'
                  : 'bg-white text-[#202124] border-[#EAEAEA] hover:border-gray-300'
              }`}
            >
              <User className="w-4 h-4 text-[#FF6B35]" />
              <span className="truncate max-w-[100px]">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Admin Dashboard Entry */}
            <button
              onClick={() => onNavigate('admin')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-[#FF6B35] text-white'
                  : 'text-[#777777] hover:text-[#202124] hover:bg-black/5'
              }`}
              title="Admin Staff Dashboard"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Portal' : 'Staff'}</span>
            </button>

            {/* Order Now CTA (if on other pages) */}
            {currentPage !== 'menu' && (
              <button
                onClick={() => onNavigate('menu')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                Order Now
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#202124] hover:bg-black/5 md:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EAEAEA] space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-[#FF6B35]/10 text-[#FF6B35] font-semibold'
                    : 'text-[#202124] hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#EAEAEA] flex gap-2">
              <button
                onClick={() => {
                  onNavigate('account');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-semibold text-center border border-[#EAEAEA] rounded-lg bg-white"
              >
                My Account
              </button>
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-medium text-center border border-[#EAEAEA] rounded-lg bg-white text-[#777777]"
              >
                Staff Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
