import React, { useState } from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  X,
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleCertificates } from '../../data/mockData';
import { CertificateItem } from '../../types';

interface TodoCertification {
  id: string;
  title: string;
  issuer: string;
  skills: string[];
  matchScore: number;
  weaknessAddressed: string;
  estimatedHours: number;
  badge: string;
}

export const Certificates: React.FC = () => {
  const { user, t } = useApp();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadCertificate = (cert: CertificateItem) => {
    const recordText = [
      'SMART INTERN — SAMPLE LEARNING RECORD',
      'Demo only. This file is not an issuer-issued certificate or a verified credential.',
      '',
      `Topic: ${cert.title}`,
      `Sample record ID: ${cert.credentialId}`,
      `Profile name: ${user.name}`,
      `Example issuer shown in the demo: ${cert.issuer}`,
      `Sample date: ${cert.issueDate}`,
      '',
      'Topics covered:',
      ...cert.skills.map((skill) => `- ${skill}`),
    ].join('\n');

    const element = document.createElement('a');
    const file = new Blob([recordText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = `SmartIntern_Sample_Record_${cert.credentialId}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
    URL.revokeObjectURL(url);
    showToast('Downloaded a sample learning record. It is not an official certificate.');
  };

  const handleCopyShareText = async (cert: CertificateItem) => {
    const text = `Smart Intern demo record: ${cert.title}. This is sample portfolio content, not an issuer-issued certification.`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied a description of the sample learning record.');
    } catch {
      showToast('Clipboard access is unavailable in this browser.');
    }
  };

  const getLinkedInShareUrl = (cert: CertificateItem) => {
    const postText = `I explored the sample learning record for "${cert.title}" in the Smart Intern prototype. This is a demo record, not an issuer-issued certification.\n\n#Learning #PortfolioProject`;
    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`;
  };

  // Recommended Next Certifications (TO-DO Section based on completed coursework and analyzed weaknesses)
  const todoCertifications: TodoCertification[] = [
    {
      id: 'todo-cert-1',
      title: 'AWS Certified Solutions Architect — Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      skills: ['AWS IAM', 'VPC Peering', 'Multi-AZ Aurora', 'Auto-scaling'],
      matchScore: 94,
      weaknessAddressed: 'Cloud Architecture & Multi-AZ fault tolerance (identified from Cloud & DevOps module quiz)',
      estimatedHours: 40,
      badge: 'High Match for SDE-1',
    },
    {
      id: 'todo-cert-2',
      title: 'Distributed Systems & High-Throughput Caching Expert',
      issuer: 'Smart Intern Engineering Cohort',
      skills: ['Redis Redlock', 'Cache Stampede Mitigation', 'Kafka Partitions'],
      matchScore: 89,
      weaknessAddressed: 'Distributed locking and concurrency race conditions in System Design reviews',
      estimatedHours: 25,
      badge: 'Addresses Quiz Gap',
    },
    {
      id: 'todo-cert-3',
      title: 'Professional Frontend & React Performance Specialist',
      issuer: 'Meta Authorized Partner',
      skills: ['Next.js 15', 'Render Optimization', 'Web Workers', 'SSR'],
      matchScore: 86,
      weaknessAddressed: 'Browser rendering pipeline and memory profiling in React courses',
      estimatedHours: 30,
      badge: 'Coursework Capstone',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-emerald-800 shadow-2xl animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.certificates}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sample learning records to demonstrate the certificate UI. These are not official or externally verified credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span>2 Sample Records</span>
          </span>
        </div>
      </div>

      {/* Sample learning-record cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {sampleCertificates.map((cert) => {
          const linkedInPostUrl = getLinkedInShareUrl(cert);

          return (
            <div
              key={cert.id}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      {cert.title}
                    </h2>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Sample ID: {cert.credentialId}
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                  Demo
                </span>
              </div>

              <div className="text-xs text-slate-600">
                Example issuer: <strong className="text-slate-800">{cert.issuer}</strong> · sample date {cert.issueDate}.
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions with prominent LinkedIn redirect & download & share */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    View Sample Record
                  </button>

                  {/* Direct LinkedIn Post Button */}
                  <a
                    href={linkedInPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showToast('Redirecting to LinkedIn share composer...')}
                    className="flex items-center gap-1.5 rounded-xl bg-[#0A66C2] px-3.5 py-2.5 text-xs font-bold text-white hover:bg-[#004182] transition-colors shadow-xs"
                    title="Share a note about this sample record"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                    <span>Share Demo</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  {/* Copy a note explaining that this is sample content */}
                  <button
                    onClick={() => handleCopyShareText(cert)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Copy sample-record note"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>

                  {/* Direct mock file download */}
                  <button
                    onClick={() => handleDownloadCertificate(cert)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    title="Download sample learning record"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>

  
              </div>
            </div>
          );
        })}
      </div>

      {/* Static example suggestions; scores are illustrative, not personalized assessment results. */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Target className="h-3.5 w-3.5" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Example Certification Suggestions
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              These examples and match scores are static demo content, not results from a personal skills assessment.
            </p>
          </div>

          <span className="self-start sm:self-auto rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-700">
            3 Example Suggestions
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {todoCertifications.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-600">
                  Sample score: {item.matchScore}%
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="text-[11px] text-slate-500 mt-1">
                  Example provider: {item.issuer} · ~{item.estimatedHours}h study estimate
                </div>
              </div>

              {/* Weakness addressed pill */}
              <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-700 border border-slate-100">
                <span className="font-bold text-indigo-900 block mb-0.5">Example topic to review:</span>
                <span>{item.weaknessAddressed}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {item.skills.map((s) => (
                  <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-2 mt-auto">
                <button
                  onClick={() => showToast('This is a sample suggestion. Course enrollment is not connected in this prototype.')}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>View Suggestion</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 border-8 border-indigo-950/10 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Certificate Canvas Mock */}
            <div className="rounded-2xl border-4 border-double border-amber-600/40 p-6 sm:p-8 text-center space-y-4 bg-gradient-to-b from-amber-50/20 to-white shadow-inner">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Award className="h-8 w-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                  Sample learning record · demo only
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedCert.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600">
                Example record for
              </p>

              <div className="text-lg font-bold text-indigo-900 border-b-2 border-indigo-600 inline-block px-6 pb-1">
                {user.name}
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                This record demonstrates the sample certificate interface. It does not confirm course completion or external assessment results.
              </p>

              <div className="flex justify-between items-end pt-6 border-t border-slate-200 text-xs">
                <div className="text-left">
                  <div className="font-mono text-[10px] text-slate-400">ID: {selectedCert.credentialId}</div>
                  <div className="text-[11px] text-slate-600 font-semibold">{selectedCert.issueDate}</div>
                </div>
                <div className="flex items-center gap-1.5 text-amber-800 font-semibold text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>Sample Record</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500">
                Example issuer: <span className="font-semibold text-slate-700">{selectedCert.issuer}</span>. This is sample data.
              </div>

              <div className="flex items-center gap-2">
                {/* Sharing explains that this is sample content, not a real credential. */}
                <a
                  href={getLinkedInShareUrl(selectedCert)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => showToast('Redirecting to LinkedIn...')}
                  className="flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white hover:bg-[#004182] transition-colors shadow-xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                  <span>Share Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  onClick={() => handleCopyShareText(selectedCert)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  title="Copy a note about this sample record"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Copy Demo Note</span>
                </button>

                <button
                  onClick={() => handleDownloadCertificate(selectedCert)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
