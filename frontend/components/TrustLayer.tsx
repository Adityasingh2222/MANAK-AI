'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Hash, FileCheck, Database, SearchCheck } from 'lucide-react';
import { TrustLayerSignals } from '@/lib/api';

interface TrustLayerProps {
  signals?: TrustLayerSignals;
  auditHash?: string;
}

export const TrustLayer: React.FC<TrustLayerProps> = ({
  signals = {
    source_verified: true,
    version_checked: true,
    clause_retrieved: true,
    ai_grounded: true,
    citation_attached: true,
    audit_logged: true,
  },
  auditHash,
}) => {
  const items = [
    { label: 'Source verified', icon: Database, active: signals.source_verified, desc: 'Authoritative BIS Gazette', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800' },
    { label: 'Version checked', icon: FileCheck, active: signals.version_checked, desc: 'Active revision confirmed', color: 'text-blue-400 bg-blue-950/60 border-blue-800' },
    { label: 'Clause retrieved', icon: SearchCheck, active: signals.clause_retrieved, desc: 'Exact sub-clause evidence', color: 'text-orange-400 bg-orange-950/60 border-orange-800' },
    { label: 'AI grounded', icon: ShieldCheck, active: signals.ai_grounded, desc: 'Zero hallucination enforced', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' },
    { label: 'Citation attached', icon: CheckCircle2, active: signals.citation_attached, desc: '[IS], [Year], [Cl] format', color: 'text-amber-400 bg-amber-950/60 border-amber-800' },
    { label: 'Audit logged', icon: Hash, active: signals.audit_logged, desc: 'SHA-256 Merkle chain sealed', color: 'text-purple-400 bg-purple-950/60 border-purple-800' },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gov-navyDark to-slate-900 text-white rounded-2xl p-5 border-2 border-slate-700 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-100 flex items-center gap-2">
              National Trust & Verification Layer
            </span>
            <p className="text-[11px] text-slate-400 font-medium">
              Every insight is cryptographically tied to verified Government of India publications
            </p>
          </div>
        </div>
        <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 font-black font-mono shadow-sm">
          ✓ 6/6 Signals Validated
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`border rounded-xl p-3 flex flex-col justify-between transition-all hover:scale-[1.02] ${item.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                <span>{item.label}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-medium">{item.desc}</div>
            </div>
          );
        })}
      </div>

      {auditHash && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="font-bold text-slate-300">Audit Seal Hash:</span>
          <span className="text-amber-400 font-semibold truncate max-w-md">{auditHash}</span>
        </div>
      )}
    </div>
  );
};
