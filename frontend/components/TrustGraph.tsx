'use client';

import React, { useState } from 'react';
import { Database, FileCode, Cpu, FileCheck, Award, Lock, ArrowRight, Info } from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  type: string;
  status: string;
  details: string;
  authority: string;
}

export const TrustGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('source');

  const nodes: NodeData[] = [
    {
      id: 'source',
      label: 'BIS Gazette Source',
      type: 'Authority Source',
      status: 'Verified',
      authority: 'Bureau of Indian Standards',
      details: 'Official Gazette publication authenticated against repository checksum. Ingestion timestamp: 2026-01-10.'
    },
    {
      id: 'clause',
      label: 'Clause Evidence',
      type: 'Extracted Clause',
      status: 'Indexed',
      authority: 'Electrotechnical Division (ETD 23)',
      details: 'Parsed using Docling/LlamaIndex JSON node extraction with preserved hierarchy, page number, and test parameters.'
    },
    {
      id: 'ai',
      label: 'Zero-Hallucination AI',
      type: 'Retrieval Engine',
      status: 'Constrained',
      authority: 'Gemini / Dense-Sparse Pipeline',
      details: 'Strict grounding guardrails prevent invention of non-existent standards. If evidence is lacking, it refuses to speculate.'
    },
    {
      id: 'answer',
      label: 'Grounded Answer',
      type: 'Synthesized Guidance',
      status: 'Validated',
      authority: 'MANAK-AI Compliance Engine',
      details: 'Directly maps user product inquiry to corresponding mandatory Indian Standard and Quality Control Order (QCO).'
    },
    {
      id: 'citation',
      label: 'Official Citation',
      type: 'Traceable Reference',
      status: 'Attached',
      authority: 'IS 16102 (Part 1):2012 Cl 8.1',
      details: 'Strict format: [IS Standard Number], [Year], [Clause], [Sub-clause]. Direct page reference attached.'
    },
    {
      id: 'audit',
      label: 'SHA-256 Audit Log',
      type: 'Tamper-Evident Ledger',
      status: 'Sealed',
      authority: 'Append-Only Merkle Chain',
      details: 'Cryptographically chained with previous event hash. Validated for immutability and compliance verification.'
    }
  ];

  const activeNode = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="w-full bg-slate-900 text-white rounded-xl p-5 border border-slate-700 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Trust Graph — Grounded Verification Chain
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any node in the lineage to inspect how every compliance statement is verified and tamper-sealed.
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700">
          Source-to-Audit Lineage
        </span>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="flex flex-wrap items-center justify-between gap-2 my-5 px-2">
        {nodes.map((node, index) => {
          const isSelected = node.id === selectedNode;
          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setSelectedNode(node.id)}
                className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center min-w-[110px] flex-1 ${
                  isSelected
                    ? 'border-gov-saffron bg-gov-navy ring-2 ring-gov-saffron/40 shadow-lg text-white'
                    : 'border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center mb-1 text-xs font-bold text-gov-saffronLight">
                  0{index + 1}
                </div>
                <div className="text-xs font-bold truncate max-w-[100px]">{node.label}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">✓ {node.status}</div>
              </button>
              {index < nodes.length - 1 && (
                <div className="hidden lg:flex text-slate-600">
                  <ArrowRight className="w-4 h-4 text-gov-saffron/80" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-gov-blue/40 border border-gov-blue text-amber-300 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <span>{activeNode.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {activeNode.type}
              </span>
            </div>
            <p className="text-slate-400 mt-1 leading-relaxed">{activeNode.details}</p>
          </div>
        </div>
        <div className="shrink-0 text-right md:border-l md:border-slate-800 md:pl-4">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Authority / Standard</div>
          <div className="text-xs font-semibold text-amber-300 mt-0.5">{activeNode.authority}</div>
        </div>
      </div>
    </div>
  );
};
