'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Database, 
  Server, 
  Terminal, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  RefreshCw,
  Code2,
  Cpu
} from 'lucide-react';

export default function MongoArchitecture() {
  const { playSound, showToast } = usePortfolio();
  const [activeCodeTab, setActiveCodeTab] = useState('schema');
  const [liveApiResponse, setLiveApiResponse] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiLatency, setApiLatency] = useState(18);

  const testLiveApiCall = async () => {
    playSound('click');
    setLoadingApi(true);
    const startTime = performance.now();
    try {
      const res = await fetch('/api/projects?category=fullstack');
      const data = await res.json();
      const endTime = performance.now();
      setApiLatency(Math.round(endTime - startTime));
      setLiveApiResponse(data);
      playSound('success');
      showToast('Live API Query Executed Successfully', 'success');
    } catch (err) {
      console.error(err);
      showToast('API call failed', 'error');
    } finally {
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    testLiveApiCall();
  }, []);

  const codeSnippets = {
    schema: `// models/Applicant.js — MongoDB Mongoose Schema
import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true },
  program: { type: String, enum: ['CS', 'SE', 'DS', 'AI'], required: true },
  documents: [{
    docType: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Document Review', 'Interview', 'Enrolled'],
    default: 'Submitted',
    index: true
  },
  voucherToken: { type: String, index: true }
}, {
  timestamps: true
});

// Compound indexing for rapid client dashboard querying
ApplicantSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);`,

    controller: `// controllers/applicantController.js — Express.js REST Handler
import Applicant from '../models/Applicant.js';
import { sendNotificationEmail } from '../utils/mailer.js';

export const handleAdmissionSubmission = async (req, res, next) => {
  try {
    const { fullName, email, phone, program } = req.body;
    
    // Check if applicant already submitted
    const existing = await Applicant.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Applicant already exists.' });
    }

    const newApplicant = await Applicant.create({
      fullName,
      email,
      phone,
      program,
      voucherToken: 'VCH-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });

    // Asynchronous email notification dispatch
    await sendNotificationEmail(email, newApplicant.voucherToken);

    res.status(201).json({
      success: true,
      data: newApplicant,
      message: 'Admission form successfully submitted and registered in MongoDB.'
    });
  } catch (error) {
    next(error); // Forwarded to centralized Express error middleware
  }
};`,

    aggregation: `// services/analyticsService.js — MongoDB Aggregation Pipeline
import Applicant from '../models/Applicant.js';

export const getAdmissionMetrics = async () => {
  return await Applicant.aggregate([
    {
      $facet: {
        byProgram: [
          { $group: { _id: "$program", totalApplicants: { $sum: 1 } } },
          { $sort: { totalApplicants: -1 } }
        ],
        byStatus: [
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ],
        recentEnrollments: [
          { $match: { status: "Enrolled" } },
          { $sort: { updatedAt: -1 } },
          { $limit: 10 }
        ]
      }
    }
  ]);
};`
  };

  const copyCode = () => {
    playSound('click');
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    showToast('Code snippet copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#26111C]/30 border-y border-[#F0A6BC]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Database size={14} className="text-emerald-400" />
            <span>Backend Architecture &amp; Database Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            How Muhammad Builds with Express &amp; MongoDB
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Real enterprise architecture code: structured schemas, indexing, RESTful controllers, and live API endpoints powering our web apps.
          </p>
        </div>

        {/* Interactive Code & Live API Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Code Architecture Tabs */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-[#F0A6BC]/20 overflow-hidden shadow-2xl bg-[#190B12]/90">
            {/* Window Header */}
            <div className="px-4 py-3 bg-[#451A2D]/70 border-b border-[#F0A6BC]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-xs text-[#FFF1F4]/70 font-mono ml-2">
                  backend-architecture / {activeCodeTab}.js
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="px-2.5 py-1 rounded-lg bg-[#190B12]/80 hover:bg-[#A8325E] text-xs text-[#FFF1F4] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-[#F0A6BC]/15 bg-[#190B12]">
              <button
                onClick={() => { playSound('click'); setActiveCodeTab('schema'); }}
                className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-r border-[#F0A6BC]/10 transition-colors cursor-pointer ${
                  activeCodeTab === 'schema'
                    ? 'bg-[#451A2D] text-[#FFF1F4] border-b-2 border-b-[#A8325E]'
                    : 'text-[#FFF1F4]/60 hover:text-[#FFF1F4] hover:bg-[#451A2D]/30'
                }`}
              >
                <Database size={13} className="text-emerald-400" />
                <span>1. Mongoose Schema</span>
              </button>

              <button
                onClick={() => { playSound('click'); setActiveCodeTab('controller'); }}
                className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-r border-[#F0A6BC]/10 transition-colors cursor-pointer ${
                  activeCodeTab === 'controller'
                    ? 'bg-[#451A2D] text-[#FFF1F4] border-b-2 border-b-[#A8325E]'
                    : 'text-[#FFF1F4]/60 hover:text-[#FFF1F4] hover:bg-[#451A2D]/30'
                }`}
              >
                <Server size={13} className="text-[#A8325E]" />
                <span>2. Express REST API</span>
              </button>

              <button
                onClick={() => { playSound('click'); setActiveCodeTab('aggregation'); }}
                className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeCodeTab === 'aggregation'
                    ? 'bg-[#451A2D] text-[#FFF1F4] border-b-2 border-b-[#A8325E]'
                    : 'text-[#FFF1F4]/60 hover:text-[#FFF1F4] hover:bg-[#451A2D]/30'
                }`}
              >
                <Cpu size={13} className="text-[#F0A6BC]" />
                <span>3. MongoDB Aggregation</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 overflow-x-auto max-h-[460px] text-xs sm:text-sm font-mono leading-relaxed text-[#FFF1F4]">
              <pre className="text-[#E8C1CD]">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
            </div>
          </div>

          {/* Right: Live Interactive API Tester */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live API Action Box */}
            <div className="glass-panel p-6 rounded-2xl border border-[#F0A6BC]/20 bg-[#451A2D]/40 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Live Serverless API Route
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-[#F0A6BC] px-2.5 py-0.5 rounded-full bg-[#190B12] border border-[#F0A6BC]/20">
                  Latency: {apiLatency}ms
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#FFF1F4] mb-2">
                Querying Live Portfolio Database
              </h3>
              <p className="text-xs text-[#FFF1F4]/75 mb-5 leading-relaxed">
                Click below to send a live HTTP GET request to our Next.js API endpoint <code className="text-[#F0A6BC] bg-[#190B12] px-1.5 py-0.5 rounded font-mono">/api/projects</code> and inspect the returned JSON response.
              </p>

              <button
                onClick={testLiveApiCall}
                disabled={loadingApi}
                className="w-full btn-primary py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer mb-5 shadow-lg"
              >
                <RefreshCw size={15} className={loadingApi ? 'animate-spin' : ''} />
                <span>{loadingApi ? 'Querying API...' : 'Run Live API Call: GET /api/projects'}</span>
              </button>

              {/* Response Inspector */}
              <div className="rounded-xl bg-[#190B12] border border-[#F0A6BC]/15 p-4 overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-[#F0A6BC] pb-2 mb-2 border-b border-[#F0A6BC]/10">
                  <span>HTTP 200 OK • JSON</span>
                  <span>{liveApiResponse?.data?.length || 0} Records Returned</span>
                </div>
                <div className="max-h-[220px] overflow-y-auto text-xs font-mono text-[#FFF1F4]/90 space-y-1">
                  {liveApiResponse ? (
                    <pre className="text-[11px] text-emerald-300">
                      {JSON.stringify(
                        {
                          status: "success",
                          engine: liveApiResponse.databaseStatus,
                          sampleProject: liveApiResponse.data?.[0]?.title,
                          category: liveApiResponse.data?.[0]?.categoryLabel,
                          stack: liveApiResponse.data?.[0]?.stack,
                          serverTime: liveApiResponse.timestamp
                        },
                        null,
                        2
                      )}
                    </pre>
                  ) : (
                    <div className="text-xs text-[#FFF1F4]/50 py-4 text-center font-mono">
                      Click the button above to execute query.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Backend Guarantee Card */}
            <div className="glass-panel p-5 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#FFF1F4] mb-1">
                  Production-Ready Reliability
                </h4>
                <p className="text-xs text-[#FFF1F4]/70 leading-relaxed">
                  Muhammad designs backend systems with sanitized inputs, connection pooling, indexing, and unified error middleware so client apps scale without downtime.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
