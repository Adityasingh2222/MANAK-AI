import { CopilotPanel } from '@/components/CopilotPanel';

export default function CopilotPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm">
        <h1 className="text-2xl font-black text-gov-navy tracking-tight">AI Standards Copilot</h1>
        <p className="text-xs text-slate-500 mt-1">
          Query Indian Standards, clause requirements, QCO rules, and test procedures. Responses are strictly grounded in authoritative BIS publications.
        </p>
      </div>

      <CopilotPanel />
    </div>
  );
}
