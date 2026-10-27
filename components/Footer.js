'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { personalInfo } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  ArrowUp, 
  Heart, 
  Code2, 
  Database, 
  Mail, 
  Phone, 
  Sparkles,
  Clock
} from 'lucide-react';

export default function Footer() {
  const { playSound } = usePortfolio();
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Pakistan Standard Time (PKT, UTC+5)
      const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#190B12] border-t border-[#F0A6BC]/20 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F0A6BC]/15">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8325E] to-[#451A2D] flex items-center justify-center border border-[#F0A6BC]/30 shadow-md">
                <span className="font-bold text-lg text-[#FFF1F4]">MB</span>
              </div>
              <span className="font-extrabold text-xl text-[#FFF1F4] tracking-tight">
                Muhammad bin Rashid
              </span>
            </div>

            <p className="text-sm text-[#FFF1F4]/75 max-w-sm leading-relaxed">
              Full Stack Web Developer with 1 year of proven experience building client applications, agency clones, and database-backed platforms with Next.js, Express &amp; MongoDB.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F0A6BC] font-mono">
              <Clock size={14} className="text-[#A8325E]" />
              <span>Pakistan Time (PKT): {localTime || 'Loading...'}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Explore Portfolio</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-[#FFF1F4]/80 hover:text-[#F0A6BC] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#FFF1F4]/80 hover:text-[#F0A6BC] transition-colors">
                  All 15+ Projects &amp; Clones
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#FFF1F4]/80 hover:text-[#F0A6BC] transition-colors">
                  About Muhammad bin Rashid
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#FFF1F4]/80 hover:text-[#F0A6BC] transition-colors">
                  Freelance Services &amp; Rates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#FFF1F4]/80 hover:text-[#F0A6BC] transition-colors">
                  Hire / Contact Channel
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Communication Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#F0A6BC] uppercase tracking-wider mb-2">Get in Touch</h4>
            <div className="space-y-2.5 text-xs text-[#FFF1F4]/80">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#A8325E]" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-[#F0A6BC] transition-colors font-mono">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#A8325E]" />
                <a href={`tel:${personalInfo.rawPhone}`} className="hover:text-[#F0A6BC] transition-colors font-mono">
                  {personalInfo.phone} ({personalInfo.rawPhone})
                </a>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#F0A6BC]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Client Proposals &amp; Contracts</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF1F4]/60">
          <div>
            &copy; 2026 Muhammad bin Rashid. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Engineered with Next.js, Express, MongoDB, Tailwind &amp; GSAP</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Back to Top"
            className="p-2.5 rounded-xl bg-[#451A2D] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[#FFF1F4] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUp size={14} />
            <span>Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
