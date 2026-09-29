import { VerificationPanel } from '@/components/VerificationPanel';

export default function VerifyPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">National Verification Centre</h1>
        <p className="text-xs text-slate-500 mt-1">
          Verify authenticity of ISI Mark Licences (CM/L), Gold Hallmarking (6-digit HUID), and MeitY Compulsory Registration Scheme (CRS) numbers.
        </p>
      </div>

      <VerificationPanel />
    </div>
  );
}
