import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Compass,
  Trophy,
  Zap,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../i18n/translations';

export const LoginPage: React.FC = () => {
  const { loginAsDemoUser, loginAsGuest, setCurrentRoute, t, currentLang, setLanguage } = useApp();

  // Primary list: Only 'email' and 'phone' (Google is in dedicated rectangular box below!)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const validateEmail = () => {
    const errs: { [key: string]: string } = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please provide a valid Gmail or college email address';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePhone = () => {
    const errs: { [key: string]: string } = {};
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (otpSent && (!otp || otp.length !== 6)) {
      errs.otp = 'Please enter the 6-digit OTP code (demo: 123456)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginAsDemoUser('Alex Chen (Google User)', 'Intermediate');
    }, 450);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const rawName = email.split('@')[0].replace(/[._-]/g, ' ');
      const formatted = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      loginAsDemoUser(formatted || 'Alex Chen', 'Intermediate');
    }, 450);
  };

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      setErrors({ phone: 'Please enter a valid 10-digit phone number' });
      return;
    }
    setErrors({});
    setOtpSent(true);
    setOtp('123456'); // autofill demo code for effortless testing
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginAsDemoUser(`Student (${phoneNumber.slice(-4)})`, 'Intermediate');
    }, 450);
  };

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'te', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Vibrant Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-violet-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-amber-500/20 blur-[150px]" />

      {/* Top Header with Brand and Language Selector */}
      <header className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 text-white font-extrabold text-xl shadow-lg shadow-indigo-500/30">
            SI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white leading-tight">
                Smart Intern
              </span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                Track 2026
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Smart Education Open Innovation
            </span>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-md shadow-xs"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span>{languages.find((l) => l.code === currentLang)?.flag}</span>
            <span className="hidden sm:inline">
              {languages.find((l) => l.code === currentLang)?.label || 'English'}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-slate-700 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
              <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Language / भाषा
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                    currentLang === l.code
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {currentLang === l.code && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Interactive Login Section */}
      <div className="relative z-10 mx-auto w-full max-w-md my-auto py-2">
        <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-slate-100">
          {/* Decorative Corner Badge */}
          <div className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shadow-md">
            <Sparkles className="h-3 w-3" />
            <span>AI Adaptive Cohort</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-6 pt-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Sign In to Smart Intern
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Master DSA, System Design & crack top placement rounds.
            </p>
          </div>

          {/* Primary Sign-in Options: ONLY Gmail / Email & Phone (OTP) */}
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-800/70 p-1 mb-5 text-xs font-semibold border border-slate-700/60">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('email');
                setErrors({});
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
                authMethod === 'email'
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Gmail / Email</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone');
                setErrors({});
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 transition-all ${
                authMethod === 'phone'
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>Phone (OTP)</span>
            </button>
          </div>

          {/* Method 1: Gmail / Email & Password */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address / College Gmail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl border bg-slate-950/60 py-2.5 pl-10 pr-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-500/80 bg-rose-950/20'
                        : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-xl border bg-slate-950/60 py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                      errors.password
                        ? 'border-rose-500/80 bg-rose-950/20'
                        : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In with Email'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Method 2: Phone Number with OTP */}
          {authMethod === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full rounded-xl border bg-slate-950/60 py-2.5 pl-10 pr-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-rose-500/80 bg-rose-950/20'
                        : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
                >
                  Send 6-Digit OTP
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        Enter 6-Digit OTP
                      </label>
                      <span className="text-[10px] text-indigo-400 font-mono">Demo: 123456</span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 px-3 text-center font-mono text-base tracking-widest text-emerald-400 focus:border-indigo-500 focus:outline-none font-bold"
                    />
                    {errors.otp && (
                      <p className="mt-1.5 text-[11px] text-rose-400">{errors.otp}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-900 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Dedicated rectangular "Sign in with Google" button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 py-3.5 px-4 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 hover:border-slate-500 hover:shadow-indigo-500/10 cursor-pointer"
          >
            <svg className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting Google Account...' : 'Sign in with Google'}</span>
          </button>

          {/* Dedicated Guest / Demo Student Access Button */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2.5">
            <button
              type="button"
              onClick={loginAsGuest}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 py-3 text-xs font-bold text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition-all shadow-xs cursor-pointer group"
            >
              <UserCheck className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Explore as Guest / Demo Student</span>
            </button>
            <p className="text-center text-[10px] text-slate-500">
              Browse the platform in demo mode without creating an account.
            </p>

            <button
              type="button"
              onClick={() => setCurrentRoute('onboarding')}
              className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-indigo-400 py-1 transition-colors"
            >
              New here? Start 4-Step Adaptive Diagnostic →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mx-auto w-full max-w-5xl text-center text-xs text-slate-500 pt-3">
        © 2026 Smart Intern · Smart Education Open Innovation Track · Verified Placement Prep
      </footer>
    </div>
  );
};
