import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Users,
  GraduationCap,
  CheckSquare,
  Award,
  BarChart3,
  Trophy,
  Briefcase,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Send,
  HelpCircle,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    sidebarCollapsed,
    setSidebarCollapsed,
    openTopic,
    studyTimerRunning,
    studyTimerSeconds,
    t,
  } = useApp();

  // Collapsible accordion sections for the sidebar
  const [prepExpanded, setPrepExpanded] = useState(true);
  const [exploreExpanded, setExploreExpanded] = useState(true);
  const [recommendationsExpanded, setRecommendationsExpanded] = useState(true);

  // This helper routes common questions to relevant sections; it does not call an AI service.
  const [helpQuery, setHelpQuery] = useState('');
  const [helpResponse, setHelpResponse] = useState<string | null>(null);

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
  };

  const navItemClass = (route: AppRoute) => {
    const isActive = currentRoute === route;
    return `group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;
  };

  const handleQuickHelp = (e: React.FormEvent) => {
    e.preventDefault();
    const query = helpQuery.trim().toLowerCase();
    if (!query) return;

    if (query.includes('sliding') || query.includes('window') || query.includes('dsa')) {
      setHelpResponse('For DSA practice, open Prephub or the topic viewer. A sliding-window approach can reduce repeated work when a problem has a suitable contiguous-window structure.');
    } else if (query.includes('hire') || query.includes('simulator') || query.includes('mock') || query.includes('interview')) {
      setHelpResponse('Open the Role-Based Hiring Simulator under Opportunities to try the included practice questions and interview prompts.');
    } else if (query.includes('mypath') || query.includes('planly') || query.includes('timer') || query.includes('study')) {
      setHelpResponse('Open MyPath to review the sample study plan and use the focus timer. Plan items are local demo content.');
    } else if (query.includes('intern') || query.includes('job') || query.includes('hackathon')) {
      setHelpResponse('Open Opportunities to browse the sample internship, job, and hackathon listings stored in the project.');
    } else if (query.includes('certif')) {
      setHelpResponse('Open Certificates to view the included sample certification cards. External credential verification is not connected in this version.');
    } else {
      setHelpResponse('Try searching for a topic in Prephub, opening MyPath for the sample plan, or browsing the practice questions in the Hiring Simulator.');
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <div
          onClick={() => setSidebarCollapsed(true)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Main Viewport-Locked Aside (No scrollbar on sidebar itself, height fixed to screen) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 h-screen overflow-hidden flex flex-col justify-between border-r border-slate-200 bg-white transition-all duration-200 ease-in-out lg:sticky lg:top-0 ${
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex cursor-pointer items-center gap-2.5 overflow-hidden"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-100 font-extrabold text-sm">
              SI
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-slate-900">
                  Smart Intern
                </span>
                <span className="text-[9px] font-semibold text-indigo-600 tracking-wider uppercase">
                  Adaptive Learning
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:block"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Middle Navigation Links (Fitted to viewport with compact density) */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5 scrollbar-none">
          {/* Active Timer Pill if Running */}
          {studyTimerRunning && !sidebarCollapsed && (
            <div
              onClick={() => handleNavClick('mypath')}
              className="flex cursor-pointer items-center justify-between rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs text-indigo-900 shadow-xs hover:bg-indigo-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="font-bold text-[11px]">Focus Running</span>
              </div>
              <span className="font-mono font-bold text-xs text-indigo-700">
                {formatTimer(studyTimerSeconds)}
              </span>
            </div>
          )}

          {/* SECTION 1: Prep */}
          <div className="space-y-0.5">
            {!sidebarCollapsed && (
              <button
                onClick={() => setPrepExpanded(!prepExpanded)}
                className="flex w-full items-center justify-between px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.prep}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${prepExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {prepExpanded && (
              <div className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={navItemClass('dashboard')}
                  title="Dashboard"
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.dashboard}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('prephub')}
                  className={navItemClass('prephub')}
                  title="Prephub"
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.prephub}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('mypath')}
                  className={navItemClass('mypath')}
                  title="MyPath Study Planner"
                >
                  <Compass className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between text-left truncate">
                      <span className="truncate">{t.mypath}</span>
                      <span className="ml-1 text-[9px] font-semibold bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                        AI
                      </span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('community')}
                  className={navItemClass('community')}
                  title="Community & Debriefs"
                >
                  <Users className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.community}</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: Explore */}
          <div className="space-y-0.5">
            {!sidebarCollapsed && (
              <button
                onClick={() => setExploreExpanded(!exploreExpanded)}
                className="flex w-full items-center justify-between px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.explore}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${exploreExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {exploreExpanded && (
              <div className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('courses')}
                  className={navItemClass('courses')}
                  title="My Courses"
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.myCourses}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('assignments')}
                  className={navItemClass('assignments')}
                  title="Assignments"
                >
                  <CheckSquare className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.assignments}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('certificates')}
                  className={navItemClass('certificates')}
                  title="Certificates"
                >
                  <Award className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.certificates}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('progress')}
                  className={navItemClass('progress')}
                  title="My Progress"
                >
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{t.myProgress}</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: Opportunities */}
          <div className="space-y-0.5">
            {!sidebarCollapsed && (
              <button
                onClick={() => setRecommendationsExpanded(!recommendationsExpanded)}
                className="flex w-full items-center justify-between px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase"
              >
                <span>{t.opportunities}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${recommendationsExpanded ? 'rotate-0' : '-rotate-90'}`}
                />
              </button>
            )}

            {recommendationsExpanded && (
              <div className="space-y-0.5">
                {/* Hiring Simulator */}
                <button
                  onClick={() => handleNavClick('hiring-simulator')}
                  className={navItemClass('hiring-simulator')}
                  title="Role-Based Hiring Simulator"
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                  {!sidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between text-left truncate">
                      <span className="truncate">{t.hiringSimulator || 'Hiring Simulator'}</span>
                      <span className="ml-1 text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.2 rounded">
                        NEW
                      </span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('hackathons')}
                  className={navItemClass('hackathons')}
                  title="Hackathons"
                >
                  <Trophy className="h-4 w-4 shrink-0 text-amber-500" />
                  {!sidebarCollapsed && <span>{t.hackathons}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('internships')}
                  className={navItemClass('internships')}
                  title="Internships"
                >
                  <Briefcase className="h-4 w-4 shrink-0 text-sky-500" />
                  {!sidebarCollapsed && <span>{t.internships}</span>}
                </button>

                <button
                  onClick={() => handleNavClick('jobs')}
                  className={navItemClass('jobs')}
                  title="Jobs"
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" />
                  {!sidebarCollapsed && <span>{t.jobs}</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Area: Quick Help panel below navigation (Profile section removed as requested) */}
        {!sidebarCollapsed ? (
          <div className="shrink-0 p-3 border-t border-slate-100 bg-slate-50/70">
            <div className="rounded-2xl border border-indigo-200/80 bg-white p-2.5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
                    <HelpCircle className="h-3 w-3" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">
                    Quick Help
                  </span>
                </div>
                <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1 rounded">
                  Online
                </span>
              </div>

              {/* Response Bubble */}
              {helpResponse && (
                <div className="relative rounded-xl bg-indigo-50/80 p-2 text-[11px] text-indigo-950 border border-indigo-100">
                  <button
                    onClick={() => setHelpResponse(null)}
                    className="absolute right-1.5 top-1.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <p className="pr-3 leading-relaxed">{helpResponse}</p>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleQuickHelp} className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Find a topic or study tool..."
                  value={helpQuery}
                  onChange={(e) => setHelpQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!helpQuery.trim()}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors cursor-pointer"
                  title="Find help"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="shrink-0 p-2 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              title="Open Quick Help"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
