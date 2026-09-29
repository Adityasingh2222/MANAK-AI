'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  FileText, 
  Database, 
  Activity, 
  Users, 
  Hash, 
  BarChart3, 
  ArrowRight,
  Server
} from 'lucide-react';

export default function AdminPage() {
  const [role, setRole] = useState('Super Admin');

  const rbacRoles = [
    'Super Admin',
    'Knowledge Admin',
    'Reviewer',
    'Compliance Officer',
    'Analyst',
    'Read Only'
  ];

  const adminModules = [
    {
      title: 'Knowledge Studio',
      desc: 'Ingest and approve BIS standards PDFs, amendments, extract clause hierarchies, and manage RAG indexing states.',
      href: '/admin/documents',
      icon: Database,
      badge: 'Document Lifecycle'
    },
    {
      title: 'Tamper-Evident Audit Trail',
      desc: 'Inspect append-only SHA-256 Merkle hash chain records. Verify cryptographic ledger integrity in real-time.',
      href: '/admin/audit',
      icon: Hash,
      badge: 'SHA-256 Hash Chain'
    },
    {
      title: 'RAG Triad Evaluation',
      desc: 'Analyze context relevance, faithfulness, answer precision, retrieval recall, and latency metrics across benchmark test queries.',
      href: '/admin/evaluation',
      icon: BarChart3,
      badge: 'Model Performance'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title & RBAC Role Switcher */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gov-navy tracking-tight">MANAK-AI Administration Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Role-Based Access Control (RBAC), Knowledge Studio ingestion, and system compliance monitoring.
          </p>
        </div>

        {/* RBAC Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-bold text-slate-700">Simulate RBAC Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 bg-slate-100 border border-slate-300 rounded-lg font-bold text-gov-navy focus:outline-none"
          >
            {rbacRoles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-gov-border shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">System Health</div>
          <div className="text-base font-black text-emerald-600 mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            100% Operational
          </div>
          <div className="text-slate-400 text-[10px] mt-1">Primary Judge Flow Ready</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gov-border shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Knowledge Base</div>
          <div className="text-base font-black text-gov-navy mt-1">8 Standards / 9 Clauses</div>
          <div className="text-slate-400 text-[10px] mt-1">Hybrid BM25 Index Active</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gov-border shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Audit Chain</div>
          <div className="text-base font-black text-slate-800 mt-1">Append-Only Active</div>
          <div className="text-slate-400 text-[10px] mt-1">SHA-256 Merkle Validated</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gov-border shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">App Mode</div>
          <div className="text-base font-black text-amber-600 mt-1">DEMO MODE</div>
          <div className="text-slate-400 text-[10px] mt-1">SIH26107 Verification Active</div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminModules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link
              key={i}
              href={mod.href}
              className="p-6 rounded-xl border border-gov-border bg-white shadow-sm hover:border-gov-navy hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg bg-gov-navy/10 text-gov-navy group-hover:bg-gov-navy group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-gov-navy group-hover:text-gov-blue">
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-gov-navy">
                <span>Access Module</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
