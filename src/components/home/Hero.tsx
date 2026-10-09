import React from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { heroSpreadImg } from '../../data/initialData';

interface HeroProps {
  onExploreMenu: () => void;
  onHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onHowItWorks }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#E95420]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Silver Oak University Campus Dining</span>
              <span aria-hidden="true" className="text-[#777777]">·</span>
              <span className="text-[#777777]">Fast & Hygienic</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.1] text-balance">
              Your Campus Cravings, <span className="text-[#FF6B35]">Delivered.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#777777] max-w-xl leading-relaxed">
              Discover your favourites, explore delicious meals, and make every campus break better. Order ahead, skip the long canteen lines, and get fresh food delivered right across college blocks.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#FF6B35] hover:bg-[#E95420] rounded-xl shadow-md transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group hover:shadow-lg"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onHowItWorks}
                className="px-6 py-3.5 text-sm font-semibold text-[#202124] bg-white hover:bg-gray-50 border border-[#EAEAEA] rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                How It Works
              </button>
            </div>

            {/* Trust points - clean unboxed metadata */}
            <div className="pt-6 border-t border-[#EAEAEA] grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#202124]">
                <CheckCircle2 className="w-4 h-4 text-[#238636] shrink-0" />
                <span>Student Prices (₹50-₹80)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#202124]">
                <MapPin className="w-4 h-4 text-[#FF6B35] shrink-0" />
                <span>Pick Up or Campus Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#202124]">
                <CheckCircle2 className="w-4 h-4 text-[#238636] shrink-0" />
                <span>Made Fresh Daily</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white">
              <img
                src={heroSpreadImg}
                alt="Delicious Campus Bite food spread including samosas, grilled sandwiches, nachos, and cold coffee"
                className="w-full h-full object-cover aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] transition-transform duration-500 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium uppercase tracking-wider text-orange-200">
                  Campus Bite Canteen Specials
                </p>
                <p className="text-base font-bold font-display">
                  Samosas, Grilled Sandwiches, Vada Pav & Fresh Cold Brews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
