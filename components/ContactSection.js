'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { personalInfo } from '@/lib/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Mail, 
  Phone, 
  Send, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function ContactSection() {
  const { playSound, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full Stack Web App (Next.js + MongoDB)',
    budget: '$1,500 - $3,000',
    timeline: '2-4 Weeks',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [directMailtoUrl, setDirectMailtoUrl] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound('click');
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setDirectMailtoUrl(data.directMailtoUrl);
        playSound('success');
        showToast('Inquiry sent! Saved to MongoDB database.', 'success');

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#A8325E', '#F0A6BC', '#FFF1F4', '#451A2D']
          });
        } catch {
          // confetti fallback
        }
      } else {
        showToast(data.error || 'Failed to submit form', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while submitting', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = () => {
    playSound('click');
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard', 'info');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#190B12]">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] ambient-orb-1 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Mail size={14} className="text-[#A8325E]" />
            <span>Direct Client Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Let&apos;s Build Your Next Web Project
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Looking to hire Muhammad bin Rashid for full-stack development, a website clone, or an Express/MongoDB system? Fill out the brief below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Information Card */}
            <div className="glass-panel p-8 rounded-3xl border border-[#F0A6BC]/25 shadow-xl bg-[#451A2D]/40">
              <h3 className="text-xl font-bold text-[#FFF1F4] mb-2">Direct Contact Channels</h3>
              <p className="text-xs text-[#FFF1F4]/70 mb-6">
                Muhammad monitors inquiries closely and responds within 24 hours.
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/15 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#A8325E]/30 text-[#F0A6BC] flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-[#F0A6BC] font-semibold uppercase tracking-wider">Email Address</div>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-xs sm:text-sm font-bold text-[#FFF1F4] hover:text-[#F0A6BC] transition-colors truncate block"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    title="Copy Email"
                    className="p-2 rounded-lg bg-[#451A2D] hover:bg-[#A8325E] text-[#FFF1F4] text-xs transition-colors shrink-0 ml-2 cursor-pointer"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Box */}
                <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A8325E]/30 text-[#F0A6BC] flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#F0A6BC] font-semibold uppercase tracking-wider">Direct Phone / Call</div>
                      <a 
                        href={`tel:${personalInfo.rawPhone}`}
                        className="text-xs sm:text-sm font-bold text-[#FFF1F4] hover:text-[#F0A6BC] transition-colors font-mono"
                      >
                        {personalInfo.phone} ({personalInfo.rawPhone})
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Button */}
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="w-full p-4 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-between text-emerald-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Chat on WhatsApp</div>
                      <div className="text-[11px] text-emerald-300/80">Instant Direct Discussion</div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Client Commitments */}
            <div className="glass-panel p-6 rounded-3xl border border-[#F0A6BC]/20 bg-[#451A2D]/30 space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#FFF1F4]/80">
                <Clock size={16} className="text-[#A8325E] shrink-0" />
                <span><strong>24-Hour Response:</strong> Quick turnaround on estimates and questions.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#FFF1F4]/80">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span><strong>Code Ownership:</strong> 100% intellectual property transfer upon delivery.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#FFF1F4]/80">
                <CheckCircle2 size={16} className="text-[#F0A6BC] shrink-0" />
                <span><strong>MongoDB Persistence:</strong> Real production database setups with backups.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Hire / Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-[#F0A6BC]/30 shadow-2xl bg-[#451A2D]/50 backdrop-blur-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#FFF1F4]">
                  Inquiry Dispatched to Muhammad!
                </h3>
                <p className="text-sm text-[#FFF1F4]/80 max-w-md mx-auto leading-relaxed">
                  Your project details have been successfully recorded in our MongoDB database. Muhammad bin Rashid will review your scope and get in touch with you shortly.
                </p>

                {/* Direct One-Click Email Trigger */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={directMailtoUrl}
                    className="w-full sm:w-auto btn-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    <span>Open in Your Email Client Directly</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Full Stack Web App',
                        budget: '$1,500 - $3,000',
                        timeline: '2-4 Weeks',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto btn-secondary px-5 py-3 rounded-xl font-semibold text-xs text-[#FFF1F4]"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12]/80 border border-[#F0A6BC]/20 text-[#FFF1F4] placeholder-[#FFF1F4]/30 focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12]/80 border border-[#F0A6BC]/20 text-[#FFF1F4] placeholder-[#FFF1F4]/30 focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 555 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12]/80 border border-[#F0A6BC]/20 text-[#FFF1F4] placeholder-[#FFF1F4]/30 focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Project Nature
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-[#FFF1F4] focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    >
                      <option value="Full Stack Web App (Next.js + MongoDB)">Full Stack App (Next.js + MongoDB)</option>
                      <option value="Digital Impact / Agency Website Clone">Agency / SaaS Clone (Digital Impact style)</option>
                      <option value="Matias Creative GSAP Portfolio Clone">Interactive Portfolio (GSAP Animation)</option>
                      <option value="Express & MongoDB REST API Service">Express &amp; MongoDB Backend Architecture</option>
                      <option value="Custom Web App or Freelance Contract">Custom Contract / Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-[#FFF1F4] focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    >
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000+">$5,000+ (Enterprise)</option>
                      <option value="Flexible / Hourly Discussion">Flexible / Hourly Discussion</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                      Target Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-[#FFF1F4] focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                    >
                      <option value="Urgent (1-2 Weeks)">Urgent (1-2 Weeks)</option>
                      <option value="Standard (2-4 Weeks)">Standard (2-4 Weeks)</option>
                      <option value="1-2 Months">1-2 Months</option>
                      <option value="Flexible Schedule">Flexible Schedule</option>
                    </select>
                  </div>
                </div>

                {/* Message / Project Scope */}
                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase tracking-wider mb-2">
                    Project Requirements &amp; Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your vision, required pages, database needs, animations, or reference sites..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#190B12]/80 border border-[#F0A6BC]/20 text-[#FFF1F4] placeholder-[#FFF1F4]/30 focus:border-[#A8325E] focus:outline-none text-sm transition-colors"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
                >
                  <Send size={18} className={submitting ? 'animate-pulse' : ''} />
                  <span>{submitting ? 'Saving to Database & Processing...' : 'Send Inquiry to Muhammad bin Rashid'}</span>
                </button>

                <p className="text-[11px] text-[#FFF1F4]/60 text-center">
                  Inquiries are directly delivered to Muhammad&apos;s verified inbox: <strong>{personalInfo.email}</strong>
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
