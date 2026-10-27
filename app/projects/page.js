'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import withCardHover from '@/components/hoc/withCardHover';
import { 
  Sparkles, 
  Search, 
  Layers, 
  ExternalLink, 
  Database,
  ArrowRight
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

function ProjectDirectoryCard({ project }) {
  const { setActiveProject, playSound } = usePortfolio();

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-[#F0A6BC]/20 hover:border-[#A8325E] transition-all duration-300 flex flex-col h-full bg-[#451A2D]/40 group shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden bg-[#190B12]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#190B12] via-transparent to-transparent opacity-85"></div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#190B12]/80 backdrop-blur-md text-[#F0A6BC] border border-[#F0A6BC]/30 shadow-md">
            {project.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-[#F0A6BC]/80 mb-3">
            {project.subtitle}
          </p>
          <p className="text-sm text-[#FFF1F4]/75 leading-relaxed mb-4">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#190B12] text-[#FFF1F4]/80 border border-[#F0A6BC]/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0A6BC]/15 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playSound('click');
              setActiveProject(project);
            }}
            className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-grow justify-center cursor-pointer"
          >
            <Layers size={14} />
            <span>Architecture &amp; Case Study</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 rounded-xl bg-[#190B12] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[#FFF1F4] transition-colors"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Live Demo"
            className="p-2 rounded-xl bg-[#190B12] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[#FFF1F4] transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

const HoverableCard = withCardHover(ProjectDirectoryCard);

export default function ProjectsPage() {
  const { playSound } = usePortfolio();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack & MongoDB' },
    { key: 'client', label: 'Client / Agency Clones' },
    { key: 'frontend', label: 'Interactive GSAP' }
  ];

  const filtered = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.stack.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#190B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Sparkles size={14} className="text-[#A8325E]" />
            <span>Complete Work Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Production Projects, Clones &amp; Web Applications
          </h1>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Explore 15+ web applications engineered by Muhammad bin Rashid, ranging from responsive client agency websites and interactive GSAP portfolios to database-backed Express &amp; MongoDB architectures.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-[#F0A6BC]/20 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#451A2D]/40">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    playSound('click');
                    setSelectedCategory(cat.key);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#A8325E] text-[#FFF1F4] shadow-md border border-[#F0A6BC]/40'
                      : 'bg-[#190B12] text-[#FFF1F4]/70 hover:text-[#FFF1F4] border border-[#F0A6BC]/15'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F0A6BC]/70" />
            <input
              type="text"
              placeholder="Search by tech, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] placeholder-[#FFF1F4]/40 focus:border-[#A8325E] focus:outline-none"
            />
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <HoverableCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border border-[#F0A6BC]/20">
            <p className="text-base text-[#FFF1F4]/70 mb-2">No projects matched your search criteria.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all'); }}
              className="btn-secondary px-5 py-2 rounded-xl text-xs font-semibold text-[#F0A6BC]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
