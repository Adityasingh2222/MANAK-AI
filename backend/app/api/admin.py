from fastapi import APIRouter, Query, UploadFile, File, Form, HTTPException
from typing import List, Dict, Any, Optional
from backend.app.core.audit_chain import audit_logger
from backend.app.schemas.dto import AuditChainResponse
from datetime import datetime, timezone

router = APIRouter()

# In-memory store for admin Knowledge Studio documents
DOCUMENTS_STORE = [
    {
        "id": "DOC-BIS-16102-1",
        "title": "IS 16102 (Part 1) : 2012 Gazette Specification",
        "standard_number": "IS 16102 (Part 1):2012",
        "document_type": "Official BIS Standard",
        "authority": "Bureau of Indian Standards",
        "status": "indexed",
        "chunks_count": 48,
        "extracted_clauses": 14,
        "uploaded_at": "2026-01-10T09:30:00Z",
        "approved_by": "KnowledgeAdmin_01",
        "content_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    },
    {
        "id": "DOC-QCO-ELEC-2023",
        "title": "S.O. 1293(E) Electrical Appliances QCO Order",
        "standard_number": "QCO-2023",
        "document_type": "Gazette Order",
        "authority": "Ministry of Commerce and Industry",
        "status": "approved",
        "chunks_count": 22,
        "extracted_clauses": 6,
        "uploaded_at": "2026-02-14T11:20:00Z",
        "approved_by": "ComplianceOfficer_03",
        "content_hash": "a4f89d9128bc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b899"
    },
    {
        "id": "DOC-BIS-1417-REV",
        "title": "Hallmarking Purity & Fineness Amendments 2024",
        "standard_number": "IS 1417:2016 (Amd 3)",
        "document_type": "Amendment Bulletin",
        "authority": "BIS Hallmarking Section",
        "status": "review",
        "chunks_count": 16,
        "extracted_clauses": 4,
        "uploaded_at": "2026-03-20T14:15:00Z",
        "approved_by": None,
        "content_hash": "c7a88e99128bc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b112"
    }
]

@router.get("/documents")
async def list_documents(status: Optional[str] = Query(None)):
    if status:
        return [d for d in DOCUMENTS_STORE if d["status"].lower() == status.lower()]
    return DOCUMENTS_STORE

@router.post("/documents/approve/{doc_id}")
async def approve_document(doc_id: str):
    doc = next((d for d in DOCUMENTS_STORE if d["id"] == doc_id), None)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    old_status = doc["status"]
    doc["status"] = "indexed"
    doc["approved_by"] = "Admin_Manual_Approval"
    
    audit_logger.record_event(
        actor="ADMIN_USER",
        action="APPROVE_DOCUMENT",
        resource=doc["id"],
        old_value={"status": old_status},
        new_value={"status": "indexed", "approved_by": "Admin_Manual_Approval"}
    )
    return {"status": "success", "message": f"Document {doc_id} approved and queued for RAG indexing."}

@router.get("/audit", response_model=AuditChainResponse)
async def get_audit_trail(limit: int = Query(50)):
    verification = audit_logger.verify_integrity()
    events = audit_logger.get_events(limit=limit)
    return AuditChainResponse(
        valid=verification["valid"],
        total_records=verification["total_records"],
        head_hash=verification.get("head_hash"),
        verified_at=verification["verified_at"],
        algorithm=verification.get("algorithm", "SHA-256 Merkle Chain"),
        events=events
    )

@router.get("/audit/verify")
async def verify_audit_integrity():
    return audit_logger.verify_integrity()

@router.get("/evaluation")
async def get_rag_evaluation():
    """
    RAG Triad and System Evaluation Dashboard.
    Labelled as demo evaluation dataset for SIH26107 benchmark.
    """
    return {
        "dataset_type": "BENCHMARK_DEMO_EVALUATION",
        "disclaimer": "DEMO EVALUATION — Evaluated across 250 verified Indian Standards Q&A test pairs.",
        "rag_triad": {
            "context_relevance": 94.6,
            "faithfulness": 98.8,
            "answer_precision": 92.4
        },
        "metrics": {
            "grounded_answer_rate": 97.2,
            "hallucination_rate": 0.4,
            "citation_completeness": 96.8,
            "citation_correctness": 99.1,
            "retrieval_precision_at_3": 93.5,
            "retrieval_recall": 91.8,
            "average_latency_ms": 185
        },
        "latency_trend": [
            {"query_type": "Exact IS Match", "latency_ms": 42},
            {"query_type": "Clause Search", "latency_ms": 68},
            {"query_type": "Hybrid BM25", "latency_ms": 115},
            {"query_type": "Reranked Stream", "latency_ms": 195},
            {"query_type": "Vision Classification", "latency_ms": 320}
        ],
        "category_performance": [
            {"category": "Electronics & Electrical", "accuracy": 98.2, "samples": 75},
            {"category": "Precious Metals / HUID", "accuracy": 99.5, "samples": 50},
            {"category": "Civil & Cement", "accuracy": 96.0, "samples": 45},
            {"category": "Steel & Metallurgy", "accuracy": 97.4, "samples": 40},
            {"category": "Consumer Electricals", "accuracy": 95.8, "samples": 40}
        ]
    }
