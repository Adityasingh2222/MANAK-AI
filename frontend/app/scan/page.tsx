import { ProductScanner } from '@/components/ProductScanner';

export default function ScanPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">Multimodal Product Scanner</h1>
        <p className="text-xs text-slate-500 mt-1">
          Scan product rating plates, packages, or laser inscriptions via live camera to automatically identify applicable Indian Standards, QCO status, required laboratory tests, and compliance score.
        </p>
      </div>

      <ProductScanner />
    </div>
  );
}
