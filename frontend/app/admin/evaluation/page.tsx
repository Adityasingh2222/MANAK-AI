'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRagEvaluation } from '@/lib/api';
import { 
  BarChart3, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Activity, 
  TrendingUp, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export default function RagEvaluationPage() {
  const [evalData, setEvalData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getRagEvaluation();
        setEvalData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !evalData) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
        <div className="w-8 h-8 border-3 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <div className="text-xs text-slate-600">Loading RAG Triad evaluation metrics...</div>
      </div>
    );
  }

  const triadCards = [
    { label: 'Context Relevance', score: evalData.rag_triad.context_relevance, desc: 'Fraction of retrieved chunks strictly relevant to user standard query' },
    { label: 'Faithfulness', score: evalData.rag_triad.faithfulness, desc: 'Groundedness of generated answer in retrieved clause evidence (No hallucination)' },
    { label: 'Answer Precision', score: evalData.rag_triad.answer_precision, desc: 'Exactness of response in answering the specific regulatory intent' }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Navigation */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-2">
        <Link href="/admin" className="text-xs text-gov-navy hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gov-navy tracking-tight">RAG Evaluation Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">
              Empirical evaluation of zero-hallucination standards grounding across 250 benchmark test cases.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
            {evalData.disclaimer}
          </span>
        </div>
      </div>

      {/* RAG Triad Core Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {triadCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</div>
              <div className="text-3xl font-black text-gov-navy mt-1">{card.score}%</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.desc}</p>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-emerald-500" style={{ width: `${card.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-xl border border-gov-border p-4 shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Citation Correctness</div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">{evalData.metrics.citation_correctness}%</div>
          <div className="text-slate-400 text-[10px] mt-0.5">Clause format validated</div>
        </div>

        <div className="bg-white rounded-xl border border-gov-border p-4 shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Hallucination Rate</div>
          <div className="text-xl font-extrabold text-rose-700 mt-1">{evalData.metrics.hallucination_rate}%</div>
          <div className="text-slate-400 text-[10px] mt-0.5">&lt;0.5% zero-defect target</div>
        </div>

        <div className="bg-white rounded-xl border border-gov-border p-4 shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Retrieval Precision@3</div>
          <div className="text-xl font-extrabold text-gov-navy mt-1">{evalData.metrics.retrieval_precision_at_3}%</div>
          <div className="text-slate-400 text-[10px] mt-0.5">Top-3 ranked clauses</div>
        </div>

        <div className="bg-white rounded-xl border border-gov-border p-4 shadow-sm">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Average Latency</div>
          <div className="text-xl font-extrabold text-gov-navy mt-1">{evalData.metrics.average_latency_ms} ms</div>
          <div className="text-slate-400 text-[10px] mt-0.5">End-to-end response time</div>
        </div>
      </div>

      {/* Latency and Accuracy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency by Query Type */}
        <div className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
            Latency Breakdown by Query Intent (Milliseconds)
          </h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evalData.latency_trend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="query_type" fontSize={10} tickLine={false} />
                <YAxis fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="latency_ms" fill="#0B2545" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Accuracy */}
        <div className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
            Conformity Assessment Accuracy by Industry Sector
          </h3>
          <div className="space-y-3 pt-2 text-xs">
            {evalData.category_performance.map((cat: any, i: number) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-800">{cat.category}</span>
                  <span className="text-emerald-700">{cat.accuracy}% ({cat.samples} tests)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gov-green" style={{ width: `${cat.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
