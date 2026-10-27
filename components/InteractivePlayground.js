'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  CheckSquare, 
  GraduationCap, 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Check, 
  Download, 
  RefreshCw,
  QrCode,
  DollarSign,
  TrendingUp,
  Database
} from 'lucide-react';

export default function InteractivePlayground() {
  const { playSound, showToast } = usePortfolio();
  const [activeTab, setActiveTab] = useState('kanban');

  // --- 1. KANBAN MINI-APP STATE ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Build Client MVP in Next.js', status: 'done', priority: 'High', date: '24 Oct' },
    { id: 2, title: 'Setup MongoDB Atlas Clusters & Indexes', status: 'in-progress', priority: 'High', date: '25 Oct' },
    { id: 3, title: 'Implement GSAP 3D Scroll Choreography', status: 'todo', priority: 'Medium', date: '26 Oct' },
    { id: 4, title: 'Client Feedback Sprint & Launch', status: 'todo', priority: 'Urgent', date: '28 Oct' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    playSound('click');
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      status: 'todo',
      priority: newTaskPriority,
      date: 'Today'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    showToast('Task added to MongoDB state!', 'success');
  };

  const moveTask = (id, newStatus) => {
    playSound('click');
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    if (newStatus === 'done') {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ['#A8325E', '#F0A6BC'] });
      } catch {}
      playSound('success');
      showToast('Task completed!', 'success');
    }
  };

  const deleteTask = (id) => {
    playSound('click');
    setTasks(tasks.filter(t => t.id !== id));
    showToast('Task deleted', 'info');
  };

  // --- 2. CALCULATOR MINI-APP STATE ---
  const [calcInput, setCalcInput] = useState('12500 * 1.15');
  const [calcResult, setCalcResult] = useState('14375');
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(5);

  const calculateGrowth = () => {
    playSound('click');
    // Compound interest formula: A = P(1 + r/n)^(nt)
    const amount = principal * Math.pow(1 + (annualRate / 100), years);
    return Math.round(amount).toLocaleString();
  };

  const handleCalcClick = (val) => {
    playSound('click');
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('0');
    } else if (val === '=') {
      try {
        // Safe evaluation of simple arithmetic
        const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcResult(String(res));
        playSound('success');
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  // --- 3. ADMISSION PORTAL MINI-APP STATE ---
  const [studentName, setStudentName] = useState('Sarah J. Chen');
  const [program, setProgram] = useState('Computer Science (Full Stack)');
  const [generatedVoucher, setGeneratedVoucher] = useState(null);

  const generateVoucher = (e) => {
    e.preventDefault();
    if (!studentName) return;
    playSound('success');
    const voucher = {
      voucherId: `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
      name: studentName,
      program: program,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: '$1,200 (Semester 1)',
      status: 'VERIFIED & REGISTERED IN MONGODB'
    };
    setGeneratedVoucher(voucher);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#A8325E', '#F0A6BC', '#FFF1F4'] });
    } catch {}
    showToast('Admission Voucher generated & saved to database!', 'success');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#190B12] border-t border-[#F0A6BC]/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] ambient-orb-1 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#F0A6BC]/20 text-xs font-semibold text-[#F0A6BC] mb-4">
            <Sparkles size={14} className="text-[#A8325E]" />
            <span>Interactive Live Demos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF1F4] tracking-tight mb-4">
            Hands-On Interactive App Sandbox
          </h2>
          <p className="text-base sm:text-lg text-[#FFF1F4]/75">
            Test Muhammad&apos;s real application logic right here in your browser. Click buttons to add tasks, compute compound growth, and generate admission vouchers!
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => { playSound('click'); setActiveTab('kanban'); }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'kanban'
                ? 'bg-gradient-to-r from-[#A8325E] to-[#5C223C] text-[#FFF1F4] border border-[#F0A6BC]/40 shadow-lg shadow-[#A8325E]/30 scale-105'
                : 'glass-panel text-[#FFF1F4]/70 hover:text-[#FFF1F4]'
            }`}
          >
            <CheckSquare size={16} className={activeTab === 'kanban' ? 'text-[#F0A6BC]' : ''} />
            <span>1. TaskFlow Kanban Suite</span>
          </button>

          <button
            onClick={() => { playSound('click'); setActiveTab('calc'); }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'calc'
                ? 'bg-gradient-to-r from-[#A8325E] to-[#5C223C] text-[#FFF1F4] border border-[#F0A6BC]/40 shadow-lg shadow-[#A8325E]/30 scale-105'
                : 'glass-panel text-[#FFF1F4]/70 hover:text-[#FFF1F4]'
            }`}
          >
            <Calculator size={16} className={activeTab === 'calc' ? 'text-[#F0A6BC]' : ''} />
            <span>2. OmniCalc Growth Engine</span>
          </button>

          <button
            onClick={() => { playSound('click'); setActiveTab('voucher'); }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'voucher'
                ? 'bg-gradient-to-r from-[#A8325E] to-[#5C223C] text-[#FFF1F4] border border-[#F0A6BC]/40 shadow-lg shadow-[#A8325E]/30 scale-105'
                : 'glass-panel text-[#FFF1F4]/70 hover:text-[#FFF1F4]'
            }`}
          >
            <GraduationCap size={16} className={activeTab === 'voucher' ? 'text-[#F0A6BC]' : ''} />
            <span>3. UniEnroll Admission Generator</span>
          </button>
        </div>

        {/* --- TAB 1: KANBAN APP --- */}
        {activeTab === 'kanban' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#F0A6BC]/25 bg-[#451A2D]/40 shadow-2xl">
            {/* Top Kanban Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#F0A6BC]/15 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-emerald-300">MONGODB LIVE SYNC ACTIVE</span>
                </div>
                <h3 className="text-xl font-bold text-[#FFF1F4] mt-1">Interactive Task Management Board</h3>
              </div>

              {/* Add Task Input Form */}
              <form onSubmit={addTask} className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Enter new task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] placeholder-[#FFF1F4]/40 focus:border-[#A8325E] focus:outline-none flex-grow sm:w-56"
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#F0A6BC] focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus size={14} />
                  <span>Add Task</span>
                </button>
              </form>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column: To Do */}
              <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/15 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#FFF1F4] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    To Do
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#451A2D] text-[11px] font-mono font-bold text-[#F0A6BC]">
                    {tasks.filter(t => t.status === 'todo').length}
                  </span>
                </div>

                <div className="space-y-3 flex-grow">
                  {tasks.filter(t => t.status === 'todo').map(task => (
                    <div key={task.id} className="p-3.5 rounded-xl bg-[#451A2D]/60 border border-[#F0A6BC]/15 space-y-2 group hover:border-[#A8325E] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#FFF1F4]">{task.title}</span>
                        <button onClick={() => deleteTask(task.id)} className="text-[#FFF1F4]/40 hover:text-rose-400">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="px-2 py-0.5 rounded bg-[#190B12] text-[#F0A6BC] font-mono text-[10px]">
                          {task.priority}
                        </span>
                        <button
                          onClick={() => moveTask(task.id, 'in-progress')}
                          className="px-2.5 py-1 rounded-lg bg-[#A8325E] text-[#FFF1F4] font-bold text-[10px] flex items-center gap-1 hover:bg-[#C23E70] cursor-pointer"
                        >
                          <span>Start</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: In Progress */}
              <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/15 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#FFF1F4] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    In Progress
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#451A2D] text-[11px] font-mono font-bold text-[#F0A6BC]">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </span>
                </div>

                <div className="space-y-3 flex-grow">
                  {tasks.filter(t => t.status === 'in-progress').map(task => (
                    <div key={task.id} className="p-3.5 rounded-xl bg-[#451A2D]/60 border border-amber-500/30 space-y-2 group hover:border-amber-400 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#FFF1F4]">{task.title}</span>
                        <button onClick={() => deleteTask(task.id)} className="text-[#FFF1F4]/40 hover:text-rose-400">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="px-2 py-0.5 rounded bg-[#190B12] text-amber-300 font-mono text-[10px]">
                          {task.priority}
                        </span>
                        <button
                          onClick={() => moveTask(task.id, 'done')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-[#FFF1F4] font-bold text-[10px] flex items-center gap-1 hover:bg-emerald-500 cursor-pointer shadow-md"
                        >
                          <Check size={11} />
                          <span>Complete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: Done */}
              <div className="p-4 rounded-2xl bg-[#190B12]/80 border border-[#F0A6BC]/15 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#FFF1F4] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Done &amp; Deployed
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#451A2D] text-[11px] font-mono font-bold text-emerald-400">
                    {tasks.filter(t => t.status === 'done').length}
                  </span>
                </div>

                <div className="space-y-3 flex-grow">
                  {tasks.filter(t => t.status === 'done').map(task => (
                    <div key={task.id} className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2 group">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#FFF1F4] line-through opacity-70">{task.title}</span>
                        <button onClick={() => deleteTask(task.id)} className="text-[#FFF1F4]/40 hover:text-rose-400">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono text-[10px] flex items-center gap-1">
                          <Check size={10} /> Completed
                        </span>
                        <button
                          onClick={() => moveTask(task.id, 'todo')}
                          className="text-[10px] text-[#F0A6BC] hover:underline"
                        >
                          Reopen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- TAB 2: CALCULATOR ENGINE --- */}
        {activeTab === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Keypad Calculator */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-[#F0A6BC]/25 bg-[#451A2D]/50 shadow-2xl">
              <div className="flex items-center justify-between mb-4 text-xs">
                <span className="font-mono text-[#F0A6BC]">OmniCalc Mathematical Core</span>
                <span className="px-2 py-0.5 rounded bg-[#190B12] text-emerald-400 font-mono">JS Engine</span>
              </div>

              {/* Display */}
              <div className="p-4 rounded-2xl bg-[#190B12] border border-[#F0A6BC]/20 mb-5 text-right font-mono">
                <div className="text-xs text-[#FFF1F4]/50 h-5 overflow-x-auto">{calcInput || '0'}</div>
                <div className="text-3xl font-extrabold text-[#FFF1F4]">{calcResult}</div>
              </div>

              {/* Keypad Grid */}
              <div className="grid grid-cols-4 gap-2.5">
                {['C', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '%', '='].map(btn => {
                  const isAction = ['C', '/', '*', '-', '+', '='].includes(btn);
                  const isEquals = btn === '=';
                  return (
                    <button
                      key={btn}
                      onClick={() => handleCalcClick(btn)}
                      className={`h-12 rounded-xl font-mono text-base font-bold transition-all cursor-pointer ${
                        isEquals
                          ? 'bg-[#A8325E] hover:bg-[#C23E70] text-[#FFF1F4] shadow-lg shadow-[#A8325E]/40'
                          : isAction
                          ? 'bg-[#5C223C] hover:bg-[#A8325E] text-[#F0A6BC]'
                          : 'bg-[#190B12] hover:bg-[#451A2D] text-[#FFF1F4] border border-[#F0A6BC]/10'
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compound Growth Forecasting Engine */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[#F0A6BC]/25 bg-[#451A2D]/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0A6BC]/15">
                <div>
                  <h3 className="text-lg font-bold text-[#FFF1F4]">Financial Compound Growth Forecast</h3>
                  <p className="text-xs text-[#FFF1F4]/70">Calculates future asset valuation with annualized compound return</p>
                </div>
                <TrendingUp size={24} className="text-[#A8325E]" />
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#FFF1F4] mb-1.5">
                    <span>Initial Investment ($)</span>
                    <span className="font-mono text-[#F0A6BC]">${principal.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={principal}
                    onChange={(e) => { playSound('click'); setPrincipal(Number(e.target.value)); }}
                    className="w-full accent-[#A8325E] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#FFF1F4] mb-1.5">
                    <span>Annual Interest Rate (%)</span>
                    <span className="font-mono text-[#F0A6BC]">{annualRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={annualRate}
                    onChange={(e) => { playSound('click'); setAnnualRate(Number(e.target.value)); }}
                    className="w-full accent-[#A8325E] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#FFF1F4] mb-1.5">
                    <span>Investment Horizon (Years)</span>
                    <span className="font-mono text-[#F0A6BC]">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => { playSound('click'); setYears(Number(e.target.value)); }}
                    className="w-full accent-[#A8325E] cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Growth Card */}
              <div className="p-5 rounded-2xl bg-[#190B12] border border-[#F0A6BC]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#F0A6BC] uppercase font-bold tracking-wider">Projected Portfolio Value:</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#FFF1F4] font-mono mt-1">
                    ${calculateGrowth()}
                  </div>
                  <span className="text-[11px] text-emerald-400">
                    +${(Number(calculateGrowth().replace(/,/g, '')) - principal).toLocaleString()} Total Earned Growth
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#A8325E]/30 text-[#F0A6BC] flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- TAB 3: ADMISSION GENERATOR --- */}
        {activeTab === 'voucher' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-[#F0A6BC]/25 bg-[#451A2D]/40 shadow-2xl">
              <h3 className="text-lg font-bold text-[#FFF1F4] mb-2">Student Admission Form Simulator</h3>
              <p className="text-xs text-[#FFF1F4]/75 mb-6">
                Fill the applicant fields to generate a verified admission payment voucher with MongoDB tracking token.
              </p>

              <form onSubmit={generateVoucher} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1">
                    Applicant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] focus:border-[#A8325E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#FFF1F4] uppercase mb-1">
                    Academic Program
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#190B12] border border-[#F0A6BC]/20 text-xs text-[#FFF1F4] focus:border-[#A8325E] focus:outline-none"
                  >
                    <option value="Computer Science (Full Stack)">Computer Science (Full Stack)</option>
                    <option value="Software Engineering & DevOps">Software Engineering &amp; DevOps</option>
                    <option value="Artificial Intelligence & Data">Artificial Intelligence &amp; Data</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <GraduationCap size={16} />
                  <span>Generate Admission Voucher</span>
                </button>
              </form>
            </div>

            {/* Voucher Preview Card */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[#F0A6BC]/30 bg-[#190B12] shadow-2xl">
              {generatedVoucher ? (
                <div className="border-2 border-dashed border-[#F0A6BC]/30 rounded-2xl p-6 bg-[#451A2D]/30 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F0A6BC]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#A8325E] flex items-center justify-center text-[#FFF1F4] font-bold">
                        UE
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-[#FFF1F4]">UniEnroll University Portal</div>
                        <div className="text-[11px] text-[#F0A6BC]">Official Admission Voucher</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#FFF1F4]/60 block">Voucher Token</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{generatedVoucher.voucherId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#F0A6BC] block text-[10px] uppercase font-bold">Student Name</span>
                      <span className="text-sm font-bold text-[#FFF1F4]">{generatedVoucher.name}</span>
                    </div>

                    <div>
                      <span className="text-[#F0A6BC] block text-[10px] uppercase font-bold">Program Enrolled</span>
                      <span className="font-semibold text-[#FFF1F4]">{generatedVoucher.program}</span>
                    </div>

                    <div>
                      <span className="text-[#F0A6BC] block text-[10px] uppercase font-bold">Issue Date</span>
                      <span className="text-[#FFF1F4]/90 font-mono">{generatedVoucher.date}</span>
                    </div>

                    <div>
                      <span className="text-[#F0A6BC] block text-[10px] uppercase font-bold">Registration Fee</span>
                      <span className="text-sm font-mono font-extrabold text-emerald-300">{generatedVoucher.amount}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#190B12] border border-[#F0A6BC]/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <QrCode size={36} className="text-[#F0A6BC]" />
                      <div className="text-[11px]">
                        <span className="text-emerald-400 font-bold block">{generatedVoucher.status}</span>
                        <span className="text-[#FFF1F4]/60">Scan at admission office counter</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playSound('click');
                        window.print();
                      }}
                      className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <Download size={13} />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <GraduationCap size={40} className="mx-auto text-[#F0A6BC]/40 animate-bounce" />
                  <p className="text-sm text-[#FFF1F4]/60">
                    Fill the form on the left and click &apos;Generate Admission Voucher&apos; to view the interactive voucher preview.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}