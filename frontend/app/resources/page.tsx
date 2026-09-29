'use client';

import React from 'react';
import { BookOpen, ExternalLink, Database, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export default function ResourcesPage() {
  const sources = [
    {
      authority: 'Bureau of Indian Standards (BIS)',
      portal: 'Manakonline Portal (e-BIS)',
      url: 'https://www.manakonline.in',
      scope: 'Standard Formulation, ISI Licences, CRS Registration, Hallmarking',
      status: 'Connected Source Model (Simulated in Demo Mode)',
      type: 'Statutory National Standards Body'
    },
    {
      authority: 'Ministry of Commerce & Industry (DPIIT)',
      portal: 'e-Gazette of India',
      url: 'https://egazette.gov.in',
      scope: 'Quality Control Orders (QCO) Gazette Notifications',
      status: 'Statutory Gazette Feed',
      type: 'Government Gazette Publications'
    },
    {
      authority: 'National Accreditation Board for Testing (NABL)',
      portal: 'NABL India Directory',
      url: 'https://www.nabl-india.org',
      scope: 'Laboratory Accreditation Status & Scope of Testing (ISO/IEC 17025)',
      status: 'NABL Directory Registry',
      type: 'Conformity Assessment Board'
    },
    {
      authority: 'Ministry of Consumer Affairs',
      portal: 'National Consumer Helpline (NCH)',
      url: 'https://consumerhelpline.gov.in',
      scope: 'Consumer Rights under BIS Act 2016 & Redressal Mechanism',
      status: 'Consumer Advisory Service',
      type: 'Central Consumer Protection Authority'
    },
    {
      authority: 'Ministry of Electronics and Information Technology (MeitY)',
      portal: 'MeitY CRS Portal',
      url: 'https://www.crsbis.in',
      scope: 'Compulsory Registration Scheme for Electronics & IT Goods',
      status: 'CRS Database',
      type: 'Regulatory Framework'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Source Transparency Centre</h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete attribution and traceability of authoritative data sources, gazette links, and conformity assessment portals referenced across MANAK-AI.
        </p>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src, i) => (
          <div key={i} className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {src.type}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Verified Source
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 mt-2">
                {src.authority}
              </h3>
              <div className="text-xs font-semibold text-gov-navy mt-0.5">{src.portal}</div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                <b>Scope & Mandate:</b> {src.scope}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">{src.status}</span>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-gov-navy hover:bg-gov-blue text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
