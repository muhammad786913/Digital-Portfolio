'use client';

import React from 'react';
import { stats } from '@/lib/data';
import { Award, Code2, Users, Database } from 'lucide-react';

const icons = [Award, Code2, Users, Database];

export default function StatsBar() {
  return (
    <section className="relative py-12 border-y border-[#F0A6BC]/15 bg-[#26111C]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <div
                key={stat.label}
                className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#451A2D] flex items-center justify-center text-[#F0A6BC] group-hover:bg-[#A8325E] group-hover:text-[#FFF1F4] transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#190B12] text-[#F0A6BC] border border-[#F0A6BC]/20">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#FFF1F4] mb-1 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#F0A6BC] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#FFF1F4]/60">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
