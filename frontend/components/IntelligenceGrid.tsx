'use client';

import React, { useState } from 'react';
import { 
  PackageCheck, 
  FileText, 
  FlaskConical, 
  Compass, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export interface StageData {
  id: string;
  step_num: number;
  title: string;
  subtitle: string;
  status: 'verified' | 'active' | 'pending' | 'needs_verification';
  icon: any;
  themeColor: {
    border: string;
    bg: string;
    text: string;
    iconBg: string;
    iconColor: string;
    activeBorder: string;
    activeRing: string;
    pillBg: string;
    pillText: string;
  };
  evidence?: string;
  next_action?: string;
  details: string;
}

interface IntelligenceGridProps {
  currentStageId?: string;
  onStageClick?: (stageId: string) => void;
}

export const IntelligenceGrid: React.FC<IntelligenceGridProps> = ({
  currentStageId = 'product',
  onStageClick,
}) => {
  const [selectedStage, setSelectedStage] = useState<string>(currentStageId);

  const stages: StageData[] = [
    {
      id: 'product',
      step_num: 1,
      title: 'PRODUCT',
      subtitle: 'Identify & Classify',
      status: 'verified',
      icon: PackageCheck,
      themeColor: {
        border: 'border-orange-200 hover:border-orange-400',
        bg: 'bg-gradient-to-br from-orange-50/80 to-amber-50/40',
        text: 'text-orange-950',
        iconBg: 'bg-orange-500 text-white shadow-md shadow-orange-500/20',
        iconColor: 'text-orange-600',
        activeBorder: 'border-[#FF671F]',
        activeRing: 'ring-4 ring-orange-500/20',
        pillBg: 'bg-orange-100 text-orange-900 border border-orange-300',
        pillText: 'text-orange-800'
      },
      evidence: 'LED Lamp 9W (Self-Ballasted) / B22 Cap detected via Multimodal Scanner',
      next_action: 'Proceed to Standard Mapping',
      details: 'Product classified under Electrotechnical Division (ETD 23). Rating: 230V, 50Hz, 810 Lumens.'
    },
    {
      id: 'standard',
      step_num: 2,
      title: 'STANDARD',
      subtitle: 'Indian Standard',
      status: 'verified',
      icon: FileText,
      themeColor: {
        border: 'border-blue-200 hover:border-blue-400',
        bg: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/40',
        text: 'text-blue-950',
        iconBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/20',
        iconColor: 'text-blue-600',
        activeBorder: 'border-blue-600',
        activeRing: 'ring-4 ring-blue-500/20',
        pillBg: 'bg-blue-100 text-blue-900 border border-blue-300',
        pillText: 'text-blue-800'
      },
      evidence: 'IS 16102 (Part 1):2012 & IS 16102 (Part 2):2017',
      next_action: 'Check QCO & Clause Evidence',
      details: 'Prescribes safety & performance requirements. QCO mandates BIS certification before sale.'
    },
    {
      id: 'test',
      step_num: 3,
      title: 'REQUIRED TESTS',
      subtitle: 'Clause-Level Tests',
      status: 'verified',
      icon: FlaskConical,
      themeColor: {
        border: 'border-rose-200 hover:border-rose-400',
        bg: 'bg-gradient-to-br from-rose-50/80 to-pink-50/40',
        text: 'text-rose-950',
        iconBg: 'bg-rose-600 text-white shadow-md shadow-rose-500/20',
        iconColor: 'text-rose-600',
        activeBorder: 'border-rose-600',
        activeRing: 'ring-4 ring-rose-500/20',
        pillBg: 'bg-rose-100 text-rose-900 border border-rose-300',
        pillText: 'text-rose-800'
      },
      evidence: 'Insulation Resistance (Cl 8.1), THD (Cl 11.1), Temperature Rise (Cl 11)',
      next_action: 'Select Recognized Laboratory',
      details: 'Five mandatory type tests identified. Insulation resistance must be >= 4.0 Megohms.'
    },
    {
      id: 'lab',
      step_num: 4,
      title: 'LAB FINDER',
      subtitle: 'BIS & NABL Labs',
      status: 'active',
      icon: Compass,
      themeColor: {
        border: 'border-cyan-200 hover:border-cyan-400',
        bg: 'bg-gradient-to-br from-cyan-50/80 to-sky-50/40',
        text: 'text-cyan-950',
        iconBg: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20',
        iconColor: 'text-cyan-600',
        activeBorder: 'border-cyan-600',
        activeRing: 'ring-4 ring-cyan-500/20',
        pillBg: 'bg-cyan-100 text-cyan-900 border border-cyan-300',
        pillText: 'text-cyan-800'
      },
      evidence: 'ERDA Vadodara (TC-5021) & CPRI Bengaluru (TC-5489) matched',
      next_action: 'Submit test sample request',
      details: 'Two BIS-recognized laboratories found within test scope with 14-day average turnaround.'
    },
    {
      id: 'certification',
      step_num: 5,
      title: 'CERTIFICATION',
      subtitle: 'Scheme Pathway',
      status: 'pending',
      icon: Award,
      themeColor: {
        border: 'border-purple-200 hover:border-purple-400',
        bg: 'bg-gradient-to-br from-purple-50/80 to-fuchsia-50/40',
        text: 'text-purple-950',
        iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/20',
        iconColor: 'text-purple-600',
        activeBorder: 'border-purple-600',
        activeRing: 'ring-4 ring-purple-500/20',
        pillBg: 'bg-purple-100 text-purple-900 border border-purple-300',
        pillText: 'text-purple-800'
      },
      evidence: 'Scheme-I (ISI Mark) / Scheme-II (CRS Registration)',
      next_action: 'Prepare documentation & SIT manual',
      details: 'Manufacturer must submit Form-V on BIS Manakonline portal with accredited type test report.'
    },
    {
      id: 'verification',
      step_num: 6,
      title: 'VERIFICATION',
      subtitle: 'Market Authenticity',
      status: 'pending',
      icon: CheckCircle2,
      themeColor: {
        border: 'border-emerald-200 hover:border-emerald-400',
        bg: 'bg-gradient-to-br from-emerald-50/80 to-teal-50/40',
        text: 'text-emerald-950',
        iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20',
        iconColor: 'text-emerald-600',
        activeBorder: 'border-emerald-600',
        activeRing: 'ring-4 ring-emerald-500/20',
        pillBg: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
        pillText: 'text-emerald-800'
      },
      evidence: 'CM/L licence number check on BIS Care / MANAK-AI Verification Centre',
      next_action: 'Inspect batch QR / HUID',
      details: 'Consumers and auditors verify genuine licence and operative status.'
    },
    {
      id: 'compliance',
      step_num: 7,
      title: 'COMPLIANCE',
      subtitle: 'Audit Readiness',
      status: 'pending',
      icon: ShieldCheck,
      themeColor: {
        border: 'border-amber-200 hover:border-amber-400',
        bg: 'bg-gradient-to-br from-amber-50/80 to-yellow-50/40',
        text: 'text-amber-950',
        iconBg: 'bg-amber-600 text-white shadow-md shadow-amber-500/20',
        iconColor: 'text-amber-600',
        activeBorder: 'border-amber-600',
        activeRing: 'ring-4 ring-amber-500/20',
        pillBg: 'bg-amber-100 text-amber-900 border border-amber-300',
        pillText: 'text-amber-800'
      },
      evidence: '88% Dynamic Readiness Score calculated',
      next_action: 'Download Pre-Audit Checklist PDF',
      details: 'Routine factory surveillance tests and raw material registers up to date.'
    }
  ];

  const activeStageObj = stages.find((s) => s.id === selectedStage) || stages[0];
  const ActiveIcon = activeStageObj.icon;

  const getStatusBadge = (status: StageData['status']) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-sm">✓ Evidence Backed</span>;
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FF671F] text-white shadow-sm animate-pulse">In Progress</span>;
      case 'needs_verification':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-sm">Needs Verification</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-200 text-slate-700">Next Stage</span>;
    }
  };

  const handleSelect = (id: string) => {
    setSelectedStage(id);
    if (onStageClick) onStageClick(id);
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-slate-200 shadow-md p-6 space-y-5">
      {/* Title & Description with National Emblem Styling */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gov-navy to-blue-900 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-base font-black text-gov-navy tracking-tight uppercase">
              MANAK Intelligence Grid — 7-Stage Conformity Lifecycle
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Click any stage in the standards lifecycle to inspect grounded evidence and regulatory next actions.
            </p>
          </div>
        </div>

        {/* Status Indicators Legend */}
        <div className="flex items-center space-x-3 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span> Verified</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FF671F] shadow-sm"></span> Active</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Pending</span>
        </div>
      </div>

      {/* Grid Stepper with 7 Colored Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {stages.map((stage) => {
          const isSelected = stage.id === selectedStage;
          const Icon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => handleSelect(stage.id)}
              className={`p-3.5 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${stage.themeColor.bg} ${
                isSelected
                  ? `${stage.themeColor.activeBorder} ${stage.themeColor.activeRing} shadow-md scale-[1.03] z-10`
                  : `${stage.themeColor.border} hover:scale-[1.01] hover:shadow-sm`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stage.themeColor.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-600">
                    0{stage.step_num}
                  </span>
                </div>
                <div className={`font-black text-xs tracking-tight ${stage.themeColor.text}`}>
                  {stage.title}
                </div>
                <div className="text-[11px] text-slate-600 font-semibold truncate mt-0.5">
                  {stage.subtitle}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold">
                {stage.status === 'verified' && <span className="text-emerald-700 flex items-center gap-1">● Verified</span>}
                {stage.status === 'active' && <span className="text-[#FF671F] flex items-center gap-1 animate-pulse">● Active</span>}
                {stage.status === 'pending' && <span className="text-slate-500">○ Pending</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Inspector Box with Rich Colored Columns */}
      <div className={`rounded-xl p-5 border-2 transition-all ${activeStageObj.themeColor.bg} ${activeStageObj.themeColor.activeBorder} shadow-sm`}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${activeStageObj.themeColor.iconBg}`}>
              <ActiveIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-500 uppercase">Stage 0{activeStageObj.step_num}:</span>
                <span className={`text-base font-black ${activeStageObj.themeColor.text}`}>{activeStageObj.title}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600">({activeStageObj.subtitle})</p>
            </div>
          </div>
          <div>{getStatusBadge(activeStageObj.status)}</div>
        </div>

        {/* 2 Colored Columns: Grounded Evidence & Recommended Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="bg-white/90 rounded-xl p-3.5 border-2 border-slate-200 shadow-sm space-y-1.5">
            <div className="font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Grounded Evidence / BIS Reference:
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-900 font-mono text-[11px] leading-relaxed">
              {activeStageObj.evidence || 'Awaiting evidence input from scan or query.'}
            </div>
          </div>

          <div className="bg-white/90 rounded-xl p-3.5 border-2 border-amber-300 shadow-sm space-y-1.5">
            <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              Recommended Next Action:
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 font-bold flex items-center justify-between text-xs">
              <span>{activeStageObj.next_action}</span>
              <ChevronRight className="w-4 h-4 text-[#FF671F] shrink-0" />
            </div>
          </div>
        </div>

        <div className="mt-3.5 p-3 bg-white/70 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Regulatory Insight: </span>
          {activeStageObj.details}
        </div>
      </div>
    </div>
  );
};
