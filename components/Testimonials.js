'use client';

import React from 'react';
import { testimonials } from '@/lib/data';
import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#190B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <MessageSquare size={14} className="text-[#A8325E]" />
            <span>Endorsements &amp; Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Trusted by Founders, Agencies &amp; Collaborators
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            What clients and teammates say about working with Muhammad on complex full-stack web applications.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="glass-panel p-8 rounded-3xl border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 shadow-xl bg-[#451A2D]/40 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={28} className="text-[#F0A6BC]/30 group-hover:text-[#A8325E] transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#FFF1F4]/85 leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author & Project info */}
              <div className="pt-4 border-t border-[#F0A6BC]/15 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#A8325E] to-[#190B12] border border-[#F0A6BC]/40 flex items-center justify-center font-bold text-sm text-[#FFF1F4]">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#FFF1F4]">{item.name}</div>
                  <div className="text-xs text-[#F0A6BC] font-medium">{item.role}</div>
                  <div className="text-[11px] text-[#FFF1F4]/50 mt-0.5 font-mono">
                    Project: {item.project}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
