'use client';

import React, { useState, useEffect } from 'react';
import { searchLabs } from '@/lib/api';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Search, 
  Compass, 
  SlidersHorizontal,
  Clock,
  Layers
} from 'lucide-react';

export const LabFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedAccreditation, setSelectedAccreditation] = useState('');
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const states = ['All States', 'Gujarat', 'Karnataka', 'Uttar Pradesh', 'West Bengal', 'Maharashtra', 'Delhi'];
  const standards = ['All Standards', 'IS 16102', 'IS 269', 'IS 1786', 'IS 1417', 'IS 302', 'IS 9873'];

  const fetchLabs = async () => {
    setLoading(true);
    try {
      const data = await searchLabs(
        query || undefined,
        selectedStandard !== 'All Standards' ? selectedStandard : undefined,
        selectedAccreditation || undefined,
        selectedState !== 'All States' ? selectedState : undefined
      );
      setLabs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, [selectedStandard, selectedState, selectedAccreditation]);

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl border border-gov-border shadow-sm p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gov-navy"></span>
              <h3 className="text-base font-bold text-gov-navy tracking-tight uppercase">
                Geospatial Laboratory Discovery
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Locate BIS-recognized and NABL-accredited laboratories with testing capability for your standard.
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
            NABL & BIS Recognized
          </span>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by lab name, city, or capability..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchLabs();
              }}
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Standard Filter */}
          <div>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
            >
              {standards.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
            >
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Accreditation Filter */}
          <div>
            <select
              value={selectedAccreditation}
              onChange={(e) => setSelectedAccreditation(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
            >
              <option value="">All Accreditations</option>
              <option value="BIS">BIS Recognized</option>
              <option value="NABL">NABL Accredited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lab Cards List */}
      {loading ? (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-gov-navy border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-xs font-semibold text-slate-600">Searching laboratory network...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-xl border border-gov-border shadow-sm p-5 flex flex-col justify-between space-y-4 hover:border-slate-400 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{lab.name}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">{lab.institution_type}</div>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                    ✓ {lab.accreditation}
                  </span>
                </div>

                {/* Location & Cert */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{lab.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span>NABL Cert: <b>{lab.nabl_cert_no}</b></span>
                    <span>•</span>
                    <span>BIS Code: <b>{lab.bis_lab_code}</b></span>
                  </div>
                </div>

                {/* Capabilities Chips */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Testing Scope & Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lab.capabilities.slice(0, 3).map((cap: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-3 text-slate-600">
                  <span className="flex items-center gap-1 font-mono text-[11px]"><Phone className="w-3 h-3 text-gov-navy" /> {lab.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-gov-navy" /> {lab.contact_email}</span>
                </div>
                <div className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Avg Turnaround: {lab.avg_turnaround_days} days
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
