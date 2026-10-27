'use client';

import React from 'react';
import { clientExperience } from '@/lib/data';
import { Briefcase, CheckCircle2, Calendar, Sparkles, UserCheck } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#190B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <UserCheck size={14} className="text-[#A8325E]" />
            <span>Client Track Record &amp; Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            1 Year of Relentless Execution &amp; Client Deals
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Demonstrated ability to interface with clients, understand business objectives, translate designs into code, and deliver reliable full-stack applications.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#A8325E] via-[#F0A6BC]/40 to-transparent"></div>

          <div className="space-y-12">
            {clientExperience.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.role}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#190B12] border-2 border-[#A8325E] flex items-center justify-center text-[#F0A6BC] shadow-lg shadow-[#A8325E]/40 z-10">
                    <Briefcase size={18} />
                  </div>

                  {/* Content Box */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'}`}>
                    <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 shadow-xl bg-[#451A2D]/40 group hover:-translate-y-1">
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#F0A6BC] px-2.5 py-0.5 rounded-full bg-[#190B12] border border-[#F0A6BC]/20 flex items-center gap-1.5">
                          <Calendar size={12} />
                          {exp.period}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <Sparkles size={12} /> Client Active
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-[#A8325E] mb-3">
                        {exp.company}
                      </h4>
                      <p className="text-sm text-[#FFF1F4]/75 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Bulleted Achievements */}
                      <div className="space-y-2 pt-3 border-t border-[#F0A6BC]/15">
                        {exp.achievements.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#FFF1F4]/80">
                            <CheckCircle2 size={15} className="text-[#A8325E] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
