const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Citation {
  standard_number: string;
  year: number;
  clause: string;
  sub_clause?: string;
  formatted_citation: string;
  source_document: string;
  page?: number;
  confidence: number;
  evidence_text: string;
}

export interface TrustLayerSignals {
  source_verified: boolean;
  version_checked: boolean;
  clause_retrieved: boolean;
  ai_grounded: boolean;
  citation_attached: boolean;
  audit_logged: boolean;
}

export interface CopilotResponse {
  query: string;
  answer: string;
  simple_explanation?: string;
  technical_details?: string;
  applicable_standard?: string;
  exact_clause?: string;
  citations: Citation[];
  trust_layer: TrustLayerSignals;
  trust_graph_nodes: any[];
  next_recommended_actions: string[];
  app_mode: string;
  audit_event_hash?: string;
}

export interface ScanResult {
  scenario_id: string;
  product_name: string;
  product_category: string;
  brand: string;
  model: string;
  detected_text: string;
  rating_plate: Record<string, any>;
  applicable_standard: string;
  standard_id: string;
  qco_status: string;
  cml_detected?: string;
  huid_detected?: string;
  confidence_score: number;
  required_tests: Array<{ name: string; clause: string; priority: string }>;
  suggested_labs: Array<{ id?: string; name: string; accreditation: string; distance_km?: number }>;
  compliance_readiness: {
    overall_score: number;
    breakdown: Record<string, number>;
    status: string;
    missing_actions: string[];
  };
  trust_layer: TrustLayerSignals;
  app_mode: string;
  disclaimer: string;
}

export async function askCopilot(query: string, language: string = 'en', mode: string = 'standard'): Promise<CopilotResponse> {
  const res = await fetch(`${API_BASE}/copilot/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, language, mode }),
  });
  if (!res.ok) throw new Error('Copilot query failed');
  return res.json();
}

export async function scanProduct(scenarioOverride?: string, ocrHint?: string, imageBase64?: string): Promise<ScanResult> {
  const res = await fetch(`${API_BASE}/scan/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scenario_override: scenarioOverride,
      ocr_hint: ocrHint,
      image_base64: imageBase64,
    }),
  });
  if (!res.ok) throw new Error('Product scan failed');
  return res.json();
}

export async function searchStandards(q?: string, category?: string) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (category) params.set('category', category);
  const res = await fetch(`${API_BASE}/standards/search?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to search standards');
  return res.json();
}

export async function getStandardById(id: string) {
  const res = await fetch(`${API_BASE}/standards/${id}`);
  if (!res.ok) throw new Error(`Standard ${id} not found`);
  return res.json();
}

export async function getClausesForStandard(id: string) {
  const res = await fetch(`${API_BASE}/standards/${id}/clauses`);
  if (!res.ok) throw new Error(`Clauses for ${id} not found`);
  return res.json();
}

export async function verifyIdentifier(type: string, value: string) {
  const res = await fetch(`${API_BASE}/verification/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier_type: type, identifier_value: value }),
  });
  if (!res.ok) throw new Error('Verification failed');
  return res.json();
}

export async function searchLabs(query?: string, standard?: string, accreditation?: string, state?: string) {
  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (standard) params.set('standard', standard);
  if (accreditation) params.set('accreditation', accreditation);
  if (state) params.set('state', state);
  const res = await fetch(`${API_BASE}/labs/search?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to search labs');
  return res.json();
}

export async function assessCompliance(payload: any) {
  const res = await fetch(`${API_BASE}/compliance/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Compliance assessment failed');
  return res.json();
}

export async function exportChecklist(format: 'pdf' | 'excel' | 'csv' | 'json', metadata: any, checklist: any[]) {
  const res = await fetch(`${API_BASE}/exports/checklist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      format,
      product_name: metadata.product_name,
      standard_id: metadata.standard_id,
      overall_score: metadata.overall_score,
      checklist,
    }),
  });
  if (!res.ok) throw new Error('Export failed');
  return res.blob();
}

export async function getUpdates(category?: string) {
  const url = category ? `${API_BASE}/updates?category=${category}` : `${API_BASE}/updates`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch updates');
  return res.json();
}

export async function getAuditTrail() {
  const res = await fetch(`${API_BASE}/admin/audit`);
  if (!res.ok) throw new Error('Failed to fetch audit log');
  return res.json();
}

export async function getRagEvaluation() {
  const res = await fetch(`${API_BASE}/admin/evaluation`);
  if (!res.ok) throw new Error('Failed to fetch RAG evaluation');
  return res.json();
}
