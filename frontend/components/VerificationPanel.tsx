'use client';

import React, { useState } from 'react';
import { verifyIdentifier } from '@/lib/api';
import { ShieldCheck, Search, CheckCircle2, XCircle, AlertTriangle, Building, Calendar, Tag } from 'lucide-react';

export const VerificationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'isi' | 'huid' | 'crs' | 'cml'>('isi');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'isi', label: 'ISI / BIS Licence (CM/L)', placeholder: 'e.g. CM/L-8400192801' },
    { id: 'huid', label: 'Gold Hallmark (HUID)', placeholder: 'e.g. AA1234' },
    { id: 'crs', label: 'Electronics CRS', placeholder: 'e.g. R-41012345' },
    { id: 'cml', label: 'CM/L Number Check', placeholder: 'e.g. 1234567890' },
  ];

  const quickSamples: Record<string, string[]> = {
    isi: ['CM/L-8400192801', 'CM/L-1234567890', 'CM/L-9999999999'],
    huid: ['AA1234', 'XY9876', 'JH5678'],
    crs: ['R-41012345', 'R-41098765'],
    cml: ['CM/L-8400192801', 'CM/L-1234567890']
  };

  const handleVerify = async (val?: string) => {
    const searchVal = val || inputValue;
    if (!searchVal.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await verifyIdentifier(activeTab, searchVal);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Verification request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gov-border shadow-sm p-5 space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-navy"></span>
            <h3 className="text-base font-bold text-gov-navy tracking-tight uppercase">
              National Verification Centre
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Authenticate product conformity markings: ISI licence (CM/L), Gold HUID, and MeitY CRS registrations.
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase">
          Standard Mark Verification
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setResult(null);
              setError(null);
              setInputValue('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === tab.id
                ? 'bg-gov-navy text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Test Numbers */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase">Quick Demo Numbers:</span>
        {quickSamples[activeTab]?.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputValue(sample);
              handleVerify(sample);
            }}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[11px] border border-slate-300 transition-colors"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={tabs.find((t) => t.id === activeTab)?.placeholder}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gov-navy"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleVerify();
            }}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
        <button
          onClick={() => handleVerify()}
          disabled={loading || !inputValue.trim()}
          className="px-5 py-2.5 bg-gov-navy hover:bg-gov-blue disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify Now'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Verification Result Card */}
      {result && (
        <div className="space-y-4 animate-fadeIn">
          {/* Mandatory Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-900 flex items-center justify-between">
            <span className="font-bold">{result.disclaimer}</span>
            <span className="text-[10px] font-mono text-slate-600">Timestamp: {result.timestamp.split('T')[0]}</span>
          </div>

          <div className={`p-5 rounded-xl border ${result.is_valid ? 'bg-emerald-50/40 border-emerald-300' : 'bg-rose-50/40 border-rose-300'} shadow-sm space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                {result.is_valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{result.status}</h4>
                  <div className="text-[11px] text-slate-500 font-mono">Searched Identifier: {result.identifier_value}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700">
                Authority: {result.source_authority}
              </span>
            </div>

            {/* Detailed Key-Value Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(result.details).map(([key, value]) => {
                if (key === 'is_valid') return null;
                return (
                  <div key={key} className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div className="font-semibold text-slate-800 mt-0.5 break-words">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
