import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.core.config import settings
from backend.app.api.router import api_router
from backend.app.core.audit_chain import audit_logger

app = FastAPI(
    title="MANAK-AI — Standards, Verification & Compliance Engine",
    description="Backend API for Problem Statement SIH26107 (Smart India Hackathon 2026). Bureau of Indian Standards Intelligence Infrastructure.",
    version=settings.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request tracking & execution latency middleware
@app.middleware("http")
async def add_process_time_and_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    response.headers["X-App-Mode"] = settings.APP_MODE
    return response

# Mount core API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "project": "MANAK-AI",
        "tagline": "Understand Standards. Verify Products. Build with Confidence.",
        "problem_statement": "SIH26107",
        "team": "RushLiners",
        "domain": "Smart Automation",
        "docs_url": "/api/docs",
        "health_check": "/api/health",
        "mode": settings.APP_MODE
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
