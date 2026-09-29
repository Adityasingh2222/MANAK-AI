'use client';

import React, { useState } from 'react';
import { UtilityBar } from '@/components/UtilityBar';
import { GovernmentHeader } from '@/components/GovernmentHeader';
import { Language } from '@/lib/i18n';
import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<number>(15);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : 'bg-slate-50 text-slate-900'}`}
    >
      {/* Top Utility Bar */}
      <UtilityBar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Main Government Header with Global Search and Navigation */}
      <GovernmentHeader currentLang={currentLang} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Government-Grade Footer */}
      <footer className="w-full bg-gov-navy text-slate-300 border-t-4 border-gov-saffron mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-white text-gov-navy flex items-center justify-center font-black text-sm">
                  M
                </div>
                <span className="text-lg font-bold text-white tracking-tight">MANAK-AI</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Understand Standards. Verify Products. Build with Confidence.
              </p>
              <div className="text-[11px] text-amber-300 font-mono">
                Smart India Hackathon 2026 | SIH26107<br />
                Team: RushLiners
              </div>
            </div>

            {/* Col 2: Core Workflows */}
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">Core Workflows</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/scan" className="hover:text-white transition-colors">Multimodal Product Scanner</Link></li>
                <li><Link href="/copilot" className="hover:text-white transition-colors">AI Standards Copilot</Link></li>
                <li><Link href="/standards" className="hover:text-white transition-colors">Know Your Standard Catalog</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance Readiness Engine</Link></li>
                <li><Link href="/labs" className="hover:text-white transition-colors">Geospatial Lab Finder</Link></li>
              </ul>
            </div>

            {/* Col 3: Citizen & MSME Services */}
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">Citizen & Industry</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/verify" className="hover:text-white transition-colors">ISI / HUID / CRS Verification</Link></li>
                <li><Link href="/consumer" className="hover:text-white transition-colors">Consumer Complaint Assistant</Link></li>
                <li><Link href="/msme" className="hover:text-white transition-colors">MSME Certification Wizard</Link></li>
                <li><Link href="/updates" className="hover:text-white transition-colors">Gazette & QCO Watchdog</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Source Transparency Centre</Link></li>
              </ul>
            </div>

            {/* Col 4: Trust & Transparency Disclaimer */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">Important Disclaimer</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                MANAK-AI is built for the Smart India Hackathon 2026 prototype demonstration. In DEMO MODE, simulated datasets are clearly labelled. It connects to authoritative BIS publications for research and compliance guidance without fabricating official certifications.
              </p>
              <div className="flex items-center space-x-2 pt-1 text-slate-400 text-xs">
                <Link href="/admin" className="hover:text-white underline">Admin Portal</Link>
                <span>•</span>
                <Link href="/admin/audit" className="hover:text-white underline">Audit Trail</Link>
                <span>•</span>
                <Link href="/admin/evaluation" className="hover:text-white underline">RAG Metrics</Link>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3 text-slate-500 text-[11px]">
            <div>
              © 2026 MANAK-AI — Built for Smart India Hackathon (SIH26107). Powered by Deep Grounded RAG.
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 flex items-center gap-1">
                <span>BIS Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.nabl-india.org" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 flex items-center gap-1">
                <span>NABL Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
