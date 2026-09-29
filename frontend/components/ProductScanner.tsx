'use client';

import React, { useState } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { TrustLayer } from '@/components/TrustLayer';
import { scanProduct, ScanResult } from '@/lib/api';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  FlaskConical, 
  Building2, 
  Download, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Tag,
  Sparkles,
  Award
} from 'lucide-react';
import Link from 'next/link';

export const ProductScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunScan = async (scenarioOverride?: string, ocrHint?: string, base64Image?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await scanProduct(scenarioOverride, ocrHint, base64Image);
      setScanResult(data);
    } catch (err: any) {
      setError(err.message || 'Error executing product analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Real Camera & Image Input */}
      <CameraCapture
        onCapture={(base64) => handleRunScan(undefined, undefined, base64)}
        onUpload={(file) => handleRunScan(undefined, file.name)}
        onScenarioSelect={(scenarioId) => handleRunScan(scenarioId)}
      />

      {/* Loading state indicator */}
      {loading && (
        <div className="p-8 text-center bg-white rounded-2xl border-2 border-amber-300 shadow-lg space-y-3">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-base font-black text-gov-navy">
            Running Multimodal Vision & Standards Grounding Pipeline...
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
            Preprocessing image → OCR text extraction → Product classification → IS Standard mapping → QCO verification → Test clause assembly
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-800 text-xs font-semibold">
          <b>Analysis Error:</b> {error}
        </div>
      )}

      {/* Section 10: Scanner Result Page with Colorful National Portal Palette */}
      {scanResult && !loading && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Banner & Mode Disclaimer */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs text-white shadow-md">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <span className="font-extrabold">{scanResult.disclaimer}</span>
            </div>
            <span className="font-mono text-[11px] bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/30 font-bold">
              AI Confidence: {(scanResult.confidence_score * 100).toFixed(0)}%
            </span>
          </div>

          {/* Grid Layout: Identified Product & Applicable Standards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Product Identified Card (Orange/Saffron Theme) */}
            <div className="bg-gradient-to-br from-orange-50/70 via-white to-amber-50/30 rounded-2xl border-2 border-orange-200 border-t-4 border-t-orange-500 p-5 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-orange-100">
                <h4 className="text-xs font-black text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-600" />
                  Product Identified
                </h4>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black shadow-sm">
                  {scanResult.product_category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {scanResult.product_name}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-slate-600 mt-1 font-medium">
                  <span>Brand: <b className="text-slate-900">{scanResult.brand}</b></span>
                  <span>•</span>
                  <span>Model: <b className="text-slate-900">{scanResult.model}</b></span>
                </div>
              </div>

              {/* Extracted Specifications & Markings */}
              <div className="p-3 bg-white rounded-xl border border-orange-200 text-xs space-y-1.5 font-mono shadow-inner">
                <div className="text-[10px] font-black text-orange-900 uppercase font-sans mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  Extracted Rating Plate Details:
                </div>
                {Object.entries(scanResult.rating_plate).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-orange-100 pb-1 last:border-0 last:pb-0">
                    <span className="text-slate-500 capitalize font-medium">{key}:</span>
                    <span className="font-extrabold text-slate-900">{String(val)}</span>
                  </div>
                ))}
              </div>

              {/* Detected Marks */}
              <div className="flex flex-wrap gap-2 text-xs">
                {scanResult.cml_detected && (
                  <div className="px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-950 font-mono text-[11px] font-bold shadow-sm">
                    ISI Licence: <b>{scanResult.cml_detected}</b>
                  </div>
                )}
                {scanResult.huid_detected && (
                  <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-mono text-[11px] font-bold shadow-sm">
                    Gold HUID: <b>{scanResult.huid_detected}</b>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Applicable Standards & Regulatory QCO (Royal Blue Theme) */}
            <div className="bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/30 rounded-2xl border-2 border-blue-200 border-t-4 border-t-blue-600 p-5 shadow-md space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between pb-2 border-b-2 border-blue-100">
                <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Applicable Indian Standards & QCO Mandate
                </h4>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF671F] text-white font-black shadow-sm">
                  Mandatory Compliance
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-black text-blue-800 uppercase tracking-wider">Applicable Standard</div>
                    <div className="text-lg font-black text-gov-navy mt-0.5">
                      {scanResult.applicable_standard}
                    </div>
                  </div>
                  <Link
                    href={`/standards/${scanResult.standard_id}`}
                    className="shrink-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg text-xs font-black flex items-center gap-1.5 shadow transition-all"
                  >
                    <span>Inspect Standard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 font-medium">
                  <div>
                    <span className="font-bold text-slate-900">Regulatory QCO Status: </span>
                    <span className="text-emerald-700 font-extrabold">{scanResult.qco_status}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Conformity Scheme: </span>
                    Scheme-I (ISI Mark Licence) / Scheme-II (CRS)
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Legal Authority: </span>
                    Bureau of Indian Standards Act, 2016 & DPIIT Quality Control Orders
                  </div>
                </div>
              </div>

              {/* Compliance Readiness Meter */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Compliance Readiness Score: {scanResult.compliance_readiness.overall_score}%
                  </div>
                  <div className="text-xs text-emerald-800 mt-0.5 font-bold">
                    Status: <span className="underline">{scanResult.compliance_readiness.status}</span>
                  </div>
                </div>

                <Link
                  href="/compliance"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg text-xs font-black shadow transition-all flex items-center gap-1.5"
                >
                  <span>Open Compliance Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Required Tests Table (Crimson/Rose Theme) */}
          <div className="bg-white rounded-2xl border-2 border-rose-200 border-t-4 border-t-rose-600 p-5 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-rose-100">
              <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-rose-600" />
                Required Laboratory Tests (Clause Mapped)
              </h4>
              <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                {scanResult.required_tests.length} Mandatory Tests
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gradient-to-r from-rose-50 to-orange-50 text-slate-800 font-black border-b-2 border-rose-200">
                  <tr>
                    <th className="p-3">Test Parameter Name</th>
                    <th className="p-3">Applicable Standard Clause</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Lab Scope Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {scanResult.required_tests.map((test, i) => (
                    <tr key={i} className="hover:bg-rose-50/30 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{test.name}</td>
                      <td className="p-3 font-mono font-bold text-blue-900">{test.clause}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black shadow-sm ${
                          test.priority === 'Critical'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}>
                          {test.priority}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-semibold">BIS Recognized / NABL Accredited</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suitable Laboratories (Cyan Theme) */}
          <div className="bg-white rounded-2xl border-2 border-cyan-200 border-t-4 border-t-cyan-600 p-5 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-cyan-100">
              <h4 className="text-xs font-black text-cyan-950 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-600" />
                Suitable Recognized Laboratories
              </h4>
              <Link href="/labs" className="text-xs text-cyan-800 hover:text-cyan-950 hover:underline font-black flex items-center gap-1">
                <span>Explore in Lab Finder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {scanResult.suggested_labs.map((lab, i) => (
                <div key={i} className="p-4 bg-gradient-to-br from-cyan-50/70 to-white border-2 border-cyan-200 rounded-xl text-xs flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="font-black text-slate-900 text-sm">{lab.name}</div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lab.accreditation}
                    </div>
                  </div>
                  {lab.distance_km && (
                    <div className="text-[11px] text-cyan-900 font-bold font-mono mt-2.5 pt-2 border-t border-cyan-100">
                      Approx Distance: {lab.distance_km} km
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Government Trust Layer Verification */}
          <TrustLayer signals={scanResult.trust_layer} />
        </div>
      )}
    </div>
  );
};
