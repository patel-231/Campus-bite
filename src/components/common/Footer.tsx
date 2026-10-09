import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#EAEAEA] text-[#202124] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#EAEAEA]">
          {/* Col 1: Brand & Campus Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
              <span className="font-display text-xl font-bold tracking-tight text-[#202124]">
                Campus<span className="text-[#FF6B35]">Bite</span>
              </span>
            </div>
            <p className="text-sm text-[#777777] leading-relaxed">
              Fast, delicious, and pocket-friendly meals crafted specifically for college students at Silver Oak University. Skip the line, order ahead, and satisfy your campus cravings.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919712871557"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#238636]/10 text-[#238636] hover:bg-[#238636]/20 transition-colors text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp (+91 97128 71557)
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#202124] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#777777]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  Full Menu & Combos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  Student Reviews & Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  Student Account & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Food Categories */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#202124] mb-4">
              Menu Highlights
            </h4>
            <ul className="space-y-2.5 text-sm text-[#777777]">
              <li>
                <span className="hover:text-[#FF6B35] cursor-pointer" onClick={() => onNavigate('menu')}>
                  Mumbai Vada Pav & Samosas
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF6B35] cursor-pointer" onClick={() => onNavigate('menu')}>
                  Grilled Sandwiches & Burgers
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF6B35] cursor-pointer" onClick={() => onNavigate('menu')}>
                  Vanilla & Blueberry Cold Coffee
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF6B35] cursor-pointer" onClick={() => onNavigate('menu')}>
                  Cheese Nachos & Fan Fries
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF6B35] cursor-pointer" onClick={() => onNavigate('menu')}>
                  Brownie with Ice Cream (₹80)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Campus Hours */}
          <div className="space-y-3.5">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#202124] mb-4">
              Campus Support
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-[#777777]">
              <Phone className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <a href="tel:+919712871557" className="hover:text-[#FF6B35] transition-colors">
                +91 97128 71557
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-[#777777]">
              <Mail className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <a href="mailto:2202021000377@silveroakuni.ac.in" className="hover:text-[#FF6B35] transition-colors break-all">
                2202021000377@silveroakuni.ac.in
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-[#777777]">
              <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <span>Silver Oak University, Gota, Ahmedabad, Gujarat</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-[#777777]">
              <Clock className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          <div>
            &copy; 2026 Campus Bite. All rights reserved. Silver Oak University Campus Service.
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#202124] transition-colors cursor-pointer"
            >
              Contact Support
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#202124] transition-colors cursor-pointer"
            >
              Privacy & Hygiene Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#FF6B35] font-semibold transition-colors cursor-pointer"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
