'use client';

import React from 'react';
import { services, personalInfo } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Sparkles, 
  Rocket, 
  Database, 
  Layers, 
  Clock, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const icons = {
  Rocket: Rocket,
  Sparkles: Sparkles,
  Database: Database,
  Layers: Layers
};

export default function ServicesPage() {
  const { playSound, openHireModalWithService } = usePortfolio();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#190B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Sparkles size={14} className="text-[#A8325E]" />
            <span>Client Solutions &amp; Engineering Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Services Muhammad Delivers
          </h1>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Turnkey full-stack solutions tailored for founders, businesses, and agency creative teams. High-performance, SEO-ready, and delivered on schedule.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => {
            const Icon = icons[service.icon] || Rocket;
            return (
              <div
                key={service.id}
                className="glass-panel p-8 rounded-3xl border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 shadow-2xl bg-[#451A2D]/40 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#190B12] border border-[#F0A6BC]/25 flex items-center justify-center text-[#F0A6BC] group-hover:bg-[#A8325E] group-hover:text-[#FFF1F4] transition-colors shadow-lg">
                      <Icon size={26} />
                    </div>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#190B12] text-[#F0A6BC] border border-[#F0A6BC]/20 flex items-center gap-1.5">
                      <Clock size={12} /> {service.timeline}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors mb-3">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#FFF1F4]/75 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Key Deliverables:</div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#FFF1F4]/80">
                        <Check size={14} className="text-[#A8325E] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F0A6BC]/15">
                  <button
                    onClick={() => openHireModalWithService(service.title)}
                    className="w-full btn-primary py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request Proposal for {service.title}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FFF1F4]">Client Satisfaction Guarantee</h3>
              <p className="text-xs sm:text-sm text-[#FFF1F4]/75">
                Every project includes revisions, complete source code handoff, video documentation, and 30-day post-launch support.
              </p>
            </div>
          </div>

          <a
            href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20for%20Muhammad`}
            className="btn-secondary px-6 py-3 rounded-xl text-xs font-bold text-[#FFF1F4] whitespace-nowrap"
          >
            Email Directly: {personalInfo.email}
          </a>
        </div>

      </div>
    </div>
  );
}
