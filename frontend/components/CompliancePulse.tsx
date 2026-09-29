'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Stage {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
}

export const CompliancePulse: React.FC = () => {
  const stages: Stage[] = [
    { id: 'product', title: 'Product Identified', status: 'completed', timestamp: '2026-03-28' },
    { id: 'standard', title: 'Standard Mapped (IS 16102)', status: 'completed', timestamp: '2026-03-28' },
    { id: 'qco', title: 'QCO Checked (Mandatory)', status: 'completed', timestamp: '2026-03-29' },
    { id: 'tests', title: '5 Tests Mapped', status: 'completed', timestamp: '2026-03-29' },
    { id: 'lab', title: 'Lab Selected (ERDA)', status: 'active', timestamp: 'Sample Dispatched' },
    { id: 'docs', title: 'Quality Manual & SIT', status: 'pending', timestamp: 'In Preparation' },
    { id: 'cert', title: 'BIS Portal Application', status: 'pending', timestamp: 'Awaiting Report' },
    { id: 'verify', title: 'Grant of ISI Licence', status: 'pending', timestamp: 'Final Step' },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gov-border shadow-sm p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-saffron"></span>
            <h3 className="text-base font-bold text-gov-navy tracking-tight uppercase">
              Compliance Pulse Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active tracking of manufacturer compliance workflow from classification to certification
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
          Stage 5 of 8 Active
        </span>
      </div>

      {/* Horizontal / Wrapped Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
        {stages.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isActive = stage.status === 'active';
          return (
            <div
              key={stage.id}
              className={`p-3 rounded-lg border text-left flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : isActive
                  ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold">0{idx + 1}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isActive && <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                {stage.status === 'pending' && <span className="w-2 h-2 rounded-full bg-slate-300" />}
              </div>
              <div className="font-bold text-xs truncate leading-tight text-slate-900">{stage.title}</div>
              <div className="text-[10px] text-slate-500 mt-1 truncate">{stage.timestamp}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
