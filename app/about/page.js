'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { personalInfo, stats } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Database, 
  Cpu, 
  Flame, 
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  Layers
} from 'lucide-react';

export default function AboutPage() {
  const { playSound, setHireDrawerOpen } = usePortfolio();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#190B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl p-3 bg-gradient-to-b from-[#A8325E]/40 via-[#451A2D] to-[#190B12] border-2 border-[#F0A6BC]/30 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#190B12]">
                <Image
                  src={personalInfo.portraitUrl}
                  alt="Muhammad bin Rashid"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC]">
              <Sparkles size={14} className="text-[#A8325E]" />
              <span>Full Stack Web Engineer &amp; Continuous Learner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFF1F4] tracking-tight">
              About Muhammad bin Rashid
            </h1>

            <p className="text-lg text-[#F0A6BC] font-medium leading-relaxed">
              &ldquo;I believe software should not just function; it should captivate the user through speed, responsiveness, and aesthetic precision.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#FFF1F4]/80 leading-relaxed">
              With 1 year of professional hands-on development experience, I have bridged the gap between ambitious design visions and reliable, database-backed architectures. Having dealt with real-world clients and built complex production clones (like <strong>Digital Impact</strong> and <strong>Matias</strong>), I understand the nuances of requirement analysis, sprint deadlines, and performance optimization.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  playSound('click');
                  setHireDrawerOpen(true);
                }}
                className="btn-primary px-7 py-3 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Work with Muhammad</span>
                <ArrowRight size={16} />
              </button>

              <Link
                href="/projects"
                className="btn-secondary px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 text-[#FFF1F4]"
              >
                <Code2 size={16} className="text-[#F0A6BC]" />
                <span>Explore Projects Archive</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Core Pillars of Muhammad's Workflow */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#FFF1F4] tracking-tight mb-3">
              Engineering Principles &amp; Daily Practice
            </h2>
            <p className="text-sm text-[#FFF1F4]/75">
              The foundational standards that guarantee every web application Muhammad delivers is bulletproof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 bg-[#451A2D]/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8325E]/40 flex items-center justify-center text-[#F0A6BC]">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-[#FFF1F4]">Performance &amp; Lazy Loading</h3>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                Aggressive code-splitting, dynamic component loading, optimized Next.js WebP/AVIF images, and sub-second First Contentful Paint.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 bg-[#451A2D]/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 flex items-center justify-center text-emerald-400">
                <Database size={20} />
              </div>
              <h3 className="text-base font-bold text-[#FFF1F4]">MongoDB &amp; Express APIs</h3>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                Structured Mongoose schemas, compound indexes, input sanitization, centralized error handling, and robust aggregation pipelines.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 bg-[#451A2D]/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8325E]/40 flex items-center justify-center text-[#F0A6BC]">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold text-[#FFF1F4]">HOCs &amp; Clean Patterns</h3>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                Using Higher-Order Components for lazy scroll animation triggers, 3D card tilt physics, and reusable UI abstractions.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 bg-[#451A2D]/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300">
                <Award size={20} />
              </div>
              <h3 className="text-base font-bold text-[#FFF1F4]">Client-Centric Handoffs</h3>
              <p className="text-xs text-[#FFF1F4]/75 leading-relaxed">
                Clear sprint communication, documented Postman endpoints, video walkthroughs, and seamless Vercel / cloud deployment.
              </p>
            </div>

          </div>
        </div>

        {/* Learning Journey & Future Horizon */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#F0A6BC]/25 bg-[#451A2D]/50 mb-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F0A6BC] uppercase tracking-wider">
              <BookOpen size={14} className="text-[#A8325E]" />
              <span>Continuous Growth &amp; Exploration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFF1F4]">
              Always Learning, Always Expanding
            </h2>
            <p className="text-sm text-[#FFF1F4]/80 leading-relaxed">
              Technology evolves rapidly, and I stay ahead by continuously diving into emerging paradigms. Currently sharpening expertise in <strong>Next.js Server Actions</strong>, <strong>Redis micro-caching</strong>, <strong>Three.js / WebGL shader effects</strong>, and <strong>Dockerized microservices</strong>.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {['Next.js 15 Server Actions', 'Redis Caching', 'Docker Containers', 'Microservices Architecture', 'TypeScript Strict Mode', 'Three.js / WebGL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#190B12] text-[#F0A6BC] border border-[#F0A6BC]/20"
                >
                  ✦ {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
