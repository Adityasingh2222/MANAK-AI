from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str
    version: str
    app_mode: str
    database: str
    rag_engine: str
    audit_chain_length: int
    primary_judge_flow_ready: bool

class Citation(BaseModel):
    standard_number: str
    year: int
    clause: str
    sub_clause: Optional[str] = None
    formatted_citation: str
    source_document: str
    page: Optional[int] = None
    confidence: float
    evidence_text: str

class TrustLayerSignals(BaseModel):
    source_verified: bool = True
    version_checked: bool = True
    clause_retrieved: bool = True
    ai_grounded: bool = True
    citation_attached: bool = True
    audit_logged: bool = True

class CopilotQueryRequest(BaseModel):
    query: str
    language: str = "en"
    mode: Optional[str] = "standard"  # standard, simple, technical
    session_id: Optional[str] = None

class CopilotQueryResponse(BaseModel):
    query: str
    answer: str
    simple_explanation: Optional[str] = None
    technical_details: Optional[str] = None
    applicable_standard: Optional[str] = None
    exact_clause: Optional[str] = None
    citations: List[Citation] = []
    trust_layer: TrustLayerSignals = Field(default_factory=TrustLayerSignals)
    trust_graph_nodes: List[Dict[str, Any]] = []
    next_recommended_actions: List[str] = []
    app_mode: str = "demo"

class ScanAnalyzeRequest(BaseModel):
    image_base64: Optional[str] = None
    image_url: Optional[str] = None
    scenario_override: Optional[str] = None  # e.g. "scenario-1-led-lamp"
    ocr_hint: Optional[str] = None

class ProductRatingPlate(BaseModel):
    wattage: Optional[str] = None
    voltage: Optional[str] = None
    frequency: Optional[str] = None
    lumens: Optional[str] = None
    purity: Optional[str] = None
    weight: Optional[str] = None
    grade: Optional[str] = None
    diameter: Optional[str] = None
    cml: Optional[str] = None
    huid: Optional[str] = None
    crs: Optional[str] = None

class RequiredTest(BaseModel):
    name: str
    clause: str
    priority: str  # Critical, High, Medium

class LabSummary(BaseModel):
    id: Optional[str] = None
    name: str
    accreditation: str
    distance_km: Optional[int] = None
    city: Optional[str] = None
    state: Optional[str] = None
    tested_standards: List[str] = []

class ComplianceReadiness(BaseModel):
    overall_score: int
    breakdown: Dict[str, int]
    status: str
    missing_actions: List[str]

class ScanAnalyzeResponse(BaseModel):
    scenario_id: str
    product_name: str
    product_category: str
    brand: str
    model: str
    detected_text: str
    rating_plate: Dict[str, Any]
    applicable_standard: str
    standard_id: str
    qco_status: str
    cml_detected: Optional[str] = None
    huid_detected: Optional[str] = None
    confidence_score: float
    required_tests: List[RequiredTest]
    suggested_labs: List[LabSummary]
    compliance_readiness: ComplianceReadiness
    trust_layer: TrustLayerSignals = Field(default_factory=TrustLayerSignals)
    app_mode: str = "demo"
    disclaimer: str = "DEMO MODE — Simulated vision pipeline for SIH26107 demonstration."

class StandardDetail(BaseModel):
    id: str
    standard_number: str
    title: str
    year: int
    status: str
    authority: str
    category: str
    scope: str
    committee: str
    qco_applicable: bool
    qco_name: Optional[str] = None
    scheme: str
    effective_date: str
    is_mandatory: bool
    required_tests: List[Dict[str, str]]
    applicable_labs: List[str]

class ClauseItem(BaseModel):
    id: str
    standard_id: str
    standard_number: str
    year: int
    clause: str
    sub_clause: Optional[str] = None
    title: str
    page: int
    section: str
    citation: str
    text: str
    status: str
    source_doc: str

class ComplianceAssessRequest(BaseModel):
    product_name: str
    standard_id: str
    manufacturer_type: str = "MSME"  # Micro, Small, Medium, Large
    company_size: str = "1-10 employees"
    has_test_reports: bool = False
    has_in_house_lab: bool = False
    has_quality_manual: bool = False
    has_calibrated_instruments: bool = False
    has_traceability_system: bool = False

class ChecklistItem(BaseModel):
    id: str
    requirement: str
    clause: str
    evidence_needed: str
    priority: str
    completed: bool = False
    owner: str = "Quality Lead"
    due_date: str = "2026-10-15"
    notes: Optional[str] = None

class ComplianceAssessResponse(BaseModel):
    overall_score: int
    category_scores: Dict[str, int]
    status: str
    readiness_level: str
    key_gaps: List[str]
    action_plan: List[str]
    checklist: List[ChecklistItem]

class VerificationRequest(BaseModel):
    identifier_type: str  # isi, huid, crs, cml
    identifier_value: str

class VerificationResponse(BaseModel):
    identifier_type: str
    identifier_value: str
    is_valid: bool
    status: str
    source_authority: str
    timestamp: str
    details: Dict[str, Any]
    demo_mode: bool = True
    disclaimer: str

class AuditChainResponse(BaseModel):
    valid: bool
    total_records: int
    head_hash: Optional[str] = None
    verified_at: str
    algorithm: str
    events: List[Dict[str, Any]]
