from fastapi import APIRouter
from backend.app.api import (
    health,
    copilot,
    scan,
    standards,
    compliance,
    labs,
    verification,
    consumer,
    updates,
    admin,
    exports
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(copilot.router, prefix="/copilot", tags=["AI Copilot"])
api_router.include_router(scan.router, prefix="/scan", tags=["Product Scanner"])
api_router.include_router(standards.router, prefix="/standards", tags=["Standards Discovery"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["Compliance Engine"])
api_router.include_router(labs.router, prefix="/labs", tags=["Laboratory Finder"])
api_router.include_router(verification.router, prefix="/verification", tags=["Verification Centre"])
api_router.include_router(consumer.router, prefix="/consumer", tags=["Consumer Portal"])
api_router.include_router(updates.router, prefix="/updates", tags=["Updates & Gazette"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin & Audit"])
api_router.include_router(exports.router, prefix="/exports", tags=["Reports & Exports"])
