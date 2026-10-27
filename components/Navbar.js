'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import { personalInfo } from '@/lib/data';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  Code2,
  Send,
  Calendar
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { soundEnabled, toggleSound, playSound, setHireDrawerOpen, setMeetingModalOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#190B12]/85 backdrop-blur-md py-3 shadow-lg border-b border-[#F0A6BC]/15' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={() => playSound('click')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8325E] to-[#451A2D] flex items-center justify-center border border-[#F0A6BC]/30 shadow-md group-hover:scale-105 transition-transform duration-300">
            <span className="font-bold text-lg text-[#FFF1F4] tracking-wider">MB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#FFF1F4] group-hover:text-[#F0A6BC] transition-colors">
              Muhammad bin Rashid
            </span>
            <span className="text-xs text-[#F0A6BC]/80 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#451A2D]/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#F0A6BC]/15 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => playSound('click')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#A8325E] text-[#FFF1F4] shadow-sm'
                    : 'text-[#FFF1F4]/75 hover:text-[#FFF1F4] hover:bg-[#5C223C]/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Hire CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute UI Sound Feedback" : "Enable UI Sound Feedback"}
            className="p-2.5 rounded-full bg-[#451A2D]/50 border border-[#F0A6BC]/20 text-[#F0A6BC] hover:text-[#FFF1F4] hover:bg-[#A8325E]/40 transition-colors focus:outline-none"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Book Call Button */}
          <button
            onClick={() => {
              playSound('click');
              setMeetingModalOpen(true);
            }}
            className="px-4 py-2 rounded-full text-xs font-bold text-[#FFF1F4] bg-[#451A2D]/60 hover:bg-[#5C223C] border border-[#F0A6BC]/20 hover:border-[#F0A6BC]/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Calendar size={14} className="text-[#F0A6BC]" />
            <span>Book Call</span>
          </button>

          {/* Hire Me Button */}
          <button
            onClick={() => {
              playSound('click');
              setHireDrawerOpen(true);
            }}
            className="btn-primary px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles size={16} className="text-[#F0A6BC] group-hover:rotate-12 transition-transform" />
            <span>Hire Me</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu & Sound Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2 rounded-lg bg-[#451A2D]/50 border border-[#F0A6BC]/20 text-[#F0A6BC]"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg bg-[#451A2D]/50 border border-[#F0A6BC]/20 text-[#FFF1F4]"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#190B12]/95 backdrop-blur-xl border-b border-[#F0A6BC]/20 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playSound('click');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#A8325E] text-[#FFF1F4]'
                      : 'text-[#FFF1F4]/80 hover:bg-[#451A2D]/50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight size={16} className="opacity-60" />
                </Link>
              );
            })}

            <div className="pt-4 border-t border-[#F0A6BC]/15 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                  setHireDrawerOpen(true);
                }}
                className="w-full btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles size={16} />
                <span>Instant Project Inquiry / Hire</span>
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                  setMeetingModalOpen(true);
                }}
                className="w-full btn-secondary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              >
                <Calendar size={16} className="text-[#F0A6BC]" />
                <span>Book 15-Min Discovery Call</span>
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full btn-secondary py-3 rounded-xl font-medium flex items-center justify-center gap-2 text-sm text-center"
              >
                <Send size={15} />
                <span>Email: {personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}