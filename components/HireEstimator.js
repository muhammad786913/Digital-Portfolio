'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Check, 
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export default function HireEstimator() {
  const { playSound, setHireDrawerOpen, setInquiryScope } = usePortfolio();

  const [projectType, setProjectType] = useState('fullstack');
  const [selectedAddons, setSelectedAddons] = useState(['mongodb', 'gsap']);

  const projectTypes = [
    {
      id: 'fullstack',
      title: 'Full Stack Web App',
      basePrice: 1200,
      baseDays: 14,
      desc: 'Next.js Frontend + Express & MongoDB Backend'
    },
    {
      id: 'clone',
      title: 'High-End Website Clone',
      basePrice: 900,
      baseDays: 10,
      desc: 'Digital Impact / Matias-style responsive recreation'
    },
    {
      id: 'landing',
      title: 'Animated GSAP Landing Page',
      basePrice: 750,
      baseDays: 7,
      desc: 'Award-winning animations, 3D card tilts & dark mode'
    },
    {
      id: 'backend',
      title: 'Express & MongoDB REST API',
      basePrice: 850,
      baseDays: 8,
      desc: 'Database schemas, aggregation queries, and endpoints'
    }
  ];

  const addonsList = [
    { id: 'mongodb', label: 'MongoDB Atlas & Schema Design', price: 300, days: 3, icon: Database },
    { id: 'auth', label: 'JWT Auth & Role Protection', price: 250, days: 2, icon: ShieldCheck },
    { id: 'gsap', label: 'Advanced GSAP Scroll Choreography', price: 350, days: 3, icon: Zap },
    { id: 'seo', label: 'Lighthouse 95+ & Semantic SEO', price: 200, days: 2, icon: Globe }
  ];

  const toggleAddon = (id) => {
    playSound('click');
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const currentType = projectTypes.find(t => t.id === projectType);
  const addonsPrice = selectedAddons.reduce((acc, currId) => {
    const item = addonsList.find(a => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);

  const addonsDays = selectedAddons.reduce((acc, currId) => {
    const item = addonsList.find(a => a.id === currId);
    return acc + (item ? item.days : 0);
  }, 0);

  const totalPrice = currentType.basePrice + addonsPrice;
  const totalDays = currentType.baseDays + addonsDays;

  const handleProceed = () => {
    playSound('success');
    setInquiryScope({
      service: currentType.title,
      budget: `$${totalPrice} (Estimated)`,
      timeline: `${totalDays} Days`,
      features: selectedAddons.map(id => addonsList.find(a => a.id === id)?.label).filter(Boolean)
    });
    setHireDrawerOpen(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#26111C]/40 border-t border-[#F0A6BC]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Calculator size={14} className="text-[#A8325E]" />
            <span>Transparent Pricing &amp; Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Interactive Project Cost &amp; Scope Estimator
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Configure your dream project specifications to calculate an instant cost and timeline estimate for hiring Muhammad.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Selection Area */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-sm font-bold text-[#FFF1F4] mb-3 uppercase tracking-wider">
                1. Select Core Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const isSelected = projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setProjectType(type.id);
                      }}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#A8325E]/30 border-[#A8325E] shadow-lg shadow-[#A8325E]/20'
                          : 'glass-panel border-[#F0A6BC]/15 hover:border-[#F0A6BC]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-base text-[#FFF1F4]">{type.title}</span>
                        {isSelected && <Check size={16} className="text-[#F0A6BC]" />}
                      </div>
                      <p className="text-xs text-[#FFF1F4]/70 mb-3">{type.desc}</p>
                      <div className="text-xs font-mono font-semibold text-[#F0A6BC]">
                        From ${type.basePrice} • ~{type.baseDays} Days
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div>
              <label className="block text-sm font-bold text-[#FFF1F4] mb-3 uppercase tracking-wider">
                2. Select Add-on Capabilities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addonsList.map((addon) => {
                  const Icon = addon.icon;
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#451A2D] border-[#A8325E] shadow-md'
                          : 'glass-panel border-[#F0A6BC]/15 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                          isChecked ? 'bg-[#A8325E] text-[#FFF1F4]' : 'bg-[#190B12] text-[#F0A6BC]'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#FFF1F4]">{addon.label}</div>
                          <div className="text-[11px] font-mono text-[#F0A6BC]">
                            +${addon.price} (+{addon.days}d)
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked ? 'bg-[#A8325E] border-[#F0A6BC]' : 'border-[#F0A6BC]/30'
                      }`}>
                        {isChecked && <Check size={12} className="text-[#FFF1F4]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-[#F0A6BC]/30 shadow-2xl bg-[#451A2D]/60 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#F0A6BC]/20 mb-6">
              <div>
                <span className="text-xs font-semibold text-[#F0A6BC] uppercase tracking-wider">Estimate Summary</span>
                <h3 className="text-2xl font-extrabold text-[#FFF1F4] mt-1">{currentType.title}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A8325E] to-[#190B12] flex items-center justify-center text-[#FFF1F4] shadow-md">
                <Sparkles size={22} className="text-[#F0A6BC]" />
              </div>
            </div>

            {/* Price & Timeline Display */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/20">
                <div className="text-xs text-[#FFF1F4]/70 mb-1 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#A8325E]" />
                  <span>Estimated Total</span>
                </div>
                <div className="text-3xl font-extrabold text-[#FFF1F4] font-mono">
                  ${totalPrice}
                </div>
                <span className="text-[10px] text-[#F0A6BC]">Transparent milestone billing</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/20">
                <div className="text-xs text-[#FFF1F4]/70 mb-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-[#A8325E]" />
                  <span>Delivery Span</span>
                </div>
                <div className="text-3xl font-extrabold text-[#FFF1F4] font-mono">
                  ~{totalDays} <span className="text-base font-normal">Days</span>
                </div>
                <span className="text-[10px] text-emerald-400">On-time delivery pledge</span>
              </div>
            </div>

            {/* Selected Inclusions */}
            <div className="space-y-2 mb-8">
              <div className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Scope Inclusions:</div>
              <div className="flex items-center gap-2 text-xs text-[#FFF1F4]/80">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Modern Next.js &amp; Tailwind CSS Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#FFF1F4]/80">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Responsive on Desktop, Tablet &amp; Mobile</span>
              </div>
              {selectedAddons.map(id => (
                <div key={id} className="flex items-center gap-2 text-xs text-[#FFF1F4]/80">
                  <Check size={14} className="text-[#A8325E] shrink-0" />
                  <span>{addonsList.find(a => a.id === id)?.label}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={handleProceed}
              className="w-full btn-primary py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl group cursor-pointer"
            >
              <Sparkles size={18} className="text-[#F0A6BC] group-hover:rotate-45 transition-transform" />
              <span>Book This Project with Muhammad</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-[#FFF1F4]/60 text-center mt-3">
              No immediate commitment required. Pre-fills direct email &amp; message.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
