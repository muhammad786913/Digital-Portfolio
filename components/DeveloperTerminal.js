'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { personalInfo, projects, stats } from '@/lib/data';
import { 
  Terminal, 
  Play, 
  Trash2, 
  Sparkles, 
  Code2, 
  Check, 
  HelpCircle,
  Copy
} from 'lucide-react';

export default function DeveloperTerminal() {
  const { playSound, showToast } = usePortfolio();
  const [history, setHistory] = useState([
    {
      command: 'welcome',
      output: [
        '🚀 Muhammad bin Rashid [Full Stack Web Developer Shell v2.4]',
        'Type a command or click any shortcut button below to interact.'
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBottomRef = useRef(null);

  const commandList = [
    { cmd: 'whoami', label: 'whoami', desc: 'About Muhammad' },
    { cmd: 'projects', label: 'projects --all', desc: 'List projects' },
    { cmd: 'skills', label: 'skills --list', desc: 'View tech stack' },
    { cmd: 'stats', label: 'system --stats', desc: 'Realtime metrics' },
    { cmd: 'contact', label: 'contact --info', desc: 'Direct contact info' },
    { cmd: 'clear', label: 'clear', desc: 'Clear screen' }
  ];

  const executeCommand = (cmdStr) => {
    playSound('click');
    const cleaned = cmdStr.trim().toLowerCase();

    if (cleaned === 'clear') {
      setHistory([]);
      return;
    }

    let output = [];

    switch (cleaned) {
      case 'whoami':
        output = [
          `Name: ${personalInfo.name}`,
          `Role: ${personalInfo.role}`,
          `Experience: 1+ Year hands-on client engineering`,
          `Location: ${personalInfo.location}`,
          `Status: ${personalInfo.status}`,
          `Headline: ${personalInfo.headline}`
        ];
        break;

      case 'projects':
      case 'projects --all':
        output = [
          '=== FEATURED PRODUCTION PROJECTS & CLONES ===',
          ...projects.map(p => `• [${p.categoryLabel}] ${p.title} (${p.stack.slice(0, 3).join(', ')})`),
          'Run "projects [name]" for individual architecture.'
        ];
        break;

      case 'skills':
      case 'skills --list':
        output = [
          '=== TECHNICAL CORE CAPABILITIES ===',
          'Frontend: JavaScript (ES6+), React.js, Next.js 14/15, Tailwind CSS, HTML5',
          'Backend: Node.js, Express.js REST APIs, Middleware Architecture',
          'Database: MongoDB Atlas, Mongoose ODM, Schema Indexing, Aggregations',
          'Animations: GSAP ScrollTrigger, 3D Tilt HOCs, Web Audio API Micro-Sounds',
          'State & Optimization: Context API, Redux Toolkit, Lazy Loading, SEO Best Practices'
        ];
        break;

      case 'stats':
      case 'system --stats':
        output = [
          '=== REALTIME DEVELOPER METRICS ===',
          `• Hands-on Experience: ${stats[0].value} ${stats[0].suffix}`,
          `• Web Applications Built: ${stats[1].value} ${stats[1].suffix}`,
          `• Client Satisfaction: ${stats[2].value}${stats[2].suffix}`,
          `• Database Schema Uptime: ${stats[3].value}${stats[3].suffix}`,
          `• System Kernel: Next.js 16.4.3 / Node.js Engine / Tailwind CSS v4`
        ];
        break;

      case 'contact':
      case 'contact --info':
        output = [
          '=== DIRECT CLIENT CONTACT CHANNELS ===',
          `✉ Email: ${personalInfo.email}`,
          `📞 Phone: ${personalInfo.phone} (${personalInfo.rawPhone})`,
          `💬 WhatsApp: https://wa.me/${personalInfo.rawPhone}`,
          'Available immediately for full-stack contracts & freelance MVPs.'
        ];
        break;

      case 'help':
        output = [
          'Available commands:',
          '• whoami          - View developer bio & title',
          '• projects        - Inspect all 15+ projects',
          '• skills          - View tech stack matrix',
          '• stats           - Check live metrics & uptime',
          '• contact         - Get direct phone & email',
          '• clear           - Clear console output'
        ];
        break;

      default:
        output = [
          `Command not recognized: "${cleaned}". Type "help" or click the quick action chips below.`
        ];
    }

    setHistory(prev => [...prev, { command: cmdStr, output }]);
    setInputVal('');
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#190B12] border-t border-[#F0A6BC]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-3">
            <Terminal size={14} className="text-[#A8325E]" />
            <span>Interactive CLI Shell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF1F4] tracking-tight">
            Developer Console &amp; Terminal
          </h2>
          <p className="text-xs sm:text-sm text-[#FFF1F4]/75 mt-2">
            Click any button below to instantly trigger live commands in Muhammad&apos;s dev environment.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-3xl border border-[#F0A6BC]/30 bg-[#190B12] shadow-2xl overflow-hidden glass-panel">
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-[#451A2D]/80 border-b border-[#F0A6BC]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-mono text-[#F0A6BC] font-semibold ml-2">
                muhammad@mbr-portfolio: ~ (bash)
              </span>
            </div>

            <button
              onClick={() => { playSound('click'); setHistory([]); }}
              className="text-xs text-[#FFF1F4]/60 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick Action Button Chips */}
          <div className="px-5 py-3 bg-[#26111C]/60 border-b border-[#F0A6BC]/15 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-[#F0A6BC] font-bold mr-1">RUN:</span>
            {commandList.map((item) => (
              <button
                key={item.cmd}
                onClick={() => executeCommand(item.cmd)}
                className="px-3 py-1 rounded-lg bg-[#451A2D] hover:bg-[#A8325E] border border-[#F0A6BC]/20 text-[11px] font-mono text-[#FFF1F4] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Play size={10} className="text-[#F0A6BC]" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="p-6 font-mono text-xs sm:text-sm text-[#FFF1F4] max-h-80 overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#F0A6BC]">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="pl-4 space-y-1 text-[#FFF1F4]/85 leading-relaxed">
                  {item.output.map((line, lIdx) => (
                    <div key={lIdx} className="whitespace-pre-wrap">{line}</div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSubmit} className="px-5 py-3.5 bg-[#26111C] border-t border-[#F0A6BC]/15 flex items-center gap-3">
            <span className="text-emerald-400 font-mono font-bold text-sm">$</span>
            <input
              type="text"
              placeholder="Type command ('whoami', 'skills', 'projects', 'help')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-mono text-[#FFF1F4] placeholder-[#FFF1F4]/40 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 cursor-pointer"
            >
              Enter ↵
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
