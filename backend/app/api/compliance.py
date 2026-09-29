from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.schemas.dto import ComplianceAssessRequest, ComplianceAssessResponse, ChecklistItem
from backend.app.services.compliance_service import compliance_service

router = APIRouter()

@router.post("/assess", response_model=ComplianceAssessResponse)
async def assess_compliance(req: ComplianceAssessRequest):
    return compliance_service.assess_readiness(req)

@router.get("/checklist/{standard_id}", response_model=List[ChecklistItem])
async def get_checklist(standard_id: str):
    return compliance_service.generate_checklist(standard_id)

@router.get("/pulse")
async def get_compliance_pulse():
    """
    Compliance Pulse timeline: Product -> Standard -> QCO -> Tests -> Lab -> Docs -> Certification -> Verification.
    """
    return {
        "status": "In Progress",
        "current_stage": "Testing & Laboratory Selection",
        "stages": [
            {"id": "product", "title": "Product Identified", "status": "completed", "timestamp": "2026-03-28T10:00:00Z"},
            {"id": "standard", "title": "Standard Mapped (IS 16102)", "status": "completed", "timestamp": "2026-03-28T10:05:00Z"},
            {"id": "qco", "title": "QCO Verified (Mandatory Scheme-I)", "status": "completed", "timestamp": "2026-03-28T10:07:00Z"},
            {"id": "tests", "title": "5 Routine & Type Tests Mapped", "status": "completed", "timestamp": "2026-03-28T10:10:00Z"},
            {"id": "lab", "title": "Lab Selected (ERDA Vadodara)", "status": "active", "timestamp": "Pending Sample Dispatch"},
            {"id": "docs", "title": "Quality Manual & Test Records", "status": "pending", "timestamp": "Pending SIT Finalization"},
            {"id": "cert", "title": "BIS Portal Application", "status": "pending", "timestamp": "Awaiting Lab Report"},
            {"id": "verify", "title": "Grant of Licence / ISI Mark", "status": "pending", "timestamp": "Final Stage"}
        ],
        "notifications": [
            {"id": "N1", "text": "QCO compliance deadline for MSMEs approaching in 45 days.", "level": "warning"},
            {"id": "N2", "text": "New testing facility recognized for Photometry in Western Region.", "level": "info"}
        ]
    }
