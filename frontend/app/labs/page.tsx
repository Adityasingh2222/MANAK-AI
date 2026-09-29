import { LabFinder } from '@/components/LabFinder';

export default function LabsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Geospatial Laboratory Discovery</h1>
        <p className="text-xs text-slate-500 mt-1">
          Search, filter, and connect with BIS-recognized and NABL-accredited testing laboratories across India by standard, product category, test scope, and turnaround capabilities.
        </p>
      </div>

      <LabFinder />
    </div>
  );
}
