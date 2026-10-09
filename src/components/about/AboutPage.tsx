import React from 'react';
import { ArrowRight, Utensils, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';
import { heroSpreadImg } from '../../data/initialData';

interface AboutPageProps {
  onExploreMenu: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreMenu }) => {
  const pillars = [
    {
      title: 'Diverse Student Menu',
      desc: 'Explore a broad selection of campus favorites, from traditional Indian street food (samosas, vada pav, frankies) to cheesy grilled sandwiches, burgers, and chilled coffees.',
      icon: Utensils,
    },
    {
      title: 'Fast & User-Friendly',
      desc: 'Our platform is designed with college students in mind. Enjoy an intuitive ordering flow that lets you order ahead between lectures and bypass crowded canteen counters.',
      icon: Zap,
    },
    {
      title: 'Quality & Hygiene First',
      desc: 'Every item is freshly prepared following rigorous kitchen hygiene standards, using fresh ingredients daily at student-friendly prices.',
      icon: ShieldCheck,
    },
    {
      title: 'Reliable Campus Delivery',
      desc: 'Pick up quickly from the canteen counter or receive your orders right across academic blocks, library lounges, and hostel gates.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
            Our Story & Mission
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
            Simplifying How College Students Order Food.
          </h1>
          <p className="text-base text-[#777777] leading-relaxed">
            Welcome to <strong className="text-[#202124]">Campus Bite</strong>, your go-to destination for delicious and convenient food ordering at Silver Oak University. We are passionate about making your campus dining experience as delightful and seamless as possible by offering great food right at your fingertips.
          </p>
          <p className="text-sm text-[#777777] leading-relaxed">
            At Campus Bite, we believe that great food should be accessible, easy to order, and served with warmth. Whether you are craving a quick samosa during a 10-minute break, a grilled sandwich between lectures, or cold coffee to fuel your evening study sessions, we’ve got you covered.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3.5 bg-[#FF6B35] hover:bg-[#E95420] text-white text-xs font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Today's Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#EAEAEA]">
            <img
              src={heroSpreadImg}
              alt="Campus Bite fresh canteen food spread"
              className="w-full h-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* What sets us apart */}
      <div className="my-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35]">
            Core Values
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#202124] mt-1">
            What Sets Campus Bite Apart
          </h2>
          <p className="text-xs text-[#777777] mt-2">
            Built specifically around student routines, tight class intervals, and student budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#EAEAEA] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF8F1] border border-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#202124] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Commitment Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAEAEA] text-center max-w-3xl mx-auto space-y-4 shadow-xs">
        <h3 className="font-display text-2xl font-bold text-[#202124]">
          Freshness & Quality Guaranteed
        </h3>
        <p className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xl mx-auto">
          Every bite served at Campus Bite is prepared in accordance with university hygiene protocols. We pride ourselves on transparent student pricing with no hidden charges.
        </p>
        <div className="pt-2">
          <button
            onClick={onExploreMenu}
            className="px-6 py-3 bg-[#202124] hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Order Your Canteen Meal Now
          </button>
        </div>
      </div>
    </div>
  );
};
