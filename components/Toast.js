'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function Toast() {
  const { toast } = usePortfolio();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={16} className="text-emerald-400" />,
    error: <AlertCircle size={16} className="text-rose-400" />,
    info: <Sparkles size={16} className="text-[#F0A6BC]" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="glass-panel px-4 py-3 rounded-2xl border border-[#F0A6BC]/30 shadow-2xl bg-[#451A2D]/95 backdrop-blur-xl flex items-center gap-3">
        {icons[toast.type] || icons.info}
        <span className="text-xs sm:text-sm font-semibold text-[#FFF1F4]">
          {toast.message}
        </span>
      </div>
    </div>
  );
}