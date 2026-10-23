import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Brain,
  Layers,
  GraduationCap,
  FastForward,
  Video,
  Headphones,
  Image as ImageIcon,
  Smile,
  Sliders,
  Target,
  Building2,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProficiencyLevel, ContentFormat } from '../../types';

export const OnboardingAssessment: React.FC = () => {
  const { user, setUser, setCurrentRoute } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Step 1: Baseline Proficiency & Academic Background
  const [level, setLevel] = useState<ProficiencyLevel>('Intermediate');
  const [academicStage, setAcademicStage] = useState<string>('3rd/4th Year (Pre-final / Final Year)');

  // Step 2: Engineering Domain (4 clear rectangular selection boxes: CSE, AIML, ECE, Civil)
  const [engineeringDomain, setEngineeringDomain] = useState<'CSE' | 'AIML' | 'ECE' | 'Civil'>('CSE');

  // Step 3: Format Preference
  const [preferredFormat, setPreferredFormat] = useState<ContentFormat>('interactive');

  // Step 4: Target Goals
  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer (SDE-1)');
  const [targetTimeline, setTargetTimeline] = useState<string>('6 Months (Campus Placement Season)');
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [targetTier, setTargetTier] = useState<'FAANG/Tier-1' | 'High-Growth Unicorn' | 'Mid-size Tech' | 'Open Source'>('FAANG/Tier-1');

  const handleSkip = () => {
    setUser((prev) => ({
      ...prev,
      level: 'Intermediate',
      targetRole: 'Software Development Engineer (SDE-1)',
      targetCompanyTier: 'FAANG/Tier-1',
      preferredFormat: 'interactive',
      engineeringDomain: 'CSE',
      weeklyHoursGoal: 15,
      isOnboarded: true,
      isGuest: false,
    }));
    setCurrentRoute('dashboard');
  };

  const handleFinish = () => {
    setUser((prev) => ({
      ...prev,
      level,
      engineeringDomain,
      preferredFormat,
      targetRole,
      targetCompanyTier: targetTier,
      weeklyHoursGoal: weeklyHours,
      isOnboarded: true,
      isGuest: false,
    }));
    setCurrentRoute('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 flex items-center justify-center selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-slate-100">
        {/* Top Progress & Skip button */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-xs">
                SI
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Adaptive Diagnostic Flow
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Step {step} of {totalSteps}: {
                step === 1 ? 'Determine Baseline' :
                step === 2 ? 'Engineering Domain' :
                step === 3 ? 'Format Preference' :
                'Target Goals'
              }
            </h1>
          </div>

          {/* Active Skip for Now Button */}
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-xs cursor-pointer"
          >
            <span>Skip for Now (Standard Track)</span>
            <FastForward className="h-3.5 w-3.5 text-indigo-400" />
          </button>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-indigo-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Determine Baseline */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white">Current Technical Knowledge Level</h2>
              <p className="text-xs text-slate-400 mt-1">
                Smart Intern adapts editorial depth, code scaffolding, and hints to match your level.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'Beginner' as ProficiencyLevel,
                  title: 'Beginner (Intuition & Metaphors First)',
                  description:
                    'Learning core data structures (arrays, recursion, loops). I need visual analogies, zero academic jargon, and step-by-step foundation building.',
                  badge: 'Foundations',
                },
                {
                  id: 'Intermediate' as ProficiencyLevel,
                  title: 'Intermediate (Interview Invariants & Patterns)',
                  description:
                    'Familiar with standard data structures. Looking for high-yield interview patterns (Sliding Window, Two Pointers, Graph BFS, LRU Cache) and proofs.',
                  badge: 'Most Popular',
                },
                {
                  id: 'Advanced' as ProficiencyLevel,
                  title: 'Advanced (Distributed Systems & Scale)',
                  description:
                    'Solves medium/hard problems comfortably. Want distributed system trade-offs, lock-free concurrency, and staff-level engineering insights.',
                  badge: 'Tier-1 Target',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLevel(item.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    level === item.id
                      ? 'border-indigo-500 bg-indigo-950/50 ring-1 ring-indigo-500 shadow-md'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{item.title}</span>
                      <span className="rounded-md bg-indigo-900/70 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                        {item.badge}
                      </span>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        level === item.id
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {level === item.id && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">
                Current Background / Academic Stage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  '1st / 2nd Year (Foundation)',
                  '3rd/4th Year (Pre-final / Final Year)',
                  'Recent Graduate / Working',
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setAcademicStage(st)}
                    className={`rounded-xl border p-2.5 text-center font-medium transition-all ${
                      academicStage === st
                        ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Engineering Domain (4 clear rectangular selection boxes: CSE, AIML, ECE, Civil) */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white">Select Your Engineering Domain</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tailors subject roadmaps, core sheets, and company-specific role simulators to your discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'CSE' as const,
                  title: 'CSE',
                  fullName: 'Computer Science & Engineering',
                  desc: 'DSA, System Design, Operating Systems, DBMS, Networks & Cloud Infrastructure.',
                  icon: <Code2 className="h-6 w-6 text-indigo-400" />,
                },
                {
                  id: 'AIML' as const,
                  title: 'AIML',
                  fullName: 'Artificial Intelligence & Machine Learning',
                  desc: 'Deep Learning, Transformers, NLP, RAG, PyTorch & Math for Data Science.',
                  icon: <Brain className="h-6 w-6 text-violet-400" />,
                },
                {
                  id: 'ECE' as const,
                  title: 'ECE',
                  fullName: 'Electronics & Communication',
                  desc: 'Embedded Systems, Microcontrollers, VLSI, IoT, Signal Processing & C/C++.',
                  icon: <Cpu className="h-6 w-6 text-emerald-400" />,
                },
                {
                  id: 'Civil' as const,
                  title: 'Civil',
                  fullName: 'Civil Engineering & Computational Design',
                  desc: 'Structural Analysis, CAD/BIM, Geotechnical Modeling & Smart Infrastructure Tech.',
                  icon: <Building2 className="h-6 w-6 text-amber-400" />,
                },
              ].map((domain) => (
                <div
                  key={domain.id}
                  onClick={() => setEngineeringDomain(domain.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                    engineeringDomain === domain.id
                      ? 'border-indigo-500 bg-indigo-950/50 ring-2 ring-indigo-500/60 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700">
                        {domain.icon}
                      </div>
                      <div>
                        <span className="text-base font-extrabold text-white">{domain.title}</span>
                        <div className="text-[11px] font-medium text-slate-400">{domain.fullName}</div>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        engineeringDomain === domain.id
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {engineeringDomain === domain.id && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{domain.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Format Preference */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white">Select Preferred Learning Styles</h2>
              <p className="text-xs text-slate-400 mt-1">
                Every topic in Smart Intern contains 6 sensory formats. Which representation should open by default?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'interactive' as ContentFormat,
                  title: 'Interactive Sandboxes',
                  desc: 'Playable array visualizers, draggable pointers, step-by-step state animations.',
                  icon: <Sliders className="h-5 w-5 text-indigo-400" />,
                },
                {
                  id: 'video' as ContentFormat,
                  title: 'Video Walkthroughs',
                  desc: 'Bite-sized whiteboard lessons, code walkthroughs with timestamped milestones.',
                  icon: <Video className="h-5 w-5 text-sky-400" />,
                },
                {
                  id: 'audio' as ContentFormat,
                  title: 'Audio Bytes',
                  desc: 'Commute-friendly conceptual debriefs, voice podcasts, and interview pitch audio.',
                  icon: <Headphones className="h-5 w-5 text-emerald-400" />,
                },
                {
                  id: 'diagram' as ContentFormat,
                  title: 'Visual Flowcharts & Diagrams',
                  desc: 'Architecture schemas, memory layouts, state machines, and visual proofs.',
                  icon: <ImageIcon className="h-5 w-5 text-amber-400" />,
                },
                {
                  id: 'comic' as ContentFormat,
                  title: 'Illustrated Narrative Comics',
                  desc: 'Memorable character stories, real-world analogies, and sticky retention cues.',
                  icon: <Smile className="h-5 w-5 text-rose-400" />,
                },
                {
                  id: 'text' as ContentFormat,
                  title: 'Text & Editorial Cheatsheets',
                  desc: 'High-density code snippets, time-space invariants, and edge case breakdowns.',
                  icon: <BookOpen className="h-5 w-5 text-violet-400" />,
                },
              ].map((fmt) => (
                <div
                  key={fmt.id}
                  onClick={() => setPreferredFormat(fmt.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    preferredFormat === fmt.id
                      ? 'border-indigo-500 bg-indigo-950/50 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
                        {fmt.icon}
                      </div>
                      <span className="font-bold text-xs text-white">{fmt.title}</span>
                    </div>
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        preferredFormat === fmt.id
                          ? 'border-indigo-500 bg-indigo-600 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {preferredFormat === fmt.id && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal pl-10.5">{fmt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Target Goals */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-white">Set Target Career Goals</h2>
              <p className="text-xs text-slate-400 mt-1">
                Aligns your Planly study sprints and company simulation rounds.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Web Engineer">Frontend Web Engineer</option>
                <option value="Cloud / DevOps Engineer">Cloud / DevOps Engineer</option>
                <option value="Data Analyst / BI Analyst">Data Analyst / BI Analyst</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preparation Timeline</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  '3 Months (Urgent Sprint)',
                  '6 Months (Campus Season)',
                  '12 Months (Comprehensive)',
                ].map((tl) => (
                  <button
                    key={tl}
                    type="button"
                    onClick={() => setTargetTimeline(tl)}
                    className={`rounded-xl border p-2.5 text-center font-medium transition-all ${
                      targetTimeline === tl
                        ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Weekly Study Commitment: <span className="font-bold text-indigo-400 font-mono">{weeklyHours} hours/week</span>
              </label>
              <input
                type="range"
                min={5}
                max={35}
                step={5}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5 hrs (Light)</span>
                <span>15 hrs (Recommended)</span>
                <span>35 hrs (Intense Bootcamp)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Company Ambition
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'FAANG/Tier-1' as const, label: 'FAANG / Tier-1', sub: 'Google, Microsoft, Amazon' },
                  { id: 'High-Growth Unicorn' as const, label: 'Tech Unicorns', sub: 'Swiggy, Razorpay, CRED' },
                  { id: 'Mid-size Tech' as const, label: 'Mid-size Tech & IT', sub: 'Infosys, Cognizant, IBM' },
                  { id: 'Open Source' as const, label: 'Startups & Open Source', sub: 'Postman, Devfolio, Remote' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTargetTier(tier.id)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      targetTier === tier.id
                        ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{tier.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Personalized Workspace</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
