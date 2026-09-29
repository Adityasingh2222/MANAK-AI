import asyncio
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from backend.app.schemas.dto import CopilotQueryRequest, CopilotQueryResponse
from backend.app.rag.pipeline import rag_pipeline

router = APIRouter()

@router.post("/query", response_model=CopilotQueryResponse)
async def query_copilot(req: CopilotQueryRequest):
    result = await rag_pipeline.execute(
        query=req.query,
        language_pref=req.language,
        mode=req.mode or "standard"
    )
    return CopilotQueryResponse(**result)

@router.get("/stream")
async def stream_copilot(query: str, language: str = "en"):
    """
    Server-Sent Events (SSE) streaming endpoint for AI Copilot responses.
    """
    async def event_generator():
        result = await rag_pipeline.execute(query=query, language_pref=language)
        words = result["answer"].split(" ")
        
        # Stream word tokens
        for i, word in enumerate(words):
            chunk = {"token": word + " ", "done": False}
            yield f"data: {json.dumps(chunk)}\n\n"
            await asyncio.sleep(0.02)
            
        # Send final metadata payload including citations and trust layer
        final_payload = {
            "token": "",
            "done": True,
            "applicable_standard": result["applicable_standard"],
            "exact_clause": result["exact_clause"],
            "citations": result["citations"],
            "trust_layer": result["trust_layer"],
            "trust_graph_nodes": result["trust_graph_nodes"],
            "simple_explanation": result["simple_explanation"],
            "technical_details": result["technical_details"],
            "next_recommended_actions": result["next_recommended_actions"]
        }
        yield f"data: {json.dumps(final_payload)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
