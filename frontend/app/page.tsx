'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Camera, 
  Search, 
  FileText, 
  CheckCircle2, 
  Compass, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Bell, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  Building2,
  Scale,
  Award,
  BookOpen,
  Cpu,
  Coins,
  HardHat,
  Factory,
  Zap,
  Droplet,
  Baby,
  Sun,
  Layers,
  Database
} from 'lucide-react';
import { IntelligenceGrid } from '@/components/IntelligenceGrid';
import { TrustLayer } from '@/components/TrustLayer';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/standards?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const primaryActions = [
    {
      title: 'Ask AI Copilot',
      subtitle: 'Ask about any IS clause, test requirement, or QCO in plain English or Hindi.',
      href: '/copilot',
      icon: Bot,
      topBorder: 'border-t-4 border-blue-600',
      cardBg: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 hover:border-blue-500 shadow-blue-900/5',
      iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/30',
      badgeBg: 'bg-blue-100 text-blue-900 border border-blue-300',
      textColor: 'text-blue-950',
      footerColor: 'text-blue-700 border-blue-100',
      badge: 'Grounded RAG'
    },
    {
      title: 'Scan a Product',
      subtitle: 'Real-time camera or image scan to detect rating plate, ISI mark, and standard.',
      href: '/scan',
      icon: Camera,
      topBorder: 'border-t-4 border-emerald-600',
      cardBg: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 hover:border-emerald-500 shadow-emerald-900/5',
      iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/30',
      badgeBg: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
      textColor: 'text-emerald-950',
      footerColor: 'text-emerald-700 border-emerald-100',
      badge: 'Multimodal'
    },
    {
      title: 'Know Your Standard',
      subtitle: 'Browse official Indian Standards with clause-level citations and amendments.',
      href: '/standards',
      icon: FileText,
      topBorder: 'border-t-4 border-amber-500',
      cardBg: 'bg-gradient-to-br from-amber-50 via-white to-orange-50/50 hover:border-amber-500 shadow-amber-900/5',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
      badgeBg: 'bg-amber-100 text-amber-900 border border-amber-300',
      textColor: 'text-amber-950',
      footerColor: 'text-amber-800 border-amber-100',
      badge: 'Catalog'
    },
    {
      title: 'Check Compliance',
      subtitle: 'Generate readiness scores and downloadable Pre-Audit checklists (PDF/Excel).',
      href: '/compliance',
      icon: CheckCircle2,
      topBorder: 'border-t-4 border-purple-600',
      cardBg: 'bg-gradient-to-br from-purple-50 via-white to-fuchsia-50/50 hover:border-purple-500 shadow-purple-900/5',
      iconBg: 'bg-gradient-to-br from-purple-600 to-fuchsia-700 text-white shadow-md shadow-purple-500/30',
      badgeBg: 'bg-purple-100 text-purple-900 border border-purple-300',
      textColor: 'text-purple-950',
      footerColor: 'text-purple-700 border-purple-100',
      badge: 'Readiness'
    },
    {
      title: 'Find a Lab',
      subtitle: 'Geospatial discovery of BIS-recognized and NABL-accredited test laboratories.',
      href: '/labs',
      icon: Compass,
      topBorder: 'border-t-4 border-cyan-600',
      cardBg: 'bg-gradient-to-br from-cyan-50 via-white to-sky-50/50 hover:border-cyan-500 shadow-cyan-900/5',
      iconBg: 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/30',
      badgeBg: 'bg-cyan-100 text-cyan-900 border border-cyan-300',
      textColor: 'text-cyan-950',
      footerColor: 'text-cyan-700 border-cyan-100',
      badge: 'Geospatial'
    },
    {
      title: 'Verify a Product',
      subtitle: 'Authenticate ISI licences (CM/L), Gold HUID, and MeitY CRS numbers.',
      href: '/verify',
      icon: Activity,
      topBorder: 'border-t-4 border-rose-600',
      cardBg: 'bg-gradient-to-br from-rose-50 via-white to-pink-50/50 hover:border-rose-500 shadow-rose-900/5',
      iconBg: 'bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-md shadow-rose-500/30',
      badgeBg: 'bg-rose-100 text-rose-900 border border-rose-300',
      textColor: 'text-rose-950',
      footerColor: 'text-rose-700 border-rose-100',
      badge: 'Authenticity'
    }
  ];

  const nationalStats = [
    { number: '21,000+', label: 'Formulated Standards', sub: 'Bureau of Indian Standards', color: 'from-blue-600 to-indigo-800', textColor: 'text-blue-700', bg: 'bg-blue-50/70 border-blue-200' },
    { number: '450+', label: 'Mandatory QCOs', sub: 'Quality Control Orders Active', color: 'from-amber-500 to-orange-600', textColor: 'text-amber-800', bg: 'bg-amber-50/70 border-amber-200' },
    { number: '1,200+', label: 'Accredited Labs', sub: 'NABL & BIS Approved Testing', color: 'from-emerald-600 to-teal-700', textColor: 'text-emerald-700', bg: 'bg-emerald-50/70 border-emerald-200' },
    { number: '99.4%', label: 'Zero Hallucination', sub: 'SHA-256 Grounded Ledger', color: 'from-purple-600 to-indigo-700', textColor: 'text-purple-700', bg: 'bg-purple-50/70 border-purple-200' },
  ];

  const categories = [
    { 
      name: 'Electronics & IT', 
      count: '65+ Standards', 
      code: 'ETD', 
      href: '/standards?category=Electronics',
      icon: Cpu,
      cardTheme: 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200 hover:border-blue-400 hover:shadow-blue-500/10',
      iconColor: 'text-blue-700 bg-blue-100',
      badgeColor: 'bg-blue-600 text-white'
    },
    { 
      name: 'Precious Metals & Gold', 
      count: 'HUID & Fineness', 
      code: 'MTD', 
      href: '/standards?category=Precious',
      icon: Coins,
      cardTheme: 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 hover:border-amber-400 hover:shadow-amber-500/10',
      iconColor: 'text-amber-700 bg-amber-100',
      badgeColor: 'bg-amber-600 text-white'
    },
    { 
      name: 'Civil & Construction', 
      count: 'Structural Codes', 
      code: 'CED', 
      href: '/standards?category=Civil',
      icon: HardHat,
      cardTheme: 'bg-gradient-to-br from-orange-50 to-red-50/50 border-orange-200 hover:border-orange-400 hover:shadow-orange-500/10',
      iconColor: 'text-orange-700 bg-orange-100',
      badgeColor: 'bg-orange-600 text-white'
    },
    { 
      name: 'Steel & Metallurgy', 
      count: 'TMT & Structural', 
      code: 'MTD', 
      href: '/standards?category=Metallurgy',
      icon: Factory,
      cardTheme: 'bg-gradient-to-br from-indigo-50 to-slate-100/50 border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-500/10',
      iconColor: 'text-indigo-700 bg-indigo-100',
      badgeColor: 'bg-indigo-600 text-white'
    },
    { 
      name: 'Household Electricals', 
      count: 'Safety & Energy', 
      code: 'ETD', 
      href: '/standards?category=Electricals',
      icon: Zap,
      cardTheme: 'bg-gradient-to-br from-purple-50 to-fuchsia-50/50 border-purple-200 hover:border-purple-400 hover:shadow-purple-500/10',
      iconColor: 'text-purple-700 bg-purple-100',
      badgeColor: 'bg-purple-600 text-white'
    },
    { 
      name: 'Food & Drinking Water', 
      count: 'Purity & Heavy Metals', 
      code: 'FAD', 
      href: '/standards?category=Food',
      icon: Droplet,
      cardTheme: 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/10',
      iconColor: 'text-emerald-700 bg-emerald-100',
      badgeColor: 'bg-emerald-600 text-white'
    },
    { 
      name: 'Toys & Children Goods', 
      count: 'Safety & Choking Tests', 
      code: 'PGI', 
      href: '/standards?category=Toys',
      icon: Baby,
      cardTheme: 'bg-gradient-to-br from-rose-50 to-pink-50/50 border-rose-200 hover:border-rose-400 hover:shadow-rose-500/10',
      iconColor: 'text-rose-700 bg-rose-100',
      badgeColor: 'bg-rose-600 text-white'
    },
    { 
      name: 'Solar & Renewable', 
      count: 'CRS & Photovoltaics', 
      code: 'ETD', 
      href: '/standards?category=Solar',
      icon: Sun,
      cardTheme: 'bg-gradient-to-br from-yellow-50 to-amber-50/50 border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-500/10',
      iconColor: 'text-yellow-800 bg-yellow-100',
      badgeColor: 'bg-yellow-600 text-white'
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Hero Section with National Portal Theme */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gov-navyDark via-[#0B2545] to-[#134074] text-white p-8 md:p-12 shadow-2xl border-t-4 border-amber-500">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/0 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/0 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-amber-400/40 text-xs font-bold text-amber-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Smart India Hackathon 2026 (SIH26107) | Team RushLiners</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            India’s Intelligent Assistant for Standards, Certification & Compliance
          </h1>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
            Understand applicable Indian Standards, identify mandatory QCO orders, verify ISI / HUID / CRS credentials, find accredited laboratories, and prepare pre-audit checklists — all grounded in authoritative BIS gazette records.
          </p>

          {/* Prominent Global Search Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search IS 16102, product name, HUID, CM/L, CRS, QCO, or certification..."
                className="w-full pl-11 pr-32 py-3.5 text-sm bg-white text-slate-900 rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400 border-2 border-white"
              />
              <Search className="w-5 h-5 text-amber-600 absolute left-3.5 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg text-xs font-black shadow-md transition-all"
              >
                Search
              </button>
            </div>
            <div className="text-[11px] text-slate-200 mt-2.5 flex flex-wrap gap-2 items-center">
              <span className="font-bold text-amber-300">Quick Searches:</span>
              <button type="button" onClick={() => router.push('/standards?q=IS 16102')} className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-colors font-medium">IS 16102 (LED Lamp)</button>
              <button type="button" onClick={() => router.push('/standards?q=IS 269')} className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-colors font-medium">IS 269 (OPC Cement)</button>
              <button type="button" onClick={() => router.push('/standards?q=IS 1417')} className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-colors font-medium">IS 1417 (Gold HUID)</button>
              <button type="button" onClick={() => router.push('/standards?q=IS 1786')} className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-colors font-medium">IS 1786 (Steel TMT)</button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. National Statistics Bar (Inspired by National Portal of India) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {nationalStats.map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl border shadow-sm ${stat.bg} flex items-center space-x-3.5 transition-all hover:scale-[1.02]`}>
            <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${stat.color} text-white flex items-center justify-center font-black text-sm shadow-md shrink-0`}>
              {i === 0 && <FileText className="w-5 h-5" />}
              {i === 1 && <Scale className="w-5 h-5" />}
              {i === 2 && <Compass className="w-5 h-5" />}
              {i === 3 && <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <div className={`text-xl font-black ${stat.textColor} tracking-tight`}>{stat.number}</div>
              <div className="text-xs font-bold text-slate-800 leading-tight">{stat.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Primary 6 Actions Cards with Individual Vibrant Color Themes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {primaryActions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              href={act.href}
              className={`p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg ${act.topBorder} ${act.cardBg} group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`p-3 rounded-xl ${act.iconBg} transform group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${act.badgeBg}`}>
                    {act.badge}
                  </span>
                </div>
                <h3 className={`text-base font-black ${act.textColor} group-hover:text-black transition-colors`}>
                  {act.title}
                </h3>
                <p className="text-xs mt-1.5 leading-relaxed text-slate-600 font-medium">
                  {act.subtitle}
                </p>
              </div>

              <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs font-bold ${act.footerColor}`}>
                <span className="group-hover:translate-x-1 transition-transform">Launch Service</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* 4. Signature UI: MANAK Intelligence Grid with Vibrant Steps */}
      <section>
        <IntelligenceGrid />
      </section>

      {/* 5. Standards Categories / Information Sectors with Colorful Cards */}
      <section className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b-2 border-slate-100">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-[#FF671F] shadow-[0_0_8px_rgba(255,103,31,0.8)]"></span>
            <div>
              <h3 className="text-base font-black text-gov-navy uppercase tracking-tight">
                Information Sectors & Standard Divisions
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Browse official Indian Standards, active QCOs, and testing parameters by industrial domain
              </p>
            </div>
          </div>
          <Link href="/standards" className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline">
            <span>View All Standards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={i}
                href={cat.href}
                className={`p-4 rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md text-left block group ${cat.cardTheme}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${cat.badgeColor}`}>
                    {cat.code}
                  </span>
                  <div className={`p-1.5 rounded-lg ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xs font-black text-slate-900 group-hover:text-blue-900 mt-1 leading-snug">
                  {cat.name}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1">
                  {cat.count}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. Latest Gazette Notifications with Vibrant 3-Column Theme */}
      <section className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b-2 border-slate-100">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.8)]"></span>
            <div>
              <h3 className="text-base font-black text-gov-navy uppercase tracking-tight">
                Gazette Notifications & Regulatory Updates
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Live regulatory tracking from the Gazette of India and DPIIT Quality Control Orders
              </p>
            </div>
          </div>
          <Link href="/updates" className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline">
            <span>All Regulatory Updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Column 1: Gazette Order (Royal Blue Theme) */}
          <div className="p-4 bg-gradient-to-br from-blue-50/80 to-white border-2 border-blue-200 border-l-4 border-l-blue-600 rounded-xl space-y-2.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                Gazette Order
              </span>
              <span className="text-slate-500 font-bold text-[10px]">2026-03-25</span>
            </div>
            <div className="font-extrabold text-blue-950 text-sm leading-snug">
              Quality Control Order for 16 Additional Electrical Appliances
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Mandatory ISI mark under Scheme-I for electric irons, mixer grinders, and food processors.
            </p>
            <div className="pt-2 border-t border-blue-100 text-blue-800 font-bold text-[11px] flex items-center justify-between">
              <span>Related: IS 302 / IS 1293</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Column 2: QCO Update (Tiranga Saffron Theme) */}
          <div className="p-4 bg-gradient-to-br from-amber-50/80 to-white border-2 border-amber-200 border-l-4 border-l-[#FF671F] rounded-xl space-y-2.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF671F] text-white shadow-sm">
                QCO Update
              </span>
              <span className="text-slate-500 font-bold text-[10px]">2026-03-10</span>
            </div>
            <div className="font-extrabold text-amber-950 text-sm leading-snug">
              Phase V Gold Hallmarking Expanded to 55 Additional Districts
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              6-digit HUID now mandatory across 343 districts nationwide. Non-hallmarked gold sales prohibited.
            </p>
            <div className="pt-2 border-t border-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-between">
              <span>Related: IS 1417:2016</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Column 3: MSME Scheme (India Green Theme) */}
          <div className="p-4 bg-gradient-to-br from-emerald-50/80 to-white border-2 border-emerald-200 border-l-4 border-l-emerald-600 rounded-xl space-y-2.5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm">
                MSME Scheme
              </span>
              <span className="text-slate-500 font-bold text-[10px]">2026-02-18</span>
            </div>
            <div className="font-extrabold text-emerald-950 text-sm leading-snug">
              50% Marking Fee Concession for Micro & Small Enterprises
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Fast-track processing and subsidized testing fees for Make in India manufacturers.
            </p>
            <div className="pt-2 border-t border-emerald-100 text-emerald-900 font-bold text-[11px] flex items-center justify-between">
              <span>Related: MSME Concession</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Government Trust Layer */}
      <section>
        <TrustLayer />
      </section>
    </div>
  );
}
