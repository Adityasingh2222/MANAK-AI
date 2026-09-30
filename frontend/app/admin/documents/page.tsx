'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Check, 
  RefreshCw,
  Hash
} from 'lucide-react';

export default function KnowledgeStudioPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/documents');
      const data = await res.json();
      setDocuments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleApprove = async (docId: string) => {
    try {
      const res = await fetch(`/api/admin/documents/approve/${docId}`, {
        method: 'POST'
      });
      const data = await res.json();
      setSuccessMsg(data.message);
      fetchDocs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e) {
      alert('Error approving document');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Navigation */}
      <div className="bg-white rounded-xl border border-gov-border p-6 shadow-sm space-y-2">
        <Link href="/admin" className="text-xs text-gov-navy hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gov-navy tracking-tight">Knowledge Studio</h1>
            <p className="text-xs text-slate-500 mt-1">
              Docling/LlamaIndex ingestion pipeline: inspect parsed JSON chunks, verify clause hierarchy, and approve documents for RAG vector indexing.
            </p>
          </div>
          <button
            onClick={() => alert('Document ingestion upload dialog simulated.')}
            className="px-4 py-2 bg-gov-navy hover:bg-gov-blue text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Standard Document</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Documents Lifecycle Table */}
      <div className="bg-white rounded-xl border border-gov-border shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-700">
          <span>Ingested Documents & Standards Specifications ({documents.length})</span>
          <span className="text-slate-400 font-mono">States: review → approved → indexed</span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-gov-navy text-xs">{doc.standard_number}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    doc.status === 'indexed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : doc.status === 'approved'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {doc.status}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {doc.document_type}
                  </span>
                </div>

                <div className="font-extrabold text-slate-900 text-sm">{doc.title}</div>

                <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1 pt-1 font-mono">
                  <span>Chunks: <b>{doc.chunks_count}</b></span>
                  <span>Extracted Clauses: <b>{doc.extracted_clauses}</b></span>
                  <span>Uploaded: {doc.uploaded_at.split('T')[0]}</span>
                </div>

                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-0.5">
                  <Hash className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-md">SHA256: {doc.content_hash}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center space-x-2">
                {doc.status === 'review' ? (
                  <button
                    onClick={() => handleApprove(doc.id)}
                    className="px-3.5 py-1.5 bg-gov-green hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Index</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Document ${doc.id} re-indexing triggered.`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs border border-slate-300 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-Index Chunks</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
