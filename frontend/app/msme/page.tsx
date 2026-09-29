'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  FileText, 
  TrendingUp,
  Download
} from 'lucide-react';

export default function MSMEWizardPage() {
  const [step, setStep] = useState(1);
  const [simpleView, setSimpleView] = useState(true);

  // Form State
  const [sector, setSector] = useState('Electronics & Lighting');
  const [location, setLocation] = useState('Gujarat (Rajkot Industrial Hub)');
  const [productModel, setProductModel] = useState('LED Bulbs 9W / 12W B22');
  const [hasStandard, setHasStandard] = useState('yes');
  const [hasTestReports, setHasTestReports] = useState('no');
  const [hasBISLicence, setHasBISLicence] = useState('no');
  const [targetMarket, setTargetMarket] = useState('Domestic Pan-India + GeM Portal');

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gov-navy tracking-tight">MSME Compliance Assistant</h1>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step roadmap wizard tailored for Micro, Small and Medium Enterprises to achieve BIS certification and QCO compliance.
          </p>
        </div>

        {/* Explain Simply Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex text-xs font-bold">
          <button
            onClick={() => setSimpleView(true)}
            className={`px-3 py-1.5 rounded transition-colors ${simpleView ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-600'}`}
          >
            Explain Simply
          </button>
          <button
            onClick={() => setSimpleView(false)}
            className={`px-3 py-1.5 rounded transition-colors ${!simpleView ? 'bg-white text-gov-navy shadow-xs' : 'text-slate-600'}`}
          >
            Show Technical Details
          </button>
        </div>
      </div>

      {/* Stepper Wizard Progress */}
      <div className="bg-white rounded-xl border border-gov-border p-5 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-200">
          <span>Step {step} of 8: {
            step === 1 ? 'Industry Sector' :
            step === 2 ? 'Manufacturing Location' :
            step === 3 ? 'Product Specifications' :
            step === 4 ? 'Standard Identification' :
            step === 5 ? 'Testing History' :
            step === 6 ? 'Licensing Status' :
            step === 7 ? 'Target Market' : 'Compliance Roadmap'
          }</span>
          <span className="text-gov-navy">MSME Fast-Track Track</span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">1. What do you manufacture?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Electronics & Lighting',
                'Household Appliances (Irons, Mixers)',
                'Steel & Metal Fabrications',
                'Cement & Building Materials',
                'Gold & Silver Jewellery',
                'Food Products & Water'
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`p-3.5 rounded-lg border text-left font-bold transition-all ${
                    sector === s ? 'border-gov-navy bg-slate-50 text-gov-navy ring-1 ring-gov-navy' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">2. Where is your manufacturing unit located?</h3>
            <p className="text-slate-500">
              {simpleView
                ? 'Your factory location helps us recommend nearby BIS branch offices and testing laboratories to minimize sample shipping costs.'
                : 'Geospatial mapping determines jurisdictional BIS Regional Branch Office (BO) and nearest NABL testing clusters.'}
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Surat, Gujarat / Okhla, New Delhi / Peenya, Bengaluru"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">3. What product/model do you want to certify?</h3>
            <input
              type="text"
              value={productModel}
              onChange={(e) => setProductModel(e.target.value)}
              placeholder="e.g. 9W LED Bulb B22 / Electric Dry Iron 1000W"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">4. Do you already have a standard identified?</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasStd"
                  checked={hasStandard === 'yes'}
                  onChange={() => setHasStandard('yes')}
                />
                <span className="font-semibold text-slate-800">Yes, we know the standard (e.g. IS 16102)</span>
              </label>
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasStd"
                  checked={hasStandard === 'no'}
                  onChange={() => setHasStandard('no')}
                />
                <span className="font-semibold text-slate-800">No, help me identify the correct standard</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">5. Do you already have test reports from an external lab?</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasTest"
                  checked={hasTestReports === 'yes'}
                  onChange={() => setHasTestReports('yes')}
                />
                <span className="font-semibold text-slate-800">Yes, we have a test report within the last 12 months</span>
              </label>
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasTest"
                  checked={hasTestReports === 'no'}
                  onChange={() => setHasTestReports('no')}
                />
                <span className="font-semibold text-slate-800">No, we have not tested with an accredited lab yet</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">6. Do you currently hold a BIS Licence?</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasLic"
                  checked={hasBISLicence === 'yes'}
                  onChange={() => setHasBISLicence('yes')}
                />
                <span className="font-semibold text-slate-800">Yes, holding active or expired licence</span>
              </label>
              <label className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="hasLic"
                  checked={hasBISLicence === 'no'}
                  onChange={() => setHasBISLicence('no')}
                />
                <span className="font-semibold text-slate-800">No, this will be our first application (Fresh Grant)</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 7 */}
        {step === 7 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900">7. What is your target distribution market?</h3>
            <div className="space-y-2">
              {[
                'Domestic Indian Retail & Wholesale Markets',
                'Government e-Marketplace (GeM) & PSU Tenders',
                'Export to Middle East / South Asia',
                'E-Commerce Platforms (Amazon, Flipkart, Blinkit)'
              ].map((m) => (
                <label key={m} className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="targetM"
                    checked={targetMarket === m}
                    onChange={() => setTargetMarket(m)}
                  />
                  <span className="font-semibold text-slate-800">{m}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Generated Roadmap */}
        {step === 8 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-900 uppercase">Tailored MSME Certification Roadmap</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-0.5">
                  Roadmap for: {productModel} ({sector})
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-white text-emerald-800 border border-emerald-200">
                50% MSME Fee Subsidy Applicable
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-gov-navy text-sm">Phase 1: Factory In-House Testing Setup (Days 1–15)</div>
                <p className="text-slate-600">
                  {simpleView
                    ? 'Purchase essential testing tools (voltmeter, insulation tester) and calibrate them at a recognized laboratory.'
                    : 'Set up in-house routine test bench compliant with Scheme of Inspection and Testing (SIT). Calibrate gauges with NABL traceability.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-gov-navy text-sm">Phase 2: Independent Lab Type Testing (Days 16–35)</div>
                <p className="text-slate-600">
                  {simpleView
                    ? 'Send 5 product samples to a nearby BIS lab like ERDA or NTH to verify safety and performance before submitting application.'
                    : 'Dispatch conformity samples to recognized laboratory for complete type test sequence. Receive passing test report.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-gov-navy text-sm">Phase 3: BIS Manakonline Application (Days 36–50)</div>
                <p className="text-slate-600">
                  {simpleView
                    ? 'Upload Udyam MSME certificate to claim 50% discount on BIS marking fee and submit Form-V online.'
                    : 'Submit online application with test report, factory layout, SIT manual, and Udyam registration on Manakonline.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-gov-navy text-sm">Phase 4: Factory Audit & Grant of ISI Licence (Days 51–65)</div>
                <p className="text-slate-600">
                  {simpleView
                    ? 'BIS inspecting officer visits your factory to inspect production and verify test bench. Licence granted within 15 days.'
                    : 'BIS assessment officer conducts physical verification of manufacturing setup. Grant of licence issued under Scheme-I.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/compliance"
                className="px-4 py-2 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold transition-colors"
              >
                Generate Pre-Audit Checklist →
              </Link>
              <Link
                href="/labs"
                className="px-4 py-2 bg-gov-green hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Find Nearest Testing Lab →
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {step < 8 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-lg bg-gov-navy hover:bg-gov-blue text-white text-xs font-bold transition-colors flex items-center gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Start New Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
