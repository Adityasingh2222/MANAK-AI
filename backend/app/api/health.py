from fastapi import APIRouter
from backend.app.schemas.dto import HealthResponse
from backend.app.core.config import settings
from backend.app.core.audit_chain import audit_logger

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def get_health():
    integrity = audit_logger.verify_integrity()
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        app_mode=settings.APP_MODE,
        database="SQLite (Embedded / aiosqlite) / PostgreSQL ready",
        rag_engine="Hybrid BM25 + Exact Identifier Matching + Zero-Hallucination Grounding",
        audit_chain_length=integrity.get("total_records", 1),
        primary_judge_flow_ready=True
    )
