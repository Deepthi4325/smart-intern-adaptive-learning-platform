import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  BookOpen,
  Sparkles,
  X,
  Layers,
  Award,
  Video,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleCourses } from '../../data/mockData';
import { CourseItem } from '../../types';

export const MyCourses: React.FC = () => {
  const { openTopic, t } = useApp();

  const [mainFilter, setMainFilter] = useState<'All Courses' | 'Development' | 'Design' | 'Data Science'>('All Courses');
  const [subFilter, setSubFilter] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const mainCategories = ['All Courses', 'Development', 'Design', 'Data Science'] as const;

  const subCategoriesMap: { [key: string]: string[] } = {
    Development: [
      'All',
      'Web Development',
      'Java',
      'DevOps & Cloud',
      'Front-end',
      'Back-end',
    ],
    Design: ['All', 'UI/UX', 'Product Design', 'Visual Design'],
    'Data Science': ['All', 'Data Analytics', 'Generative AI', 'Deep Learning'],
  };

  const handleMainFilterChange = (cat: typeof mainFilter) => {
    setMainFilter(cat);
    setSubFilter('All');
  };

  const filteredCourses = sampleCourses.filter((course) => {
    if (mainFilter !== 'All Courses' && course.category !== mainFilter) {
      return false;
    }
    if (subFilter !== 'All' && course.subCategory !== subFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.myCourses}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pick up where you left off or explore dedicated tracks: Web Development, Java, DevOps, UI/UX, and Data Analytics.
        </p>
      </div>

      {/* Main Filter Pills */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleMainFilterChange(cat)}
              className={`rounded-xl px-3.5 py-1.5 transition-all text-xs cursor-pointer ${
                mainFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-Filters Pills */}
        {mainFilter !== 'All Courses' && subCategoriesMap[mainFilter] && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Track:
            </span>
            {subCategoriesMap[mainFilter].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubFilter(sub)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                  subFilter === sub
                    ? 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-400 hover:shadow-md transition-all group cursor-pointer"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-900">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                {course.subCategory}
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-bold text-slate-900 backdrop-blur-xs shadow-xs">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Concise Course Info */}
            <div className="flex flex-1 flex-col p-4 space-y-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  By {course.instructor}
                </p>
              </div>

              {/* Progress Bar & Module Count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span className="text-indigo-600 font-bold">{course.progressPercentage}% done</span>
                  <span className="text-slate-400">
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-1 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(course.nextTopicId || 'topic-sliding-window');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Continue</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(course);
                  }}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  title="View Course Syllabus"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Course Header Banner */}
            <div className="flex gap-4 items-start">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="h-20 w-28 rounded-2xl object-cover shadow-sm"
              />
              <div className="space-y-1">
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
                  {selectedCourse.category} · {selectedCourse.subCategory}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {selectedCourse.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Instructor: <strong className="text-slate-800">{selectedCourse.instructor}</strong></span>
                  <span>·</span>
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{selectedCourse.rating} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="rounded-2xl bg-slate-50 p-4 space-y-2 border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Course Mastery Progress</span>
                <span className="text-indigo-600 font-bold">{selectedCourse.progressPercentage}% Completed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${selectedCourse.progressPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500">
                {selectedCourse.completedModules} of {selectedCourse.totalModules} comprehensive modules unlocked.
              </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Curriculum Syllabus & Interactive Lessons
              </h3>
              <div className="space-y-2">
                {[
                  { title: 'Module 1: Foundations & Core Invariants', duration: '45m', type: 'Video + Cheatsheet', completed: true },
                  { title: 'Module 2: Advanced Design Patterns & Trade-offs', duration: '60m', type: 'Interactive Sandbox', completed: selectedCourse.completedModules >= 2 },
                  { title: 'Module 3: High Scale Concurrency & Production Scenarios', duration: '75m', type: 'Audio Byte + Code', completed: selectedCourse.completedModules >= 5 },
                  { title: 'Module 4: Placement Interview Mock Round & Assessment', duration: '30m', type: 'Diagnostic Quiz', completed: selectedCourse.completedModules >= 8 },
                ].map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        mod.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {mod.completed ? '✓' : i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{mod.title}</div>
                        <div className="text-[11px] text-slate-500">{mod.type} · {mod.duration}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCourse(null);
                        openTopic(selectedCourse.nextTopicId || 'topic-sliding-window');
                      }}
                      className="rounded-lg bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                    >
                      {mod.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  openTopic(selectedCourse.nextTopicId || 'topic-sliding-window');
                }}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer shadow-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Resume Curriculum</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
