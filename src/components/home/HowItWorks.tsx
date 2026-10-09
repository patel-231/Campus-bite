import React from 'react';
import { Search, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Explore your favourites',
      description:
        'Browse our curated canteen menu featuring authentic street bites, grilled burgers, cold brews, and desserts.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Add items and place order',
      description:
        'Select your preferred quantity, enter your student location or block, and choose UPI or Cash on Pickup.',
      icon: ShoppingBag,
    },
    {
      number: '03',
      title: 'Collect or get campus delivery',
      description:
        'Grab your freshly prepared meal directly from the canteen pickup counter or receive it right at your campus block.',
      icon: UtensilsCrossed,
    },
  ];

  return (
    <section className="my-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
          Simple 3-Step Process
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#202124] mt-1 tracking-tight">
          How Campus Bite Works
        </h2>
        <p className="text-sm text-[#777777] mt-2">
          Designed for college students to avoid canteen congestion and enjoy fresh food on campus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-[#EAEAEA] relative transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-display text-2xl font-bold text-[#EAEAEA]">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-[#202124] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
