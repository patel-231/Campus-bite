import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';

interface SpecialOffersProps {
  onApplyOffer?: (code: string) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('CAMPUSBITE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="my-12">
      <div className="rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E95420] text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute right-24 -top-12 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Student Special</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get 10% Off Your Entire Campus Order
            </h3>
            <p className="text-sm text-orange-100 leading-relaxed">
              Use code at checkout to save on lunch, snacks, or evening study fuel at Silver Oak University.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/20 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="px-3 py-1.5 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-200" />
              <span className="font-mono font-bold text-base tracking-wider">CAMPUSBITE10</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-[#202124] hover:bg-orange-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#238636]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
