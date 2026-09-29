'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuditTrail } from '@/lib/api';
import { Hash, ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function AuditChainPage() {
  const [auditData, setAuditData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const data = await getAuditTrail();
      setAuditData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title & Navigation */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-2">
        <Link href="/admin" className="text-xs text-gov-navy hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gov-navy tracking-tight">Tamper-Evident Audit Ledger</h1>
            <p className="text-xs text-slate-500 mt-1">
              Cryptographically chained SHA-256 Merkle audit trail verifying all regulatory queries, product scans, and administrative actions.
            </p>
          </div>
          <button
            onClick={fetchAudit}
            className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Verify & Refresh Chain</span>
          </button>
        </div>
      </div>

      {/* Chain Status Card */}
      {auditData && (
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-md flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <span>Ledger Integrity: {auditData.valid ? 'VALID & UNBROKEN' : 'CORRUPTED'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
                  SHA-256 Merkle Linkage
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Total Chained Records: {auditData.total_records} | Verified at: {auditData.verified_at}
              </div>
            </div>
          </div>

          <div className="font-mono text-[11px] text-slate-400 text-right">
            <div>Head Seal Hash:</div>
            <div className="text-amber-300 truncate max-w-xs">{auditData.head_hash}</div>
          </div>
        </div>
      )}

      {/* Events Stream */}
      <div className="bg-white rounded-xl border border-gov-border shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 flex justify-between items-center">
          <span>Audit Events Stream (Latest 50 Entries)</span>
          <span className="text-slate-400 font-mono">Append-Only Immutability</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Validating cryptographic hash chain...
          </div>
        ) : (
          <div className="divide-y divide-slate-100 font-mono text-[11px]">
            {auditData?.events?.map((ev: any) => (
              <div key={ev.index} className="p-4 hover:bg-slate-50/50 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      #{ev.index}
                    </span>
                    <span className="font-bold text-gov-navy">{ev.action}</span>
                    <span className="text-slate-500 font-sans">by {ev.actor}</span>
                  </div>
                  <span className="text-slate-400">{ev.timestamp}</span>
                </div>

                <div className="text-slate-700 font-sans text-xs">
                  <b>Target Resource:</b> <span className="font-mono text-gov-blue">{ev.resource}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pt-1 text-slate-500">
                  <div className="truncate">
                    <b>Prev Hash:</b> {ev.previous_event_hash}
                  </div>
                  <div className="truncate text-emerald-700">
                    <b>Current Hash:</b> {ev.current_event_hash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
