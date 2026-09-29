'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  FileCheck2,
  Copy,
  Check
} from 'lucide-react';
import { askCopilot, CopilotResponse } from '@/lib/api';
import { TrustLayer } from '@/components/TrustLayer';
import { TrustGraph } from '@/components/TrustGraph';

export const CopilotPanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi' | 'hi-en'>('en');
  const [viewMode, setViewMode] = useState<'standard' | 'simple' | 'technical'>('standard');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CopilotResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTrustGraph, setShowTrustGraph] = useState(false);

  // Suggested questions from prompt specification with National Portal Color Themes
  const suggestedQueries = [
    { text: "What BIS standard applies to this LED lamp?", theme: "bg-blue-50 border-blue-300 text-blue-950 hover:bg-blue-500 hover:text-white" },
    { text: "Explain IS 16102 clause 8.1 simply.", theme: "bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-500 hover:text-white" },
    { text: "What tests are required before certification?", theme: "bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-500 hover:text-white" },
    { text: "Find a suitable laboratory for this product.", theme: "bg-cyan-50 border-cyan-300 text-cyan-950 hover:bg-cyan-500 hover:text-white" },
    { text: "Is this product covered by a QCO?", theme: "bg-orange-50 border-orange-300 text-orange-950 hover:bg-orange-500 hover:text-white" },
    { text: "How do I verify this HUID?", theme: "bg-yellow-50 border-yellow-400 text-yellow-950 hover:bg-yellow-500 hover:text-white" },
    { text: "Prepare my MSME compliance checklist.", theme: "bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-600 hover:text-white" }
  ];

  // Browser Speech Recognition with graceful fallback
  const startSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not natively supported in this browser. Please type your query in the text box.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSend(transcript);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const handleSend = async (userQuery?: string) => {
    const q = userQuery || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await askCopilot(q, language, viewMode);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI Copilot');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6 space-y-6">
      {/* Top Header & Language Selector with National Theme */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-navy to-blue-900 text-white flex items-center justify-center font-bold shadow-md border-2 border-amber-400">
            <Bot className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-black text-gov-navy">MANAK-AI Standards Copilot</h3>
            <p className="text-xs text-slate-500 font-medium">Zero-hallucination regulatory guidance grounded in official BIS publications</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Simple vs Technical View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex text-xs font-bold">
            <button
              onClick={() => setViewMode('standard')}
              className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'standard' ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Standard
            </button>
            <button
              onClick={() => setViewMode('simple')}
              className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'simple' ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Citizen Simple
            </button>
            <button
              onClick={() => setViewMode('technical')}
              className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'technical' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Clause Technical
            </button>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="text-xs bg-slate-100 border-2 border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:border-amber-500"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="hi-en">Hinglish</option>
          </select>
        </div>
      </div>

      {/* Suggested Query Chips with National Portal Colors */}
      <div>
        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Suggested Standards Queries:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(sq.text);
                handleSend(sq.text);
              }}
              className={`text-xs px-3 py-1.5 rounded-full border-2 font-bold transition-all shadow-sm ${sq.theme}`}
            >
              {sq.text}
            </button>
          ))}
        </div>
      </div>

      {/* Query Input Box */}
      <div className="relative">
        <textarea
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about Indian Standards, BIS Scheme-I/II, clause testing parameters, QCO notifications, or lab requirements..."
          className="w-full p-4 pr-28 text-sm bg-slate-50 border-2 border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 text-slate-900 resize-none font-medium shadow-inner"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Input Action Buttons */}
        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
          <button
            onClick={startSpeechRecognition}
            title={isListening ? 'Listening...' : 'Voice Input (Microphone)'}
            className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
              isListening 
                ? 'bg-rose-500 text-white animate-pulse border-rose-600 shadow-md shadow-rose-500/30' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-600" />}
          </button>

          <button
            onClick={() => handleSend()}
            disabled={loading || !query.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-6 text-center bg-amber-50/60 rounded-2xl border-2 border-amber-200 space-y-2">
          <div className="w-9 h-9 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-xs font-black text-amber-950">
            Grounding query in authoritative Indian Standards knowledge base...
          </div>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs rounded-xl font-bold">
          {error}
        </div>
      )}

      {/* Grounded Response Display with Colorful National Portal Themes */}
      {response && !loading && (
        <div className="space-y-5 animate-fadeIn">
          {/* Main Answer Card */}
          <div className="bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/20 border-2 border-blue-200 border-t-4 border-t-blue-600 rounded-2xl p-6 space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-blue-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-black text-gov-navy uppercase tracking-wider">
                  Grounded Regulatory Response
                </span>
                {response.applicable_standard && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-black shadow-sm">
                    {response.applicable_standard}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setShowTrustGraph(!showTrustGraph)}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-gov-navy to-blue-900 text-white text-[11px] font-black hover:opacity-90 shadow-sm"
                >
                  {showTrustGraph ? 'Hide Trust Graph' : 'Inspect Trust Graph'}
                </button>
              </div>
            </div>

            {/* View Mode Content Switcher */}
            {viewMode === 'simple' && response.simple_explanation ? (
              <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-950 text-sm leading-relaxed shadow-inner">
                <div className="text-[11px] font-black text-emerald-800 uppercase mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Citizen Simple Guidance:
                </div>
                {response.simple_explanation}
              </div>
            ) : viewMode === 'technical' && response.technical_details ? (
              <div className="p-4 bg-slate-900 border-2 border-slate-800 rounded-xl text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
                <div className="text-[11px] font-black text-amber-400 uppercase font-sans mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Technical Standards View (Clause Excerpt):
                </div>
                {response.technical_details}
              </div>
            ) : (
              <div className="text-sm text-slate-900 leading-relaxed font-sans font-medium">
                {response.answer}
              </div>
            )}

            {/* Applicable Standard & Exact Clause Callout */}
            {response.applicable_standard && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border-2 border-blue-200 border-l-4 border-l-blue-600 text-xs shadow-sm">
                  <div className="text-[10px] font-black text-blue-800 uppercase">Applicable Standard</div>
                  <div className="font-black text-gov-navy text-sm mt-0.5">{response.applicable_standard}</div>
                </div>
                <div className="p-3.5 bg-white rounded-xl border-2 border-emerald-200 border-l-4 border-l-emerald-600 text-xs shadow-sm">
                  <div className="text-[10px] font-black text-emerald-800 uppercase">Exact Clause Reference</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5">{response.exact_clause || 'General Requirements'}</div>
                </div>
              </div>
            )}

            {/* Citations List with Saffron/Amber Theme */}
            {response.citations.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  Clause-Level Verified Citations
                </div>
                <div className="space-y-2.5">
                  {response.citations.map((c, i) => (
                    <div key={i} className="p-3.5 bg-amber-50/50 rounded-xl border-2 border-amber-200 border-l-4 border-l-[#FF671F] text-xs space-y-1.5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-mono font-black text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                          {c.formatted_citation}
                        </span>
                        <span className="text-[10px] font-bold text-amber-900">
                          Page {c.page} • Confidence: {(c.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed font-sans font-medium">
                        "{c.evidence_text}"
                      </p>
                      <div className="text-[11px] font-bold text-slate-500">
                        Source: {c.source_document}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Trust Graph Component */}
          {showTrustGraph && response.trust_graph_nodes && (
            <TrustGraph nodes={response.trust_graph_nodes} />
          )}

          {/* Trust Layer Verification */}
          <TrustLayer signals={response.trust_layer} />
        </div>
      )}
    </div>
  );
};
