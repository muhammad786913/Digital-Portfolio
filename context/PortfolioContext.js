'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [activeProject, setActiveProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hireDrawerOpen, setHireDrawerOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [inquiryScope, setInquiryScope] = useState({
    service: 'Full Stack MVP Development',
    budget: '$1,500 - $3,000',
    timeline: '2-4 Weeks',
    features: ['MongoDB Database', 'GSAP Animations', 'Responsive Tailwind UI']
  });
  const [toast, setToast] = useState(null);

  // Web Audio API Synthesizer for high-tech micro interactions
  const playSound = useCallback((type = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled]);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playSound('success');
      showToast('Audio feedback enabled', 'info');
    } else {
      showToast('Audio feedback muted', 'info');
    }
  };

  const openHireModalWithService = (serviceTitle) => {
    playSound('click');
    setInquiryScope(prev => ({ ...prev, service: serviceTitle }));
    setHireDrawerOpen(true);
  };

  return (
    <PortfolioContext.Provider
      value={{
        activeProject,
        setActiveProject,
        filterCategory,
        setFilterCategory,
        soundEnabled,
        toggleSound,
        playSound,
        hireDrawerOpen,
        setHireDrawerOpen,
        meetingModalOpen,
        setMeetingModalOpen,
        inquiryScope,
        setInquiryScope,
        openHireModalWithService,
        toast,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}