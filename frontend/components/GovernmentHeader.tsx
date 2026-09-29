'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bot, 
  Camera, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Compass, 
  Activity, 
  Building2, 
  Scale, 
  Bell, 
  BookOpen, 
  Lock,
  Sparkles
} from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface GovernmentHeaderProps {
  currentLang: Language;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ currentLang }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[currentLang];

  const navLinks = [
    { href: '/', label: t.nav_home, icon: ShieldCheck, iconColor: 'text-emerald-400' },
    { href: '/copilot', label: t.nav_copilot, icon: Bot, iconColor: 'text-amber-400', highlight: true },
    { href: '/scan', label: t.nav_scan, icon: Camera, iconColor: 'text-cyan-400', highlight: true },
    { href: '/standards', label: t.nav_standards, icon: FileText, iconColor: 'text-orange-400' },
    { href: '/compliance', label: t.nav_compliance, icon: CheckCircle2, iconColor: 'text-emerald-400' },
    { href: '/labs', label: t.nav_labs, icon: Compass, iconColor: 'text-sky-400' },
    { href: '/verify', label: t.nav_verify, icon: Activity, iconColor: 'text-rose-400' },
    { href: '/consumer', label: t.nav_consumer, icon: Scale, iconColor: 'text-purple-400' },
    { href: '/updates', label: t.nav_updates, icon: Bell, iconColor: 'text-yellow-400' },
    { href: '/resources', label: t.nav_resources, icon: BookOpen, iconColor: 'text-teal-400' },
    { href: '/admin', label: t.nav_admin, icon: Lock, iconColor: 'text-slate-300' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/standards?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white border-b-2 border-amber-500/30 shadow-md sticky top-0 z-50">
      {/* Main Branding & Global Action Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & National Portal Identity */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gov-navyDark via-gov-navy to-blue-900 text-white flex items-center justify-center font-black text-2xl shadow-lg border-2 border-amber-400 group-hover:border-[#FF671F] transition-all transform group-hover:scale-105">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">M</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gov-navy via-blue-900 to-indigo-950 bg-clip-text text-transparent">
                  MANAK-AI
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm uppercase tracking-wide">
                  BIS Grounded
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold hidden sm:flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                {t.brand_sub}
              </p>
            </div>
          </Link>

          {/* Prominent Global Search with National Theme */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search IS 16102, HUID, CM/L, QCO, or product..."
                className="w-full pl-9 pr-24 py-2 text-sm bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-800 shadow-inner"
              />
              <Search className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-bold rounded shadow transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick AI & Camera Scan Buttons with Vivid National Theme */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/copilot"
              className="flex items-center space-x-1.5 bg-gradient-to-r from-gov-navy to-blue-900 hover:from-blue-900 hover:to-indigo-900 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all border border-blue-400/40"
            >
              <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI Copilot</span>
            </Link>

            <Link
              href="/scan"
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all border border-emerald-400/40"
            >
              <Camera className="w-4 h-4 text-emerald-200" />
              <span>Scan Product</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-gov-navy hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Government Navigation Bar with Colored Icons */}
      <nav className="bg-gradient-to-r from-gov-navyDark via-gov-navy to-blue-950 text-white text-sm font-medium border-t-2 border-amber-500 hidden lg:block shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 py-1.5 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-semibold whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF671F] to-orange-600 text-white font-black shadow-md shadow-orange-900/30'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : link.iconColor}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-gov-navyDark to-blue-950 border-t-2 border-amber-500 px-4 pt-3 pb-6 space-y-1">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search standards or products..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-900 text-white border border-amber-500/50 rounded-md focus:outline-none"
              />
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-2.5" />
            </div>
          </form>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-semibold ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF671F] to-orange-600 text-white font-bold'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : link.iconColor}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
