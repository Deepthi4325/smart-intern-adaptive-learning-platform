import React, { useState } from 'react';
import {
  Trophy,
  Briefcase,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  X,
  Calendar,
  Building,
  ArrowUpDown,
  Tag,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportunityItem } from '../../types';

interface OpportunitiesListProps {
  initialType?: 'all' | 'hackathon' | 'internship' | 'job';
}

export const OpportunitiesList: React.FC<OpportunitiesListProps> = ({ initialType = 'all' }) => {
  const { opportunities, applyOpportunity } = useApp();

  const [activeType, setActiveType] = useState<'all' | 'hackathon' | 'internship' | 'job'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');

  // Hackathon specific filters
  const [teamSizeFilter, setTeamSizeFilter] = useState<string>('All');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Internship specific domain filter pills
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');

  // Sort By
  const [sortBy, setSortBy] = useState<'deadline' | 'applied' | 'prize'>('deadline');

  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);
  const [appliedModalSuccess, setAppliedModalSuccess] = useState(false);

  // Sync with initialType changes
  React.useEffect(() => {
    setActiveType(initialType);
  }, [initialType]);

  const filteredOpportunities = opportunities.filter((opp) => {
    // Type Filter
    if (activeType !== 'all' && opp.type !== activeType) return false;

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Hackathon filters
    if (opp.type === 'hackathon') {
      if (teamSizeFilter !== 'All' && opp.teamSize && !opp.teamSize.includes(teamSizeFilter)) {
        return false;
      }
      if (paymentFilter !== 'All' && opp.payment !== paymentFilter) {
        return false;
      }
      if (categoryFilter !== 'All' && opp.category !== categoryFilter) {
        return false;
      }
    }

    // Internship filters
    if (opp.type === 'internship') {
      if (domainFilter !== 'All' && opp.domain !== domainFilter) {
        return false;
      }
      if (modeFilter !== 'All' && opp.mode !== modeFilter) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    if (sortBy === 'applied') return b.appliedCount - a.appliedCount;
    return 0;
  });

  const handleApplyClick = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setAppliedModalSuccess(false);
  };

  const handleConfirmApplication = () => {
    if (selectedOpportunity) {
      applyOpportunity(selectedOpportunity.id);
      setAppliedModalSuccess(true);
      setTimeout(() => {
        setSelectedOpportunity(null);
        setAppliedModalSuccess(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Dynamic Taglines according to Tab */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {activeType === 'hackathon' ? (
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Hackathons
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Build, code, and innovate in online and student hackathons.
              </p>
            </div>
          ) : activeType === 'internship' ? (
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Internships
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Example listing only. Check the organizer’s official page for current dates and eligibility.
              </p>
            </div>
          ) : activeType === 'job' ? (
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Graduate SDE Jobs
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Full-time Associate Software Engineer & tech roles for graduating batches.
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Opportunities & Placement Hub
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Sample listings included with this prototype; they are not fetched from a live feed.
              </p>
            </div>
          )}
        </div>

        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Demo data only. Deadlines, eligibility, and compensation have not been verified; check each organizer’s official page before applying.
        </p>

        {/* Global Search box */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search roles, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Tabs (Unstop Style) */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'all', label: 'All Opportunities', count: opportunities.length },
          { id: 'hackathon', label: 'Hackathons', count: opportunities.filter((o) => o.type === 'hackathon').length },
          { id: 'internship', label: 'Internships', count: opportunities.filter((o) => o.type === 'internship').length },
          { id: 'job', label: 'Jobs', count: opportunities.filter((o) => o.type === 'job').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveType(tab.id as any)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 transition-all cursor-pointer ${
              activeType === tab.id
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeType === tab.id ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* HACKATHON FILTER BOXES: Team Size, Payment, Categories, Sort By */}
      {activeType === 'hackathon' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="h-3.5 w-3.5 text-indigo-600" />
            <span>Filter Hackathons</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Team Size */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Team Size</label>
              <select
                value={teamSizeFilter}
                onChange={(e) => setTeamSizeFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="All">All Sizes</option>
                <option value="1-4">1-4 Members</option>
                <option value="6">Teams of 6</option>
                <option value="Individual">Individual</option>
              </select>
            </div>

            {/* Payment */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Payment</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="All">All (Free & Paid)</option>
                <option value="Free">Free Registration</option>
                <option value="Paid">Paid Entry</option>
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="All">All Tracks</option>
                <option value="AI/ML">AI / Machine Learning</option>
                <option value="Web Development">Web & Web3</option>
                <option value="Design">UI/UX & Design</option>
                <option value="Open Innovation">Open Innovation Track</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="deadline">Closing Soonest</option>
                <option value="applied">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* INTERNSHIP DOMAIN FILTER PILLS: Data Analysis, Data Science, Software Development, Digital Marketing, Web Development */}
      {activeType === 'internship' && (
        <div className="space-y-3">
          {/* Domain Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Domain:
            </span>
            {[
              'All',
              'Data Analysis',
              'Data Science',
              'Software Development',
              'Digital Marketing',
              'Web Development',
            ].map((dom) => (
              <button
                key={dom}
                onClick={() => setDomainFilter(dom)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  domainFilter === dom
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>

          {/* Additional Filter Row: Type, Location, Sort By */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Work Mode:</span>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white py-1 px-2 text-xs text-slate-800 focus:outline-none"
              >
                <option value="All">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white py-1 px-2 text-xs text-slate-800 focus:outline-none"
              >
                <option value="deadline">Expiring Soon</option>
                <option value="applied">Most Applicants</option>
              </select>
            </div>

            <span className="text-slate-400 text-xs ml-auto">
              Showing {filteredOpportunities.length} opportunities
            </span>
          </div>
        </div>
      )}

      {/* Cards Grid (At least 12 cards) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opp) => {
          const isApplied = Boolean(opp.isApplied);

          return (
            <div
              key={opp.id}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-4"
            >
              {/* Top Row: Logo, Org & Title */}
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-xl font-bold shadow-xs">
                  {opp.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                    {opp.organization}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">
                    {opp.title}
                  </h3>
                </div>
              </div>

              {/* Key Meta Badges */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{opp.location} · <strong>{opp.mode}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-emerald-700 truncate">{opp.stipendOrSalary}</span>
                </div>

                {opp.teamSize && (
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>{opp.teamSize} · <strong className="text-slate-800">{opp.payment || 'Free'}</strong></span>
                  </div>
                )}
              </div>

              {/* Eligibility and the date stored in the sample record */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
                <span className="text-slate-500 truncate max-w-[150px]">
                  {opp.eligibility}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  Deadline: {opp.deadline}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {opp.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
                {opp.tags.length > 3 && (
                  <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400">
                    +{opp.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Apply Action */}
              <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400">
                  {opp.appliedCount.toLocaleString()} applied
                </span>

                <button
                  onClick={() => handleApplyClick(opp)}
                  disabled={isApplied}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                  }`}
                >
                  {isApplied ? 'Application Sent ✓' : 'Apply Now ➔'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {appliedModalSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Application Submitted!
                </h3>
                <p className="text-xs text-slate-500">
                  Your Smart Intern profile and placement readiness score have been forwarded to {selectedOpportunity.organization}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold">
                    {selectedOpportunity.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {selectedOpportunity.title}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {selectedOpportunity.organization} · {selectedOpportunity.location}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 space-y-2 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compensation:</span>
                    <strong className="text-emerald-700">{selectedOpportunity.stipendOrSalary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Eligibility:</span>
                    <span>{selectedOpportunity.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deadline:</span>
                    <span className="font-semibold text-rose-600">{selectedOpportunity.deadline}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedOpportunity(null)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmApplication}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
                  >
                    Submit 1-Click Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
