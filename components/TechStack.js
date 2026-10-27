'use client';

import React, { useState } from 'react';
import { skills } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Layout, 
  Server, 
  Sparkles, 
  Wrench, 
  Check, 
  Zap,
  Layers
} from 'lucide-react';

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend');
  const { playSound } = usePortfolio();

  const tabs = [
    { key: 'frontend', label: 'Frontend Engineering', icon: Layout, desc: 'Next.js, React, Tailwind CSS & JavaScript' },
    { key: 'backend', label: 'Backend & MongoDB', icon: Server, desc: 'Node.js, Express APIs, MongoDB & Auth' },
    { key: 'animationAndState', label: 'GSAP & State Architecture', icon: Sparkles, desc: 'ScrollTrigger, Context API & HOCs' },
    { key: 'toolsAndWorkflow', label: 'DevOps & Tooling', icon: Wrench, desc: 'Git, Postman, Vercel & Performance' }
  ];

  const currentSkills = skills[activeTab] || [];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Zap size={14} className="text-[#A8325E]" />
            <span>High-Octane Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Full Stack Architecture &amp; Skill Matrix
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Engineered with modern industry best practices, prioritizing sub-second performance, strict typing, responsive design, and database resilience.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.key);
                }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#A8325E] to-[#5C223C] text-[#FFF1F4] border border-[#F0A6BC]/40 shadow-lg shadow-[#A8325E]/30 scale-105'
                    : 'glass-panel text-[#FFF1F4]/70 hover:text-[#FFF1F4] hover:bg-[#451A2D]/60'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#F0A6BC]' : 'text-[#F0A6BC]/60'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/15 hover:border-[#A8325E] transition-all duration-300 group hover:-translate-y-1 shadow-md bg-[#451A2D]/35"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-base text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#190B12] text-[#F0A6BC] border border-[#F0A6BC]/20">
                  {skill.tag}
                </span>
              </div>

              {/* Skill Progress Bar */}
              <div className="w-full bg-[#190B12] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#F0A6BC]/10 mb-3">
                <div
                  className="bg-gradient-to-r from-[#A8325E] to-[#F0A6BC] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#FFF1F4]/60">
                <span>Proficiency Level</span>
                <span className="font-mono font-bold text-[#F0A6BC]">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Note */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-[#A8325E]/40 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#451A2D]/50 to-[#190B12]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A8325E] flex items-center justify-center text-[#FFF1F4] shrink-0 shadow-md">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#FFF1F4]">Production-Ready Code Standards</h3>
              <p className="text-xs sm:text-sm text-[#FFF1F4]/75">
                Every project implements clean folder architecture, semantic HTML5, lazy loading, and error-handling middleware.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
              <Check size={14} /> Strict Clean Code
            </span>
            <span className="px-3 py-1 rounded-full bg-[#A8325E]/20 text-[#F0A6BC] border border-[#F0A6BC]/20 text-xs font-semibold">
              SEO Optimized
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}