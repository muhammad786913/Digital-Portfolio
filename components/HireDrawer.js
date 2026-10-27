'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';
import { personalInfo } from '@/lib/data';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function HireDrawer() {
  const { hireDrawerOpen, setHireDrawerOpen, inquiryScope, playSound, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [directMailto, setDirectMailto] = useState('');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && hireDrawerOpen) {
        setHireDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [hireDrawerOpen, setHireDrawerOpen]);

  if (!hireDrawerOpen) return null;

  const handleClose = () => {
    playSound('click');
    setHireDrawerOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound('click');
    setSubmitting(true);

    const payload = {
      ...formData,
      projectType: inquiryScope.service,
      budget: inquiryScope.budget,
      timeline: inquiryScope.timeline,
      message: `${formData.message}\n\n[Inclusions: ${inquiryScope.features?.join(', ')}]`
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setDirectMailto(data.directMailtoUrl);
        playSound('success');
        showToast('Inquiry recorded in MongoDB Atlas.', 'success');
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#A8325E', '#F0A6BC', '#FFF1F4']
          });
        } catch {}
      } else {
        showToast(data.error || 'Submission error', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#190B12]/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl h-full bg-[#190B12] border-l border-[#F0A6BC]/25 shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#451A2D]/80 border-b border-[#F0A6BC]/20 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8325E] to-[#451A2D] flex items-center justify-center text-[#FFF1F4] border border-[#F0A6BC]/30 shadow-md">
              <Sparkles size={20} className="text-[#F0A6BC]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#FFF1F4]">Hire Muhammad bin Rashid</h2>
              <p className="text-xs text-[#F0A6BC]">Direct Client Collaboration Brief</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-[#190B12]/80 hover:bg-[#A8325E] text-[#FFF1F4] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-grow">
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-[#FFF1F4]">Inquiry Received!</h3>
              <p className="text-xs text-[#FFF1F4]/75 max-w-sm mx-auto leading-relaxed">
                Thank you! Your project request has been logged in MongoDB. Muhammad will reach out to your email shortly.
              </p>
              <div className="pt-2">
                <a
                  href={directMailto}
                  className="btn-primary w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mb-3"
                >
                  <Mail size={15} />
                  <span>Open in Mail Client Directly</span>
                </a>
                <button
                  onClick={handleClose}
                  className="btn-secondary w-full py-2.5 rounded-xl font-semibold text-xs"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Scope Box */}
              <div className="p-4 rounded-2xl bg-[#451A2D]/50 border border-[#A8325E]/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#F0A6BC] font-semibold uppercase tracking-wider">Target Scope:</span>
                  <span className="font-mono font-bold text-[#FFF1F4]">{inquiryScope.budget}</span>
                </div>
                <div className="text-sm font-bold text-[#FFF1F4]">
                  {inquiryScope.service}
                </div>
                {inquiryScope.features && inquiryScope.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {inquiryScope.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-[#190B12] text-[#F0A6BC] border border-[#F0A6BC]/15">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#26111C] border border-[#F0A6BC]/20 text-[#FFF1F4] text-xs focus:border-[#A8325E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#26111C] border border-[#F0A6BC]/20 text-[#FFF1F4] text-xs focus:border-[#A8325E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 12345678901"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#26111C] border border-[#F0A6BC]/20 text-[#FFF1F4] text-xs focus:border-[#A8325E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1.5">
                    Project Vision / Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly state your requirements, deadlines, or tech stack preference..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#26111C] border border-[#F0A6BC]/20 text-[#FFF1F4] text-xs focus:border-[#A8325E] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send size={15} />
                  <span>{submitting ? 'Submitting to Database...' : 'Submit Inquiry to Muhammad'}</span>
                </button>
              </form>
            </>
          )}

          {/* Quick Contact Footer */}
          <div className="pt-4 border-t border-[#F0A6BC]/15 space-y-2">
            <div className="text-[11px] text-[#FFF1F4]/70">Direct alternative contact:</div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="block text-xs text-[#F0A6BC] hover:underline font-mono"
            >
              ✉ {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.rawPhone}`}
              className="block text-xs text-[#F0A6BC] hover:underline font-mono"
            >
              📞 {personalInfo.phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
