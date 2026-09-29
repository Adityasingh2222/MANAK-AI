'use client';

import React from 'react';
import { ExternalLink, Database, BookOpen, ShieldCheck, FileText } from 'lucide-react';

const sources = [
  {
    category: 'Bureau of Indian Standards (BIS)',
    items: [
      { name: 'BIS Official Website', url: 'https://www.bis.gov.in', desc: 'Primary source for Indian Standards, QCO mandates, lab accreditation lists' },
      { name: 'BIS Standards Catalog', url: 'https://www.services.bis.gov.in/php/BIS_Connect/bisconnect/standardList', desc: 'Searchable database of all IS standards' },
      { name: 'BIS CRS Portal', url: 'https://www.crsbis.in', desc: 'Compulsory Registration Scheme for electronics products' },
      { name: 'BIS Hallmarking Portal (HUID)', url: 'https://www.bis.gov.in/index.php/hallmarking/huid-search', desc: 'Hallmark Unique ID search for gold jewellery' },
    ]
  },
  {
    category: 'Quality Control Orders (QCOs)',
    items: [
      { name: 'Ministry of Commerce QCO Tracker', url: 'https://dpiit.gov.in/policies-initiatives/quality-control-orders', desc: 'DPIIT list of active QCOs by sector' },
      { name: 'Gazette of India Notifications', url: 'https://egazette.gov.in', desc: 'Official gazette for QCO and regulatory notifications' },
    ]
  },
  {
    category: 'Testing & Certification Labs',
    items: [
      { name: 'NABL Accredited Labs', url: 'https://www.nabl-india.org', desc: 'National Accreditation Board for Testing and Calibration Laboratories' },
      { name: 'BIS-Recognized Labs', url: 'https://www.bis.gov.in/index.php/laboratory-testing/recognized-laboratories', desc: 'Laboratories recognized by BIS for product testing under ISI mark scheme' },
    ]
  },
  {
    category: 'AI & Technology Stack',
    items: [
      { name: 'MANAK-AI Demo Data', url: '#', desc: 'All product scenarios, standards data, and clause evidence in this demo are based on publicly available BIS documents (IS 16102, IS 1417, IS 269, IS 1786, IS 302)' },
      { name: 'Zero-Hallucination RAG', url: '#', desc: 'MANAK-AI uses Retrieval-Augmented Generation with BM25 sparse retrieval — responses are grounded in structured demo data, not AI-generated facts' },
    ]
  },
  {
    category: 'Regulatory Framework',
    items: [
      { name: 'BIS Act 2016', url: 'https://www.bis.gov.in/index.php/about-bis/bis-act', desc: 'Bureau of Indian Standards Act, 2016 — the legislative foundation for BIS mandates' },
      { name: 'Consumer Protection Act 2019', url: 'https://consumeraffairs.nic.in/acts-and-rules/consumer-protection-act-2019', desc: 'Framework for consumer grievance and redressal' },
    ]
  }
];

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight flex items-center gap-2">
          <Database className="w-6 h-6" /> Sources & References
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          MANAK-AI is built on official BIS data and publicly available government sources.
          All demo data is clearly labelled as DEMO MODE — no official API responses are fabricated.
        </p>
        <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium">
          ⚠️ DEMO MODE: This application uses structured demo data based on real published BIS standards.
          Official BIS verification APIs require government authorization credentials not available in this prototype.
        </div>
      </div>

      {sources.map((section) => (
        <div key={section.category} className="bg-white rounded-xl border border-gov-border shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <h2 className="text-sm font-bold text-gov-navy">{section.category}</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {section.items.map((item) => (
              <div key={item.name} className="px-5 py-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                </div>
                {item.url !== '#' && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 text-xs text-gov-navy font-medium hover:underline"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
