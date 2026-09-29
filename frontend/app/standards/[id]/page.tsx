'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getStandardById, getClausesForStandard } from '@/lib/api';
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  FlaskConical, 
  Building2, 
  ExternalLink,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { TrustLayer } from '@/components/TrustLayer';

export default function StandardDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [standard, setStandard] = useState<any | null>(null);
  const [clauses, setClauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'technical' | 'simple'>('technical');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const std = await getStandardById(id);
        setStandard(std);
        const cls = await getClausesForStandard(id);
        setClauses(cls);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
        <div className="w-8 h-8 border-3 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <div className="text-xs text-slate-600 font-semibold">Loading standard details and clauses...</div>
      </div>
    );
  }

  if (!standard) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <div className="text-base font-bold text-slate-800">Standard '{id}' Not Found</div>
        <Link href="/standards" className="text-xs text-gov-blue hover:underline mt-2 inline-block">
          ← Back to Standards Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button & Standard Header */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-4">
        <Link href="/standards" className="text-xs text-gov-navy hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Standards Catalog
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-extrabold text-white bg-gov-navy px-3 py-1 rounded">
                {standard.standard_number}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                {standard.status}
              </span>
              {standard.qco_applicable && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Mandatory QCO Enforced
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
              {standard.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Publishing Authority: {standard.authority} | Division: {standard.committee} | Effective: {standard.effective_date}
            </p>
          </div>

          {/* Simple vs Technical View Toggle */}
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex text-xs font-bold shrink-0">
            <button
              onClick={() => setViewMode('simple')}
              className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'simple' ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-600'}`}
            >
              Citizen Simple View
            </button>
            <button
              onClick={() => setViewMode('technical')}
              className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'technical' ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-600'}`}
            >
              Technical Clauses View
            </button>
          </div>
        </div>
      </div>

      {/* Scope & Overview */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
          Standard Scope & Application
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed font-normal">
          {standard.scope}
        </p>

        {standard.qco_name && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-center justify-between">
            <div>
              <span className="font-bold">Applicable QCO: </span>
              {standard.qco_name}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200/80 rounded uppercase">
              Section 29 BIS Act
            </span>
          </div>
        )}
      </div>

      {/* Clause-Level Evidence List */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gov-navy" />
            <h3 className="text-base font-bold text-gov-navy uppercase tracking-tight">
              Verified Clause Requirements
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {clauses.length} Indexed Clauses
          </span>
        </div>

        {clauses.length === 0 ? (
          <div className="text-xs text-slate-500 italic p-4 text-center">
            No specific clauses indexed for this demo standard.
          </div>
        ) : (
          <div className="space-y-3">
            {clauses.map((clause) => (
              <div key={clause.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200/60 font-mono text-xs">
                  <span className="font-bold text-gov-navy">
                    {clause.citation}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Section: {clause.section} (Page {clause.page})
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-800">
                  {clause.title}
                </div>

                {viewMode === 'simple' ? (
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded border border-slate-100">
                    <b>Simplified Meaning:</b> This clause requires that testing strictly follows standard limits to ensure user electrical safety and durability before receiving the ISI Mark.
                  </p>
                ) : (
                  <p className="text-xs text-slate-800 font-mono bg-white p-3 rounded border border-slate-200 leading-relaxed">
                    "{clause.text}"
                  </p>
                )}

                <div className="text-[10px] text-slate-400">
                  Source: {clause.source_doc}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Required Tests Table */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
          <FlaskConical className="w-4 h-4 text-gov-navy" />
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            Mandatory Test Parameters for Certification
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Test Name</th>
                <th className="p-2.5">Clause Reference</th>
                <th className="p-2.5">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standard.required_tests?.map((t: any, i: number) => (
                <tr key={i}>
                  <td className="p-2.5 font-bold text-slate-800">{t.name}</td>
                  <td className="p-2.5 font-mono text-slate-600">{t.clause}</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      {t.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Layer */}
      <TrustLayer />
    </div>
  );
}
