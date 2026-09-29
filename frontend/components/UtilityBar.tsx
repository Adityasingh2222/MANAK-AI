'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, HelpCircle, Globe, ZoomIn, ZoomOut, Contrast } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface UtilityBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UtilityBar: React.FC<UtilityBarProps> = ({
  currentLang,
  onLanguageChange,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
}) => {
  const t = translations[currentLang];

  return (
    <div className="w-full">
      {/* Official National Portal of India Tricolor Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-[#FFFFFF] to-[#046A38] shadow-sm" />

      {/* Top Bar with Deep Navy Background */}
      <div className={`w-full text-xs border-b ${highContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-gov-navy text-slate-200 border-gov-blue'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap justify-between items-center gap-2">
          {/* Government Emblem Text & Portal Indicator */}
          <div className="flex items-center space-x-3">
            <span className="font-semibold tracking-wide flex items-center gap-1.5 text-white">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF671F] shadow-[0_0_8px_rgba(255,103,31,0.8)]"></span>
              {t.portal_title}
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-amber-300 font-medium hidden md:inline">
              Smart India Hackathon 2026 (SIH26107) — Team RushLiners
            </span>
          </div>

          {/* Accessibility, Font Resize, Contrast, Language Selector */}
          <div className="flex items-center space-x-4">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:px-2 focus:py-1 focus:bg-yellow-400 focus:text-black rounded">
              {t.skip_content}
            </a>

            {/* Text Size Controls */}
            <div className="flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              <button
                onClick={() => setFontSize(Math.max(13, fontSize - 1))}
                title="Decrease Font Size"
                aria-label="Decrease Font Size"
                className="px-1 text-slate-300 hover:text-amber-400 font-bold"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(15)}
                title="Reset Font Size"
                aria-label="Reset Font Size"
                className="px-1 text-slate-300 hover:text-white"
              >
                A
              </button>
              <button
                onClick={() => setFontSize(Math.min(18, fontSize + 1))}
                title="Increase Font Size"
                aria-label="Increase Font Size"
                className="px-1 text-slate-300 hover:text-amber-400 font-bold"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              title="Toggle High Contrast"
              aria-label="Toggle High Contrast"
              className="flex items-center space-x-1 hover:text-amber-300 cursor-pointer px-1 py-0.5 rounded"
            >
              <Contrast className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Contrast</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                aria-label="Select Language"
                className="bg-slate-800 text-slate-100 border border-amber-500/50 rounded px-2 py-0.5 text-xs focus:ring-1 focus:ring-amber-400 outline-none font-medium"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="hi-en">Hinglish</option>
              </select>
            </div>

            <Link href="/resources" className="hidden lg:flex items-center space-x-1 hover:text-amber-300">
              <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
              <span>{t.help}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
