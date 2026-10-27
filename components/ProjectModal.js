'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Database, 
  Sparkles, 
  BarChart3,
  Terminal
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

export default function ProjectModal() {
  const { activeProject, setActiveProject, playSound } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeProject, setActiveProject]);

  if (!activeProject) return null;

  const closeModal = () => {
    playSound('click');
    setActiveProject(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#190B12]/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl glass-panel rounded-3xl border border-[#F0A6BC]/30 bg-[#451A2D]/90 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#190B12]/80 hover:bg-[#A8325E] border border-[#F0A6BC]/30 text-[#FFF1F4] transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Hero Image */}
        <div className="relative aspect-video w-full bg-[#190B12]">
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            sizes="896px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#451A2D] via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#A8325E] text-[#FFF1F4] border border-[#F0A6BC]/30 mb-2 inline-block shadow-md">
              {activeProject.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFF1F4] drop-shadow-md">
              {activeProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#F0A6BC] font-medium drop-shadow-sm">
              {activeProject.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Project Overview</h3>
            <p className="text-sm text-[#FFF1F4]/85 leading-relaxed">
              {activeProject.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#190B12]/70 border border-[#F0A6BC]/15">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>The Problem &amp; Client Need</span>
              </h4>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                {activeProject.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#190B12]/70 border border-emerald-500/25">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                <span>Muhammad&apos;s Engineering Solution</span>
              </h4>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                {activeProject.solution}
              </p>
            </div>
          </div>

          {/* Architecture Breakdown */}
          {activeProject.architecture && (
            <div className="p-5 rounded-2xl bg-[#190B12]/80 border border-[#A8325E]/30 space-y-2.5">
              <h4 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider flex items-center gap-2">
                <Terminal size={14} className="text-[#A8325E]" />
                <span>Technical Architecture Stack</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(activeProject.architecture).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-lg bg-[#451A2D]/40 border border-[#F0A6BC]/10">
                    <span className="font-bold text-[#F0A6BC] uppercase text-[10px] block">{key}</span>
                    <span className="text-[#FFF1F4]/80">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {activeProject.keyHighlights && (
            <div>
              <h4 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2.5">Feature Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeProject.keyHighlights.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#FFF1F4]/80">
                    <Sparkles size={13} className="text-[#A8325E] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Badges */}
          <div>
            <h4 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.stack.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#190B12] text-[#FFF1F4] border border-[#F0A6BC]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 bg-[#190B12] border-t border-[#F0A6BC]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={activeProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2"
            >
              <ExternalLink size={15} />
              <span>Launch Live Project</span>
            </a>
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2"
            >
              <GithubIcon size={15} />
              <span>GitHub Code</span>
            </a>
          </div>

          <button
            onClick={closeModal}
            className="text-xs text-[#FFF1F4]/60 hover:text-[#FFF1F4] font-medium"
          >
            Close Window (Esc)
          </button>
        </div>

      </div>
    </div>
  );
}
