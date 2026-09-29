'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  FlaskConical, 
  Building2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function CertificationRoadmapPage() {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      title: '1. Identify Product',
      desc: 'Accurately classify product specifications, model numbers, and intended use.',
      documents: 'Product datasheet, component list, general assembly drawing',
      evidence: 'Product rating label and operational rating parameters',
      action: 'Run Multimodal Scanner or search catalog',
      link: '/scan'
    },
    {
      title: '2. Identify Standard',
      desc: 'Map the product to the corresponding Bureau of Indian Standards (BIS) specification.',
      documents: 'Official BIS Standard Document (e.g. IS 16102, IS 269)',
      evidence: 'Scope clause matching product functionality',
      action: 'Explore in Know Your Standard catalog',
      link: '/standards'
    },
    {
      title: '3. Check QCO Mandate',
      desc: 'Verify if the product is covered under a mandatory Quality Control Order.',
      documents: 'Gazette of India S.O. Notification',
      evidence: 'Statutory deadline and covered tariff codes',
      action: 'Check latest QCO notifications',
      link: '/updates'
    },
    {
      title: '4. Review Requirements',
      desc: 'Analyze clause-level test limits, construction requirements, and markings.',
      documents: 'Scheme of Inspection and Testing (SIT)',
      evidence: 'Specific sub-clause tolerance limits',
      action: 'Query AI Copilot for simplified clause explanation',
      link: '/copilot'
    },
    {
      title: '5. Conduct Testing',
      desc: 'Fabricate prototype samples and test at a BIS-recognized or NABL-accredited laboratory.',
      documents: 'Complete Type Test Report',
      evidence: 'Pass results for all routine, type, and acceptance tests',
      action: 'Locate accredited lab in Lab Finder',
      link: '/labs'
    },
    {
      title: '6. Prepare Documents',
      desc: 'Assemble factory quality control manual, calibration certificates, and layout plans.',
      documents: 'Manufacturing machinery list, calibration records, QC staff CVs',
      evidence: 'Pre-Audit Compliance Checklist sign-off',
      action: 'Generate Pre-Audit Checklist',
      link: '/compliance'
    },
    {
      title: '7. Apply to BIS',
      desc: 'Submit Form-V online on the BIS Manakonline portal with application fee.',
      documents: 'Form-V, Udyam MSME certificate (for 50% discount), factory deed',
      evidence: 'Online application acknowledgement receipt',
      action: 'Open BIS Manakonline portal',
      link: 'https://www.manakonline.in'
    },
    {
      title: '8. Factory Assessment',
      desc: 'A BIS technical officer inspects manufacturing machinery, lab bench, and witness testing.',
      documents: 'Verification visit report (Form-VI)',
      evidence: 'Witness testing sample seals and inspection sign-off',
      action: 'Ensure all calibration stickers are current',
      link: '/compliance'
    },
    {
      title: '9. Grant of Licence',
      desc: 'BIS issues licence endorsement letter granting permission to use Standard Mark.',
      documents: 'Official CM/L Licence Endorsement Document',
      evidence: 'Unique 7 to 10 digit CM/L number assigned',
      action: 'Verify licence in Verification Centre',
      link: '/verify'
    },
    {
      title: '10. Standard Marking',
      desc: 'Print ISI mark with CM/L number and standard reference on packaging and rating label.',
      documents: 'Master artwork proof approved by BIS',
      evidence: 'Physical marked production sample',
      action: 'Check marking rules with Copilot',
      link: '/copilot'
    },
    {
      title: '11. Post-Certification',
      desc: 'Maintain daily inspection registers and undergo annual BIS surveillance audits.',
      documents: 'Routine test logs, customer complaint records, renewal fee receipt',
      evidence: 'Continuous compliance audit log',
      action: 'Review Compliance Pulse timeline',
      link: '/compliance'
    }
  ];

  const current = steps[selectedStep];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">BIS Certification Roadmap</h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete 11-stage statutory journey from initial product classification to grant of licence and post-certification surveillance.
        </p>
      </div>

      {/* Stepper Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setSelectedStep(i)}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              selectedStep === i
                ? 'border-gov-navy bg-gov-navy text-white font-bold shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="text-[10px] opacity-75 mb-1 font-mono">Stage {i + 1}</div>
            <div className="truncate font-semibold">{st.title.split('. ')[1]}</div>
          </button>
        ))}
      </div>

      {/* Detailed Stage Card */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-5 animate-fadeIn">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Stage 0{selectedStep + 1} of 11</span>
            <h3 className="text-xl font-extrabold text-gov-navy mt-0.5">{current.title}</h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
            Conformity Assessment Scheme
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {current.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">Required Documents:</div>
            <div className="font-semibold text-slate-900">{current.documents}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">Required Evidence:</div>
            <div className="font-semibold text-slate-900">{current.evidence}</div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-emerald-900">Recommended Action:</div>
            <div className="text-emerald-800 mt-0.5">{current.action}</div>
          </div>
          <Link
            href={current.link}
            className="px-4 py-2 bg-gov-green hover:bg-emerald-800 text-white rounded-lg font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Proceed to Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
