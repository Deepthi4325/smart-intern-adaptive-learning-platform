import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Shield,
  Award,
  Bot,
  MessageSquare,
  Building,
  Lock,
  Zap,
  Check,
  HelpCircle,
  TrendingUp,
  FileText,
  Video,
  User,
  Code2,
  ListChecks,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Gauge,
  Rocket,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleHiringRoles } from '../../data/hiringSimulatorData';
import { HiringSimulatorRole } from '../../types';

// Helper component to render authentic company logos
const CompanyBrandLogo: React.FC<{ name: string; color: string; size?: string }> = ({
  name,
  color,
  size = 'w-4 h-4',
}) => {
  const n = name.toLowerCase();

  if (n.includes('microsoft')) {
    return (
      <div className={`grid grid-cols-2 gap-0.5 ${size} shrink-0`}>
        <div className="bg-[#F25022] rounded-[1px]" />
        <div className="bg-[#7FBA00] rounded-[1px]" />
        <div className="bg-[#00A4EF] rounded-[1px]" />
        <div className="bg-[#FFB900] rounded-[1px]" />
      </div>
    );
  }

  if (n.includes('perplexity')) {
    return (
      <div className={`flex items-center justify-center ${size} shrink-0 text-[#20B2AA] font-bold`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L9 9H2l6 4.5L5.5 21 12 16.5 18.5 21 16 13.5 22 9h-7z" />
        </svg>
      </div>
    );
  }

  if (n.includes('optum')) {
    return (
      <div className={`flex items-center justify-center rounded-full bg-[#FF6600] text-white font-extrabold text-[9px] ${size} shrink-0`}>
        O
      </div>
    );
  }

  if (n.includes('google')) {
    return (
      <svg className={`${size} shrink-0`} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    );
  }

  if (n.includes('amazon') || n.includes('aws')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#232F3E] text-[#FF9900] font-extrabold text-[9px] ${size} shrink-0`}>
        a
      </div>
    );
  }

  if (n.includes('uber')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-black text-white font-extrabold text-[9px] ${size} shrink-0`}>
        U
      </div>
    );
  }

  if (n.includes('swiggy')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#FC8019] text-white font-extrabold text-[9px] ${size} shrink-0`}>
        S
      </div>
    );
  }

  if (n.includes('meesho')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#9C27B0] text-white font-extrabold text-[9px] ${size} shrink-0`}>
        M
      </div>
    );
  }

  if (n.includes('oracle')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#F80000] text-white font-bold text-[9px] ${size} shrink-0`}>
        O
      </div>
    );
  }

  if (n.includes('razorpay')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#0C2340] text-[#3395FF] font-black text-[10px] ${size} shrink-0`}>
        R
      </div>
    );
  }

  if (n.includes('ibm')) {
    return (
      <div className={`flex items-center justify-center rounded-xs bg-[#052FAD] text-white font-mono font-bold text-[8px] tracking-tighter ${size} shrink-0`}>
        IBM
      </div>
    );
  }

  if (n.includes('infosys')) {
    return (
      <div className={`flex items-center justify-center rounded-xs bg-[#007CC3] text-white font-sans font-bold text-[8px] ${size} shrink-0`}>
        inf
      </div>
    );
  }

  if (n.includes('deloitte')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-black text-[#86BC25] font-black text-[11px] ${size} shrink-0`}>
        D•
      </div>
    );
  }

  if (n.includes('adobe')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#FF0000] text-white font-extrabold text-[10px] ${size} shrink-0`}>
        A
      </div>
    );
  }

  if (n.includes('accenture')) {
    return (
      <div className={`flex items-center justify-center rounded-sm bg-[#A100FF] text-white font-extrabold text-[10px] ${size} shrink-0`}>
        &gt;
      </div>
    );
  }

  // Generic fallback with brand color
  return (
    <span
      className={`rounded-full shrink-0 ${size}`}
      style={{ backgroundColor: color || '#4F46E5' }}
    />
  );
};

export const HiringSimulator: React.FC = () => {
  const { selectedHiringRoleId, setSelectedHiringRoleId, addXp, user, t } = useApp();

  const [activeView, setActiveView] = useState<
    'list' | 'loading-role' | 'detail' | 'loading-test' | 'level-select' | 'mock-test' | 'mock-interview'
  >('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Tech' | 'Management' | 'Design'>('Tech');
  const [roleFilter, setRoleFilter] = useState<string>('All');

  // Active selected role
  const selectedRole: HiringSimulatorRole =
    sampleHiringRoles.find((r) => r.id === selectedHiringRoleId) || sampleHiringRoles[0];

  // Mock Test State
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert'
  >('Intermediate');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [testFinished, setTestFinished] = useState(false);
  const [testTimer, setTestTimer] = useState(15 * 60);

  // Mock Interview State
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewFeedback, setInterviewFeedback] = useState<string | null>(null);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  // Test countdown timer
  useEffect(() => {
    let interval: any = null;
    if (activeView === 'mock-test' && !testFinished && testTimer > 0) {
      interval = setInterval(() => {
        setTestTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeView, testFinished, testTimer]);

  // Frame 00:04 -> 00:05 -> 00:06
  const handleStartRole = (roleId: string) => {
    setSelectedHiringRoleId(roleId);
    setActiveView('loading-role');
    setTimeout(() => {
      setActiveView('detail');
    }, 650);
  };

  // Frame 00:09 -> 00:10 -> 00:11
  const handleLaunchTestFlow = () => {
    setActiveView('loading-test');
    setTimeout(() => {
      setActiveView('level-select');
    }, 750);
  };

  const handleStartActualTest = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestFinished(false);
    setTestTimer(15 * 60);
    setActiveView('mock-test');
  };

  const handleLaunchInterview = () => {
    setCurrentPromptIndex(0);
    setInterviewAnswer('');
    setInterviewFeedback(null);
    setActiveView('mock-interview');
  };

  const handleSelectAnswer = (optIndex: number) => {
    if (testFinished) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    selectedRole.mockQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinishTest = () => {
    setTestFinished(true);
    addXp(40);
  };

  const handleEvaluateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewAnswer.trim()) return;

    setIsSubmittingAnswer(true);
    setTimeout(() => {
      setIsSubmittingAnswer(false);
      setInterviewFeedback(
        'Excellent articulation! Strengths: Clear situational context, appropriate architectural trade-off justification, and structured delivery. Recommended polish: Mention quantifiable throughput/latency metrics.'
      );
      addXp(30);
    }, 800);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filtered roles list
  const filteredRoles = sampleHiringRoles.filter((r) => {
    if (categoryFilter !== 'All' && r.category !== categoryFilter) {
      return false;
    }
    if (roleFilter !== 'All' && r.id !== roleFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.companies.some((c) => c.name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. LIST VIEW: Main Role-Based Hiring Simulator Grid (Video Frame 00:00 - 00:04) */}
      {/* ========================================================================= */}
      {activeView === 'list' && (
        <div className="space-y-8 animate-fade-in">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="text-slate-400">🏠</span>
              <span>/</span>
              <span className="text-slate-500">Practice</span>
              <span>/</span>
              <span className="font-bold text-slate-900">Hiring Simulator</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <Briefcase className="h-3.5 w-3.5 text-indigo-600" />
                <span>For Business</span>
              </button>
            </div>
          </div>

          {/* Hero Header Banner with 3D Tech Graphics (Video Frame 00:00) */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-indigo-50/40 p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Role-Based Hiring Simulator
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Practice with the role-based questions and interview prompts bundled with this prototype.
                </p>
              </div>

              {/* 3D Laptop Graphic with floating OpenAI, Google, AWS badges */}
              <div className="relative flex items-center justify-center shrink-0 pr-4">
                <div className="relative h-28 w-44 sm:h-32 sm:w-52 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-2 shadow-2xl border border-slate-700 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-1 px-1">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[8px] font-mono text-indigo-300">smartintern.ai</span>
                  </div>

                  {/* Inner code lines */}
                  <div className="space-y-1 px-1 py-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-indigo-500/60" />
                    <div className="h-1.5 w-1/2 rounded-full bg-slate-600/60" />
                    <div className="h-1.5 w-4/5 rounded-full bg-emerald-500/50" />
                  </div>

                  {/* Keyboard bottom */}
                  <div className="h-2 w-full rounded-sm bg-slate-700/80" />
                </div>

                {/* Floating Brand Badges emerging from laptop */}
                <div className="absolute -top-3 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg border border-slate-100 animate-bounce duration-1000">
                  <CompanyBrandLogo name="Google" color="" size="w-4 h-4" />
                </div>
                <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-xl bg-[#10A37F] text-white font-bold text-xs shadow-lg animate-pulse">
                  AI
                </div>
                <div className="absolute -bottom-2 -left-3 flex h-7 w-7 items-center justify-center rounded-lg bg-[#232F3E] text-[#FF9900] font-black text-[10px] shadow-md">
                  aws
                </div>
              </div>
            </div>
          </div>

          {/* Subheading & Search / Filter Controls (Video Frame 00:03) */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Choose From The Top Roles
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Find a role that fits your goals and start practicing
                </p>
              </div>

              {/* AI Credits Available: 3 Badge with purple gradient (Video exact match!) */}
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-100 px-4 py-2 border border-purple-200 shadow-xs cursor-pointer hover:border-purple-300 transition-colors self-start sm:self-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                <span className="text-xs font-bold text-purple-950">AI Credits Available: 3</span>
                <ChevronRight className="h-3.5 w-3.5 text-purple-600" />
              </div>
            </div>

            {/* Filter Row: Search + Category + Role Dropdowns */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              {/* Search box */}
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none shadow-2xs transition-colors"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 text-xs font-medium">Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as any)}
                    className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 font-bold focus:border-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Management">Management</option>
                    <option value="Design">Design</option>
                    <option value="All">All</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 text-xs font-medium">Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs text-slate-800 font-bold focus:border-indigo-500 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All</option>
                    {sampleHiringRoles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Role Cards Grid (Matching the video exact layout & typography!) */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Title & Start Button Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {role.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartRole(role.id)}
                      className="rounded-xl bg-[#1b55e2] px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs shrink-0 cursor-pointer"
                    >
                      Start
                    </button>
                  </div>

                  {/* Hiring Companies row with authentic brand logos */}
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {role.companies.map((comp) => (
                      <span
                        key={comp.name}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-bold text-slate-800"
                      >
                        <CompanyBrandLogo name={comp.name} color={comp.color} />
                        <span>{comp.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags row with +N indicator */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  {role.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px] text-slate-500 font-bold">
                    +{role.totalTagsCount || 13}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LOADING SCREEN ON STARTING A ROLE (Video Frame 00:05) */}
      {/* ========================================================================= */}
      {activeView === 'loading-role' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white animate-fade-in">
          <div className="relative flex items-center justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b55e2] text-white font-extrabold text-xl shadow-lg">
              un
            </div>
            <div className="absolute -inset-2.5 rounded-full border-2 border-[#1b55e2]/20 border-t-[#1b55e2] animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-700">Loading...</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ROLE DETAIL VIEW: Companies, Process & Practice (Video Frame 00:06 - 00:09) */}
      {/* ========================================================================= */}
      {activeView === 'detail' && (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
          {/* Top Back Navigation & Title */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveView('list')}
              className="flex items-center gap-2.5 text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white group-hover:bg-indigo-50">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedRole.title}
              </h1>
            </button>

            <button
              onClick={() => setActiveView('list')}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 cursor-pointer"
            >
              ← Back to Roles
            </button>
          </div>

          {/* Top Companies that hire for this role (Frame 00:06) */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Top Companies that hire for this role
            </h2>
            <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
              {selectedRole.companies.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-2.5 text-xs font-extrabold text-slate-800 shadow-2xs"
                >
                  <CompanyBrandLogo name={c.name} color={c.color} size="w-5 h-5" />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Hiring Process Timeline (Frame 00:07) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Typical Hiring Process
            </h2>

            <div className="relative flex items-center justify-between overflow-x-auto py-4">
              {/* Connecting background bar */}
              <div className="absolute top-9 left-12 right-12 h-1 bg-slate-200 -z-0" />

              {selectedRole.hiringProcessSteps.map((stepName, idx) => {
                const isInterview = idx >= 3;
                return (
                  <div
                    key={stepName}
                    className="relative z-10 flex flex-col items-center text-center px-3 min-w-[130px]"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md mb-3 border-2 border-white ${
                        isInterview ? 'bg-[#7C3AED]' : 'bg-[#1b55e2]'
                      }`}
                    >
                      {idx === 0 && <FileText className="h-5 w-5" />}
                      {idx === 1 && <ListChecks className="h-5 w-5" />}
                      {idx === 2 && <Code2 className="h-5 w-5" />}
                      {idx === 3 && <Video className="h-5 w-5" />}
                      {idx === 4 && <User className="h-5 w-5" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice for [Role] (Frame 00:08) */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Practice for {selectedRole.title}
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Left Card: Technical Tests */}
              <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Technical Tests</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Timed questions in the same format as your assessment
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {selectedRole.technicalTests.map((t) => (
                      <div
                        key={t.roundName}
                        className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-4 border border-slate-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-[#1b55e2]">
                            {t.roundName.includes('Coding') ? (
                              <Code2 className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">{t.roundName}</div>
                            <div className="text-[11px] text-slate-500">
                              {t.questionsCount} Questions · {t.durationMinutes} mins
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLaunchTestFlow}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#1b55e2] py-3.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
                >
                  <span>Take Mock Test</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              {/* Right Card: Interview */}
              <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Interview</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Timed questions in the same format as your assessment
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {selectedRole.interviewRounds.map((r) => (
                      <div
                        key={r.roundName}
                        className="flex items-center justify-between rounded-2xl bg-purple-50/50 p-4 border border-purple-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-[#7C3AED]">
                            {r.roundName.includes('HR') ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Video className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">{r.roundName}</div>
                            <div className="text-[11px] text-slate-500">{r.durationMinutes} mins</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLaunchInterview}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#7C3AED] py-3.5 text-xs font-bold text-white hover:bg-purple-800 transition-colors shadow-md cursor-pointer"
                >
                  <span>Take Mock Interview</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PLEASE WAIT UNSTOP LOADING SCREEN (Video Frame 00:10) */}
      {/* ========================================================================= */}
      {activeView === 'loading-test' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white py-16 animate-fade-in">
          <div />
          <div className="text-center space-y-4">
            <div className="relative inline-flex items-center justify-center mb-2">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0b2447] text-white shadow-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1b55e2] text-white font-extrabold text-xs">
                  un
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white">unstop</span>
              </div>
              <div className="absolute -inset-3 rounded-2xl border-2 border-[#1b55e2]/20 border-t-[#1b55e2] animate-spin" />
            </div>
            <div className="text-sm font-semibold text-slate-600">Please Wait</div>
          </div>
          <div className="text-xs text-slate-400 text-center px-4">
            Best viewed in latest versions of Mozilla, Chrome, Opera & Safari.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. COMFORT LEVEL / DIFFICULTY SELECTOR (Video Frame 00:11 - 00:14) */}
      {/* ========================================================================= */}
      {activeView === 'level-select' && (
        <div className="space-y-8 max-w-4xl mx-auto py-6 animate-fade-in">
          {/* Top Back link */}
          <button
            onClick={() => setActiveView('detail')}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{selectedRole.title}</span>
          </button>

          {/* Heading */}
          <div className="text-center space-y-1.5 max-w-xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How comfortable are you with this topic?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              This helps us tailor the question difficulty and recommendations to match your level.
            </p>
          </div>

          {/* 5 Cards Row (Video Frame 00:11 - 00:14) */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              {
                id: 'Beginner' as const,
                title: 'Beginner',
                desc: 'Just getting started or learning basics',
                icon: <GraduationCap className="h-6 w-6 text-emerald-600" />,
                bg: 'bg-emerald-50',
                border: 'border-emerald-500',
              },
              {
                id: 'Basic' as const,
                title: 'Basic',
                desc: 'Understand fundamentals, need practice',
                icon: <Lightbulb className="h-6 w-6 text-emerald-600" />,
                bg: 'bg-emerald-50',
                border: 'border-emerald-500',
              },
              {
                id: 'Intermediate' as const,
                title: 'Intermediate',
                desc: 'Comfortable with most concepts',
                icon: <Gauge className="h-6 w-6 text-blue-600" />,
                bg: 'bg-blue-50',
                border: 'border-blue-500',
                isPro: true,
              },
              {
                id: 'Advanced' as const,
                title: 'Advanced',
                desc: 'Strong understanding, can solve complex problems',
                icon: <Rocket className="h-6 w-6 text-purple-600" />,
                bg: 'bg-purple-50',
                border: 'border-purple-500',
                isPro: true,
              },
              {
                id: 'Expert' as const,
                title: 'Expert',
                desc: 'Highly confident, aiming for top performance',
                icon: <Trophy className="h-6 w-6 text-rose-600" />,
                bg: 'bg-rose-50',
                border: 'border-rose-500',
                isPro: true,
              },
            ].map((lvl) => {
              const isSelected = selectedDifficulty === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => setSelectedDifficulty(lvl.id)}
                  className={`relative cursor-pointer rounded-2xl border p-4 text-center transition-all flex flex-col justify-between min-h-[170px] ${
                    isSelected
                      ? `border-2 ${lvl.border} bg-white ring-2 ring-indigo-500/20 shadow-md`
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* PRO badge with lock icon on top right */}
                  {lvl.isPro && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full bg-[#1b55e2] px-2 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                      <Lock className="h-2.5 w-2.5" />
                      <span>pro</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${lvl.bg}`}
                    >
                      {lvl.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{lvl.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{lvl.desc}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#1b55e2] bg-[#1b55e2] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Companies in Mock Test */}
          <div className="text-center space-y-2 pt-6">
            <p className="text-xs text-slate-500 font-medium">
              Questions asked in this mock test will be from these companies
            </p>
            <div className="flex justify-center items-center gap-3">
              {selectedRole.companies.map((c) => (
                <span
                  key={c.name}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs"
                >
                  <CompanyBrandLogo name={c.name} color={c.color} />
                  <span>{c.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Next Button on Bottom Right */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              onClick={handleStartActualTest}
              className="flex items-center gap-2 rounded-xl bg-[#1b55e2] px-8 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-md transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TIMED MULTIPLE-CHOICE MOCK TEST SCREEN */}
      {/* ========================================================================= */}
      {activeView === 'mock-test' && (
        <div className="space-y-6 max-w-3xl mx-auto py-4 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-bold text-[#1b55e2] uppercase tracking-wider">
                {selectedRole.title} · {selectedDifficulty} Mock Assessment
              </div>
              <h1 className="text-lg font-extrabold text-slate-900 mt-0.5">
                Technical Screening Round
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 font-mono text-xs font-bold text-amber-400 shadow-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTimer(testTimer)}</span>
              </div>
              <button
                onClick={() => setActiveView('detail')}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>

          {!testFinished ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question Meta */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Question <strong className="text-slate-900">{currentQuestionIndex + 1}</strong> of{' '}
                  {selectedRole.mockQuestions.length}
                </span>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#1b55e2] border border-blue-200">
                  {selectedRole.mockQuestions[currentQuestionIndex]?.company} Round Question
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1b55e2] transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / selectedRole.mockQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Statement */}
              <h2 className="text-base font-extrabold text-slate-900 leading-relaxed">
                {selectedRole.mockQuestions[currentQuestionIndex]?.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {selectedRole.mockQuestions[currentQuestionIndex]?.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1b55e2] bg-blue-50/60 text-slate-900 font-bold ring-1 ring-[#1b55e2]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border ${
                          isSelected
                            ? 'bg-[#1b55e2] text-white border-[#1b55e2]'
                            : 'border-slate-300 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentQuestionIndex < selectedRole.mockQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="rounded-xl bg-[#1b55e2] px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs cursor-pointer"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTest}
                    className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-md cursor-pointer"
                  >
                    Submit Test & Evaluate
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center space-y-6 shadow-md animate-fade-in">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Award className="h-8 w-8" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Assessment Complete!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  You scored{' '}
                  <strong className="text-[#1b55e2] font-mono text-sm">
                    {calculateScore()} / {selectedRole.mockQuestions.length}
                  </strong>{' '}
                  correct answers. Earned{' '}
                  <strong className="text-amber-600 font-mono">+40 XP</strong>!
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 text-left">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question Review & Explanations
                </h3>
                {selectedRole.mockQuestions.map((q, qIdx) => {
                  const isCorrect = userAnswers[qIdx] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border p-4 text-xs space-y-2 ${
                        isCorrect ? 'border-emerald-200 bg-emerald-50/40' : 'border-rose-200 bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          Q{qIdx + 1}: {q.question}
                        </span>
                        <span
                          className={`font-bold text-[11px] ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {isCorrect ? 'Correct ✓' : 'Incorrect ✕'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-100">
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={handleStartActualTest}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Retry Test
                </button>
                <button
                  onClick={() => setActiveView('detail')}
                  className="rounded-xl bg-[#1b55e2] px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs cursor-pointer"
                >
                  Return to Role Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. LIVE AI MOCK INTERVIEW SIMULATOR */}
      {/* ========================================================================= */}
      {activeView === 'mock-interview' && (
        <div className="space-y-6 max-w-3xl mx-auto py-4 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('detail')}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#7C3AED]">AI Mock Interview</span>
                <h1 className="text-base font-extrabold text-slate-900">
                  {selectedRole.title} Simulation Round
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <Bot className="h-4 w-4" />
              <span>AI Evaluator Active</span>
            </div>
          </div>

          {/* Interview Question Prompt Box */}
          <div className="rounded-3xl border border-purple-100 bg-gradient-to-r from-slate-900 via-slate-800 to-purple-950 p-6 sm:p-8 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-purple-200 font-semibold">
                <Building className="h-4 w-4" />
                <span>
                  {selectedRole.mockInterviewPrompts[currentPromptIndex]?.interviewerName} ·{' '}
                  {selectedRole.mockInterviewPrompts[currentPromptIndex]?.interviewerRole}
                </span>
              </div>
              <span className="rounded bg-purple-600 px-2 py-0.5 text-[10px] font-bold">
                {selectedRole.mockInterviewPrompts[currentPromptIndex]?.round}
              </span>
            </div>

            <h2 className="text-lg font-bold leading-relaxed text-white">
              "{selectedRole.mockInterviewPrompts[currentPromptIndex]?.question}"
            </h2>

            {/* Hints Accordion */}
            <div className="rounded-2xl bg-white/10 p-3 text-xs text-purple-100 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Interviewer Target Invariants:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-200">
                {selectedRole.mockInterviewPrompts[currentPromptIndex]?.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Response Form */}
          <form
            onSubmit={handleEvaluateInterview}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Your Answer (Explain your methodology, system trade-offs & edge cases):
              </label>
              <textarea
                rows={5}
                placeholder="Start typing your structured response or behavioral STAR explanation..."
                value={interviewAnswer}
                onChange={(e) => setInterviewAnswer(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-800 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Answer evaluated by Smart Intern AI against Tier-1 rubric
              </span>
              <button
                type="submit"
                disabled={isSubmittingAnswer || !interviewAnswer.trim()}
                className="flex items-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-2.5 text-xs font-bold text-white hover:bg-purple-800 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
              >
                <span>{isSubmittingAnswer ? 'Evaluating...' : 'Submit Response'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* AI Feedback Box */}
          {interviewFeedback && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>AI Panel Evaluation Report</span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  +30 XP Awarded
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">{interviewFeedback}</p>
              <div className="text-[11px] text-emerald-800 pt-1">
                <strong>Ideal Talking Points:</strong>{' '}
                {selectedRole.mockInterviewPrompts[currentPromptIndex]?.idealAnswerOutline}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
