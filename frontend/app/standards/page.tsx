'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchStandards } from '@/lib/api';
import { Search, FileText, ExternalLink, ShieldCheck, ChevronRight, Filter } from 'lucide-react';

function StandardsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [standards, setStandards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'All Categories',
    'Electronics & Electrical',
    'Precious Metals & Hallmarking',
    'Civil & Construction',
    'Metallurgy & Steel',
    'Consumer Electricals',
    'Food & Water',
    'Consumer Goods & Toys'
  ];

  const fetchStandards = async () => {
    setLoading(true);
    try {
      const data = await searchStandards(
        query || undefined,
        selectedCat !== 'All Categories' ? selectedCat : undefined
      );
      setStandards(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [selectedCat]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Know Your Standard</h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore official Indian Standards published by the Bureau of Indian Standards (BIS) with clause-level requirements and QCO mandates.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl border border-gov-border p-4 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by IS number (e.g. IS 16102, IS 269), keyword, or product..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchStandards();
            }}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={fetchStandards}
          className="px-5 py-2.5 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold transition-colors"
        >
          Search
        </button>
      </div>

      {/* Standards Results List */}
      {loading ? (
        <div className="p-10 text-center bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-xs text-slate-600">Retrieving official standard specifications...</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-600 flex justify-between items-center">
            <span>Showing {standards.length} Indian Standards</span>
            <span className="text-slate-400">Bureau of Indian Standards Catalog</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {standards.map((std) => (
              <div
                key={std.id}
                className="bg-white rounded-xl border border-gov-border p-5 shadow-sm hover:border-slate-400 transition-all flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-extrabold text-gov-navy bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {std.standard_number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {std.status}
                    </span>
                    {std.qco_applicable && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        Mandatory QCO
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium">
                      Division: {std.committee}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {std.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {std.scope}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                    <span><b>Conformity Scheme:</b> {std.scheme}</span>
                    <span><b>Mandatory:</b> {std.is_mandatory ? 'Yes (QCO)' : 'Voluntary'}</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col justify-between items-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-5">
                  <div className="text-right text-xs">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Mandatory Tests</div>
                    <div className="font-bold text-slate-800 mt-0.5">{std.required_tests?.length || 0} Test Parameters</div>
                  </div>

                  <Link
                    href={`/standards/${std.id}`}
                    className="px-4 py-2 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Clauses &amp; Labs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StandardsPage() {
  return (
    <Suspense fallback={
      <div className="p-10 text-center">
        <div className="w-8 h-8 border-2 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <div className="text-xs text-slate-600">Loading standards...</div>
      </div>
    }>
      <StandardsContent />
    </Suspense>
  );
}
