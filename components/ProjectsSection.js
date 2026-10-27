'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import withCardHover from '@/components/hoc/withCardHover';
import { 
  ExternalLink, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  BarChart3,
  Database,
  CheckCircle2
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

function BaseProjectCard({ project }) {
  const { setActiveProject, playSound } = usePortfolio();

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 flex flex-col h-full bg-[#451A2D]/40 group shadow-xl">
      {/* Project Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#190B12]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#190B12] via-transparent to-transparent opacity-80"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#190B12]/80 backdrop-blur-md text-[#F0A6BC] border border-[#F0A6BC]/30 shadow-md">
            {project.categoryLabel}
          </span>
        </div>

        {/* Quick View Button on Image */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => {
              playSound('click');
              setActiveProject(project);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#A8325E] text-[#FFF1F4] text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#C23E70] transition-colors cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Title & Subtitle */}
          <h3 className="text-xl font-extrabold text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors mb-1.5">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-[#F0A6BC]/80 mb-3 line-clamp-1">
            {project.subtitle}
          </p>
          <p className="text-sm text-[#FFF1F4]/75 leading-relaxed mb-4 line-clamp-3">
            {project.summary}
          </p>

          {/* Metric Highlights Pill */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#190B12]/60 border border-[#F0A6BC]/15 flex items-center justify-between text-xs">
              <span className="text-[#FFF1F4]/70 flex items-center gap-1">
                <BarChart3 size={13} className="text-[#A8325E]" />
                {project.metrics[0].label}:
              </span>
              <span className="font-mono font-bold text-[#F0A6BC]">
                {project.metrics[0].value}
              </span>
            </div>
          )}

          {/* Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#190B12]/80 text-[#FFF1F4]/80 border border-[#F0A6BC]/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-4 border-t border-[#F0A6BC]/15 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playSound('click');
              setActiveProject(project);
            }}
            className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-grow justify-center cursor-pointer"
          >
            <Layers size={14} />
            <span>Architecture &amp; Details</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2.5 rounded-xl bg-[#190B12] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[#FFF1F4] transition-colors"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Live Preview"
            className="p-2.5 rounded-xl bg-[#190B12] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[#FFF1F4] transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Wrap with 3D Tilt HOC
const ProjectCardWithHover = withCardHover(BaseProjectCard);

export default function ProjectsSection() {
  const { filterCategory, setFilterCategory, playSound } = usePortfolio();

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack & MongoDB' },
    { key: 'client', label: 'Client & Agency Clones' },
    { key: 'frontend', label: 'Interactive GSAP' }
  ];

  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter(p => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#190B12]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ambient-orb-1 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
              <Sparkles size={14} className="text-[#A8325E]" />
              <span>Proven Production Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight">
              Featured Web Applications &amp; Clones
            </h2>
            <p className="text-base text-[#FFF1F4]/75 mt-3">
              Detailed case studies demonstrating full-stack engineering, client workflows, responsive CSS, and Express + MongoDB integrations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = filterCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    playSound('click');
                    setFilterCategory(cat.key);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#A8325E] text-[#FFF1F4] shadow-md border border-[#F0A6BC]/40'
                      : 'bg-[#451A2D]/50 text-[#FFF1F4]/70 hover:text-[#FFF1F4] border border-[#F0A6BC]/15 hover:bg-[#451A2D]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCardWithHover key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom CTA to Projects Archive */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full glass-panel border border-[#F0A6BC]/30 text-sm font-bold text-[#FFF1F4] hover:bg-[#A8325E] hover:border-[#A8325E] transition-all shadow-lg group"
          >
            <span>Explore All Projects &amp; Live API Demos</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
