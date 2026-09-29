'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUpdates } from '@/lib/api';
import { Bell, Newspaper, ExternalLink, Calendar, Tag, ShieldAlert } from 'lucide-react';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'gazette', label: 'Gazette Notifications' },
    { id: 'qco', label: 'QCO Orders' },
    { id: 'bis_update', label: 'BIS Updates' },
    { id: 'alert', label: 'Consumer Alerts' },
    { id: 'press', label: 'Press Releases' }
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const cat = activeCategory === 'all' ? undefined : activeCategory;
        const data = await getUpdates(cat);
        setUpdates(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Regulatory Gazette & QCO Watchdog</h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time tracking of Quality Control Orders (QCO), gazette notifications, standards amendments, and enforcement alerts issued by the Government of India.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeCategory === c.id
                ? 'bg-gov-navy text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Updates Cards */}
      {loading ? (
        <div className="p-10 text-center bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-xs text-slate-600">Loading regulatory bulletins...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {updates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-3 hover:border-slate-400 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {item.demo_label || 'DEMO CONTENT'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-slate-500 font-medium">
                  <b>Authority / Source:</b> {item.source}
                </div>
                <div className="font-semibold text-gov-navy">
                  Related Standard: {item.related_standard}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
