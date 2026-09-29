'use client';

import React, { useState } from 'react';
import { exportChecklist } from '@/lib/api';
import { 
  CheckSquare, 
  Square, 
  Download, 
  FileText, 
  Table, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  User,
  Calendar
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  requirement: string;
  clause: string;
  evidence_needed: string;
  priority: string;
  completed: boolean;
  owner: string;
  due_date: string;
  notes?: string;
}

interface ComplianceChecklistProps {
  initialItems?: ChecklistItem[];
  productName?: string;
  standardId?: string;
  overallScore?: number;
}

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({
  initialItems = [
    {
      id: "CHK-001",
      requirement: "Calibration of all routine testing instruments by NABL accredited lab",
      clause: "BIS Act 2016 / Scheme-I SIT Cl 3.1",
      evidence_needed: "Valid calibration certificates with traceability to national standards",
      priority: "Critical",
      completed: true,
      owner: "Quality Assurance Manager",
      due_date: "2026-10-10",
      notes: "Thermocouples, Megger and multimeters calibrated on 2026-02-15"
    },
    {
      id: "CHK-002",
      requirement: "Scheme of Inspection and Testing (SIT) documentation and implementation",
      clause: "BIS General Guidelines Cl 4",
      evidence_needed: "Controlled copy of SIT manual with designated QC personnel sign-off",
      priority: "Critical",
      completed: false,
      owner: "Technical Director",
      due_date: "2026-10-15",
      notes: "Review draft against latest BIS guidelines"
    },
    {
      id: "CHK-003",
      requirement: "Verification of raw material test certificates (MTC)",
      clause: "Raw Material Quality Cl 2",
      evidence_needed: "Supplier mill test certificates for each production batch",
      priority: "High",
      completed: true,
      owner: "Procurement Lead",
      due_date: "2026-10-12",
      notes: "Suppliers verified against ISO 9001 / BIS licences"
    },
    {
      id: "CHK-004",
      requirement: "Marking and Label Artwork Compliance (ISI Mark / CRS / HUID)",
      clause: "Standard Marking Clause",
      evidence_needed: "Product rating plate samples, packaging carton master artworks with correct font size",
      priority: "Critical",
      completed: false,
      owner: "Packaging Team",
      due_date: "2026-10-18",
      notes: "Ensure CM/L number or CRS registration number format is exact"
    },
    {
      id: "CHK-005",
      requirement: "Type Test Report from BIS-Recognized or NABL Laboratory",
      clause: "Conformity Assessment Regulations",
      evidence_needed: "Complete type test report not older than 12 months with no test failures",
      priority: "Critical",
      completed: false,
      owner: "R&D Engineer",
      due_date: "2026-10-25",
      notes: "Samples dispatched to ERDA / NTH for testing"
    }
  ],
  productName = "LED Lamp 9W (Self-Ballasted)",
  standardId = "IS 16102 (Part 1):2012",
  overallScore = 88,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [exporting, setExporting] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv' | 'json') => {
    setExporting(format);
    try {
      const blob = await exportChecklist(
        format,
        { product_name: productName, standard_id: standardId, overall_score: overallScore },
        items
      );
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `manak_compliance_checklist.${format === 'excel' ? 'xlsx' : format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert(`Export to ${format.toUpperCase()} failed.`);
    } finally {
      setExporting(null);
    }
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="w-full bg-white rounded-xl border border-gov-border shadow-sm p-5 space-y-5">
      {/* Header and Export Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gov-navy"></span>
            <h3 className="text-base font-bold text-gov-navy tracking-tight uppercase">
              Pre-Audit Compliance Checklist
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Targeted requirements for <b>{productName}</b> under <b>{standardId}</b>
          </p>
        </div>

        {/* 4 Professional Export Buttons */}
        <div className="flex items-center space-x-1.5 flex-wrap gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">Export:</span>
          <button
            onClick={() => handleExport('pdf')}
            disabled={!!exporting}
            className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            disabled={!!exporting}
            className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => handleExport('csv')}
            disabled={!!exporting}
            className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            disabled={!!exporting}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
          <span className="text-gov-navy">Checklist Completion: {completedCount} of {items.length} items ({progressPercent}%)</span>
          <span className="text-emerald-700">Audit Readiness: {progressPercent >= 80 ? 'Ready for Application' : 'In Preparation'}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gov-green transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Items Table */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
              item.completed
                ? 'bg-slate-50/70 border-slate-200 text-slate-700'
                : 'bg-white border-amber-200 shadow-xs text-slate-900 hover:border-amber-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                  className="mt-0.5 text-gov-navy"
                >
                  {item.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <div>
                  <div className={`font-bold ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.requirement}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span><b>Clause:</b> {item.clause}</span>
                    <span><b>Evidence:</b> {item.evidence_needed}</span>
                  </div>
                  {item.notes && (
                    <div className="text-[11px] text-slate-600 italic mt-1 bg-amber-50/50 p-1.5 rounded border border-amber-100">
                      Note: {item.notes}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-end space-y-1.5 text-right">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.priority === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.priority}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <User className="w-3 h-3" /> {item.owner}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Due: {item.due_date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
