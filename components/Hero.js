'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { personalInfo } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  Download, 
  Database, 
  Code2, 
  CheckCircle2, 
  MessageSquare,
  Flame,
  Terminal,
  Calendar
} from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const badgesRef = useRef(null);
  const portraitCardRef = useRef(null);
  const { playSound, setHireDrawerOpen, setMeetingModalOpen } = usePortfolio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-pill-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
      .fromTo(
        '.hero-title-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15 },
        '-=0.4'
      )
      .fromTo(
        '.hero-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.hero-cta-group',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(
        portraitCardRef.current,
        { scale: 0.9, opacity: 0, rotationY: 15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.1, ease: 'back.out(1.2)' },
        '-=0.8'
      )
      .fromTo(
        '.hero-floating-stat',
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15 },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 ambient-orb-1 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-1000"></div>
      <div className="absolute bottom-10 right-1/10 w-[500px] h-[500px] ambient-orb-2 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/3 w-72 h-72 ambient-orb-3 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill Badge */}
            <div className="hero-pill-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-[#F0A6BC]/30 shadow-md mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-[#FFF1F4]">
                Available For Freelance & Client Contracts
              </span>
              <span className="text-[#F0A6BC] text-xs font-bold px-2 py-0.5 rounded-full bg-[#A8325E]/40 border border-[#F0A6BC]/20">
                1+ Year Exp
              </span>
            </div>

            {/* Main Headline */}
            <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FFF1F4] leading-[1.15] mb-6">
              <span className="block hero-title-line">Hey, I&apos;m</span>
              <span className="block hero-title-line text-gradient-rose">
                Muhammad bin Rashid.
              </span>
              <span className="block hero-title-line text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0A6BC] mt-2">
                Full Stack Web Developer &amp; UI Architect
              </span>
            </h1>

            {/* Rich Subheading */}
            <p className="hero-desc text-base sm:text-lg text-[#FFF1F4]/80 font-normal leading-relaxed max-w-2xl mb-8">
              Passionate engineer building high-impact, realistic web applications and client solutions. 
              Specializing in <span className="text-[#FFF1F4] font-semibold underline decoration-[#A8325E] decoration-2 underline-offset-4">JavaScript</span>, <span className="text-[#FFF1F4] font-semibold underline decoration-[#A8325E] decoration-2 underline-offset-4">Next.js</span>, <span className="text-[#FFF1F4] font-semibold underline decoration-[#A8325E] decoration-2 underline-offset-4">Express.js</span>, and <span className="text-[#FFF1F4] font-semibold underline decoration-[#A8325E] decoration-2 underline-offset-4">MongoDB</span>, paired with butter-smooth <span className="text-[#F0A6BC] font-semibold">GSAP animations</span> and <span className="text-[#F0A6BC] font-semibold">Tailwind CSS</span>.
            </p>

            {/* Quick Action CTAs */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => {
                  playSound('click');
                  setHireDrawerOpen(true);
                }}
                className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg group w-full sm:w-auto cursor-pointer"
              >
                <Sparkles size={18} className="text-[#F0A6BC] group-hover:rotate-45 transition-transform" />
                <span>Hire Muhammad</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setMeetingModalOpen(true);
                }}
                className="btn-secondary px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer"
              >
                <Calendar size={18} className="text-[#F0A6BC]" />
                <span>Book 15-Min Call</span>
              </button>

              <Link
                href="/projects"
                onClick={() => playSound('click')}
                className="btn-secondary px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 w-full sm:w-auto"
              >
                <Code2 size={18} className="text-[#F0A6BC]" />
                <span>View All 15+ Projects</span>
              </Link>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
              >
                <MessageSquare size={17} />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#F0A6BC]/15 w-full">
              <span className="text-xs font-semibold text-[#F0A6BC]/75 uppercase tracking-wider mr-2 flex items-center gap-1.5">
                <Terminal size={14} /> Core Stack:
              </span>
              {['Next.js 15', 'Express.js', 'MongoDB Atlas', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Context API'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-[#451A2D]/60 border border-[#F0A6BC]/20 text-[#FFF1F4] hover:border-[#A8325E] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column: Developer Portrait & Floating Interactive Badges */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Main Portrait Frame */}
            <div 
              ref={portraitCardRef}
              className="relative w-full max-w-[420px] aspect-square rounded-3xl p-3 bg-gradient-to-b from-[#A8325E]/40 via-[#451A2D]/60 to-[#190B12] border-2 border-[#F0A6BC]/30 shadow-2xl shadow-[#A8325E]/20"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#190B12]">
                <Image
                  src={personalInfo.portraitUrl}
                  alt="Muhammad bin Rashid - Full Stack Web Developer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#190B12] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Developer Nameplate Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass-panel border border-[#F0A6BC]/25 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#FFF1F4]">Muhammad bin Rashid</h2>
                    <p className="text-xs text-[#F0A6BC] font-medium">Full Stack Web Developer</p>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A8325E]/60 text-xs text-[#FFF1F4] font-semibold border border-[#F0A6BC]/20">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: MongoDB & Express Champion */}
              <div className="hero-floating-stat absolute -top-5 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-[#F0A6BC]/30 shadow-xl bg-[#451A2D]/90 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 flex items-center justify-center text-white shadow-md">
                  <Database size={20} />
                </div>
                <div>
                  <div className="text-xs text-[#F0A6BC] font-semibold uppercase tracking-wider">Database Architect</div>
                  <div className="text-sm font-bold text-[#FFF1F4]">Express + MongoDB</div>
                </div>
              </div>

              {/* Floating Badge 2: Client Proven Results */}
              <div className="hero-floating-stat absolute -bottom-6 -right-4 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-[#F0A6BC]/30 shadow-xl bg-[#451A2D]/90 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8325E] to-[#451A2D] flex items-center justify-center text-[#FFF1F4] shadow-md">
                  <Flame size={20} className="text-[#F0A6BC]" />
                </div>
                <div>
                  <div className="text-xs text-[#F0A6BC] font-semibold uppercase tracking-wider">Client Impact</div>
                  <div className="text-sm font-bold text-[#FFF1F4]">100% Satisfaction Rate</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
