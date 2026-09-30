'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  HelpCircle, 
  Scale, 
  CheckCircle2, 
  PhoneCall, 
  Send,
  Award,
  ExternalLink
} from 'lucide-react';

export default function ConsumerPage() {
  const [productCat, setProductCat] = useState('LED Lighting');
  const [brandSeller, setBrandSeller] = useState('');
  const [issueType, setIssueType] = useState('fake_mark');
  const [purchasePlace, setPurchasePlace] = useState('Local Retail Market');
  const [details, setDetails] = useState('');
  const [cmlOrHuid, setCmlOrHuid] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const marks = [
    {
      name: 'ISI Mark (Scheme-I)',
      meaning: 'Signifies product complies with Indian Standards for safety and quality. Mandatory for cement, electrical appliances, steel, and toys under QCO.',
      verification: 'Look for 7 to 10 digit CM/L number printed directly below the ISI mark. Verify on MANAK-AI or BIS Care App.',
      badge: 'Product Safety'
    },
    {
      name: 'BIS Hallmark for Gold',
      meaning: 'Certifies exact purity of gold jewellery (e.g. 22K916 = 91.6% pure gold). Mandatory in 343 districts.',
      verification: 'Look for 3 symbols: (1) BIS Logo, (2) Purity in Karat & Fineness, (3) 6-digit alphanumeric HUID code.',
      badge: 'Precious Metals'
    },
    {
      name: 'Compulsory Registration (CRS)',
      meaning: 'MeitY registration for laptops, mobile phones, LED lights, and power adaptors ensuring safety against fire and radiation.',
      verification: 'Look for BIS CRS wordmark with registration number R-XXXXXXXX and standard reference.',
      badge: 'Electronics Safety'
    },
    {
      name: 'BEE Star Rating',
      meaning: 'Ratings from 1-star to 5-star denoting electrical energy efficiency and power consumption savings.',
      verification: 'Check BEE hologram and QR code on refrigerator, AC, geysers, and ceiling fans.',
      badge: 'Energy Efficiency'
    }
  ];

  const handleGenerateComplaint = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/consumer/complaint-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_category: productCat,
          brand_or_seller: brandSeller || 'Unknown Retailer',
          issue_type: issueType,
          purchase_place: purchasePlace,
          product_details: details || 'Product failed within 3 days / missing mandatory certification marking.',
          cml_or_huid: cmlOrHuid || null
        })
      });
      const data = await res.json();
      setGeneratedDraft(data.draft_letter);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Citizen & Consumer Guidance Portal</h1>
        <p className="text-xs text-slate-500 mt-1">
          Empowering Indian consumers to identify genuine certification marks, understand consumer rights under the BIS Act 2016, and report sub-standard goods.
        </p>
      </div>

      {/* Certification Marks Guide */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
          <Award className="w-4 h-4 text-gov-navy" />
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            How to Identify Genuine Government Certification Marks
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marks.map((m, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">{m.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  {m.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{m.meaning}</p>
              <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50/80 p-2 rounded border border-emerald-200">
                <b>Verification Tip:</b> {m.verification}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consumer Rights under BIS Act */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
          <Scale className="w-4 h-4 text-gov-navy" />
          <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            Consumer Rights & Legal Protection under BIS Act, 2016
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-bold text-slate-900">Right to Tested Quality</div>
            <p className="text-slate-600 leading-relaxed">
              Every consumer has the right to receive products conforming to mandatory Indian Standards specified in Quality Control Orders.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-bold text-slate-900">Right to Genuine Hallmark</div>
            <p className="text-slate-600 leading-relaxed">
              In mandatory hallmarking districts, jewellers cannot sell gold without 6-digit HUID. Consumers are entitled to testing at recognized AHCs.
            </p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-bold text-slate-900">Statutory Redressal & Penalty</div>
            <p className="text-slate-600 leading-relaxed">
              Under Section 29, misuse of the Standard Mark or marketing non-compliant goods attracts heavy penalty, seizure, and imprisonment up to 2 years.
            </p>
          </div>
        </div>
      </div>

      {/* Complaint Preparation Assistant */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
              Report Suspected Sub-Standard Product / Complaint Assistant
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">Prepares formal dossier for BIS Enforcement</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Product Category</label>
              <input
                type="text"
                value={productCat}
                onChange={(e) => setProductCat(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Brand or Seller Name</label>
              <input
                type="text"
                value={brandSeller}
                onChange={(e) => setBrandSeller(e.target.value)}
                placeholder="e.g. Retailer name or online seller"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nature of Issue</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="fake_mark">Suspected Counterfeit / Fake ISI Mark</option>
                <option value="poor_quality">Sub-Standard Performance / Premature Failure</option>
                <option value="missing_huid">Missing 6-Digit HUID on Gold Jewellery</option>
                <option value="electrical_hazard">Electrical Shock / Overheating Hazard</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Marking Reference (CM/L or HUID if visible)</label>
              <input
                type="text"
                value={cmlOrHuid}
                onChange={(e) => setCmlOrHuid(e.target.value)}
                placeholder="e.g. CM/L-XXXXXXXX or HUID code"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Incident Details</label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe where and when purchased, defect observed..."
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 resize-none"
              />
            </div>

            <button
              onClick={handleGenerateComplaint}
              disabled={loading}
              className="px-4 py-2 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>{loading ? 'Drafting...' : 'Generate Formal BIS Complaint Dossier'}</span>
            </button>
          </div>

          {/* Generated Dossier Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Dossier Preview (Statutory Format):
              </div>
              {generatedDraft ? (
                <pre className="text-[11px] text-slate-800 font-mono whitespace-pre-wrap bg-white p-3 rounded border border-slate-200 max-h-72 overflow-y-auto">
                  {generatedDraft}
                </pre>
              ) : (
                <div className="text-xs text-slate-400 italic p-6 text-center">
                  Fill in product details and click 'Generate Formal BIS Complaint Dossier' to preview the structured complaint document.
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              <b>Submission Path:</b> Copy this dossier to submit via the BIS Care Mobile App or National Consumer Helpline (Call 1915).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
