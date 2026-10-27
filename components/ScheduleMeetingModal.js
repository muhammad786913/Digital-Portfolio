'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/context/PortfolioContext';
import { personalInfo } from '@/lib/data';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X, 
  Video, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ScheduleMeetingModal() {
  const { meetingModalOpen, setMeetingModalOpen, playSound, showToast } = usePortfolio();

  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('04:00 PM (PKT)');
  const [topic, setTopic] = useState('Full Stack Web App (Next.js + MongoDB)');
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!meetingModalOpen) return null;

  const onClose = () => setMeetingModalOpen(false);

  const dates = ['Tomorrow', 'In 2 Days', 'This Weekend', 'Next Monday'];
  const times = ['02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '10:00 PM'];

  const handleBooking = async (e) => {
    e.preventDefault();
    playSound('click');
    setLoading(true);

    try {
      const payload = {
        name: clientName,
        email: clientEmail,
        phone: 'Scheduled Call',
        projectType: `15-Min Discovery Call: ${topic}`,
        budget: 'Discovery Meeting',
        timeline: `${selectedDate} at ${selectedTime}`,
        message: `Client requested a 15-min discovery call on ${selectedDate} at ${selectedTime} regarding ${topic}.`
      };

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setBooked(true);
      playSound('success');
      showToast('Meeting request dispatched to Muhammad!', 'success');

      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#A8325E', '#F0A6BC'] });
      } catch {}
    } catch {
      showToast('Error booking meeting', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#190B12]/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-[#F0A6BC]/30 bg-[#451A2D]/95 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { playSound('click'); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#190B12] hover:bg-[#A8325E] text-[#FFF1F4] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {booked ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#FFF1F4]">Discovery Call Requested!</h3>
            <p className="text-xs sm:text-sm text-[#FFF1F4]/80 max-w-md mx-auto leading-relaxed">
              Muhammad has received your booking request for <strong>{selectedDate} at {selectedTime}</strong>. A Google Meet / Zoom invite link will be sent to <strong>{clientEmail}</strong> shortly.
            </p>
            <div className="pt-2">
              <button
                onClick={() => { playSound('click'); onClose(); setBooked(false); }}
                className="btn-primary px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A8325E] to-[#190B12] flex items-center justify-center text-[#F0A6BC] border border-[#F0A6BC]/20">
                <Video size={20} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#FFF1F4]">Schedule a 15-Min Discovery Call</h3>
                <p className="text-xs text-[#F0A6BC]">Direct 1-on-1 sprint planning with Muhammad</p>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Select Date Chips */}
              <div>
                <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-2">1. Select Day</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => { playSound('click'); setSelectedDate(d); }}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-[#A8325E] border-[#F0A6BC] text-[#FFF1F4] shadow-md'
                          : 'bg-[#190B12] border-[#F0A6BC]/20 text-[#FFF1F4]/70 hover:border-[#F0A6BC]/40'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-2">2. Preferred Time (PKT / UTC+5)</label>
                <div className="flex flex-wrap gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { playSound('click'); setSelectedTime(t); }}
                      className={`py-1.5 px-3 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        selectedTime === t
                          ? 'bg-[#A8325E] border-[#F0A6BC] text-[#FFF1F4] shadow-md'
                          : 'bg-[#190B12] border-[#F0A6BC]/20 text-[#FFF1F4]/70 hover:border-[#F0A6BC]/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discussion Topic */}
              <div>
                <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1.5">3. Discussion Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] focus:outline-none focus:border-[#A8325E]"
                >
                  <option value="Full Stack Web App (Next.js + MongoDB)">Full Stack Web App (Next.js + MongoDB)</option>
                  <option value="Agency / Portfolio Website Clone (Digital Impact / Matias)">Agency / Portfolio Website Clone</option>
                  <option value="Express & MongoDB REST API Architecture">Express &amp; MongoDB REST API Architecture</option>
                  <option value="Freelance Contract / Developer Hiring">Freelance Contract / Developer Hiring</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Miller"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] focus:outline-none focus:border-[#A8325E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@studio.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] focus:outline-none focus:border-[#A8325E]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
              >
                <Calendar size={15} />
                <span>{loading ? 'Reserving Slot...' : `Confirm Call: ${selectedDate} at ${selectedTime}`}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
