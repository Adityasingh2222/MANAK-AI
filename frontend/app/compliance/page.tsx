'use client';

import React, { useState } from 'react';
import { assessCompliance } from '@/lib/api';
import { ComplianceChecklist } from '@/components/ComplianceChecklist';
import { CompliancePulse } from '@/components/CompliancePulse';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  FileText, 
  ArrowRight, 
  ShieldCheck,
  TrendingUp,
  Building2
} from 'lucide-react';

export default function CompliancePage() {
  const [productName, setProductName] = useState('Self-Ballasted 9W LED Lamp');
  const [standardId, setStandardId] = useState('IS-16102-1');
  const [manufacturerType, setManufacturerType] = useState('Small');
  const [hasTestReports, setHasTestReports] = useState(true);
  const [hasInHouseLab, setHasInHouseLab] = useState(false);
  const [hasQualityManual, setHasQualityManual] = useState(true);
  const [hasCalibratedInstruments, setHasCalibratedInstruments] = useState(false);
  const [hasTraceabilitySystem, setHasTraceabilitySystem] = useState(true);

  const [assessment, setAssessment] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAssess = async () => {
    setLoading(true);
    try {
      const data = await assessCompliance({
        product_name: productName,
        standard_id: standardId,
        manufacturer_type: manufacturerType,
        has_test_reports: hasTestReports,
        has_in_house_lab: hasInHouseLab,
        has_quality_manual: hasQualityManual,
        has_calibrated_instruments: hasCalibratedInstruments,
        has_traceability_system: hasTraceabilitySystem,
      });
      setAssessment(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Compliance Copilot & Readiness Engine</h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate manufacturer compliance preparedness, compute dynamic readiness score, and generate exportable pre-audit checklists.
        </p>
      </div>

      {/* Compliance Pulse Timeline */}
      <CompliancePulse />

      {/* Assessment Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters Box */}
        <div className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
            <Sliders className="w-4 h-4 text-gov-navy" />
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
              Assessment Parameters
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Product Description</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Applicable Standard</label>
              <select
                value={standardId}
                onChange={(e) => setStandardId(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="IS-16102-1">IS 16102 (Part 1):2012 - LED Lamps</option>
                <option value="IS-269">IS 269:2015 - Portland Cement</option>
                <option value="IS-1417">IS 1417:2016 - Gold Hallmarking</option>
                <option value="IS-1786">IS 1786:2008 - TMT Steel Rebars</option>
                <option value="IS-302-2-3">IS 302 (Part 2/Sec 3) - Electric Iron</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Enterprise Size</label>
              <select
                value={manufacturerType}
                onChange={(e) => setManufacturerType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="Micro">Micro Enterprise (&lt; ₹5 Cr turnover)</option>
                <option value="Small">Small Enterprise (&lt; ₹50 Cr)</option>
                <option value="Medium">Medium Enterprise (&lt; ₹250 Cr)</option>
                <option value="Large">Large Scale Manufacturer</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <label className="font-bold text-slate-700 block">Current Readiness Status</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTestReports}
                  onChange={(e) => setHasTestReports(e.target.checked)}
                  className="rounded text-gov-navy focus:ring-0"
                />
                <span>Valid external NABL test report available</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasQualityManual}
                  onChange={(e) => setHasQualityManual(e.target.checked)}
                  className="rounded text-gov-navy focus:ring-0"
                />
                <span>Scheme of Inspection & Testing (SIT) drafted</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasInHouseLab}
                  onChange={(e) => setHasInHouseLab(e.target.checked)}
                  className="rounded text-gov-navy focus:ring-0"
                />
                <span>In-house testing facility equipped</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCalibratedInstruments}
                  onChange={(e) => setHasCalibratedInstruments(e.target.checked)}
                  className="rounded text-gov-navy focus:ring-0"
                />
                <span>Instruments calibrated by NABL lab</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasTraceabilitySystem}
                  onChange={(e) => setHasTraceabilitySystem(e.target.checked)}
                  className="rounded text-gov-navy focus:ring-0"
                />
                <span>Batch numbering and heat traceability system</span>
              </label>
            </div>

            <button
              onClick={handleAssess}
              disabled={loading}
              className="w-full py-2.5 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold shadow-sm transition-colors mt-2"
            >
              {loading ? 'Evaluating...' : 'Compute Readiness Score'}
            </button>
          </div>
        </div>

        {/* Dynamic Score & Gap Analysis */}
        <div className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-gov-navy" />
              Dynamic Readiness Evaluation
            </h3>
            {assessment && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                {assessment.readiness_level}
              </span>
            )}
          </div>

          {!assessment ? (
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
              Click 'Compute Readiness Score' to calculate dynamic preparedness score across 8 regulatory dimensions.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Score Header Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gov-navy text-white flex items-center justify-center font-black text-xl shadow-md border-4 border-emerald-400">
                    {assessment.overall_score}%
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Overall Readiness</div>
                    <div className="text-lg font-extrabold text-gov-navy">{assessment.status}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{assessment.readiness_level}</div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="font-bold text-slate-800">Conformity Scheme</div>
                  <div className="text-emerald-700 font-semibold">Scheme-I (ISI Mark)</div>
                </div>
              </div>

              {/* Dimension Breakdown Bar Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(assessment.category_scores).map(([k, score]) => (
                  <div key={k} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="capitalize text-slate-700 font-semibold">{k.replace(/_/g, ' ')}</span>
                      <span className="font-bold text-slate-900">{String(score)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${Number(score) >= 80 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Identified Gaps & Recommended Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1.5">
                  <div className="font-bold text-amber-900 uppercase text-[10px] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Identified Gaps:</span>
                  </div>
                  <ul className="space-y-1 text-amber-950 list-disc list-inside">
                    {assessment.key_gaps.map((gap: string, i: number) => (
                      <li key={i}>{gap}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1.5">
                  <div className="font-bold text-emerald-900 uppercase text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Action Plan:</span>
                  </div>
                  <ul className="space-y-1 text-emerald-950 list-disc list-inside">
                    {assessment.action_plan.map((act: string, i: number) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pre-Audit Checklist Component with 4 Exports */}
      <ComplianceChecklist
        productName={productName}
        standardId={standardId}
        overallScore={assessment?.overall_score || 85}
      />
    </div>
  );
}
