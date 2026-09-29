import json
import os
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from backend.app.schemas.dto import StandardDetail, ClauseItem

router = APIRouter()

def get_standards_data() -> List[dict]:
    path = "data/demo/standards.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def get_clauses_data() -> List[dict]:
    path = "data/demo/clauses.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("", response_model=List[StandardDetail])
@router.get("/search", response_model=List[StandardDetail])
async def search_standards(
    q: Optional[str] = Query(None, description="Search query by IS number, title, or category"),
    category: Optional[str] = Query(None, description="Filter by sector category")
):
    standards = get_standards_data()
    if not q and not category:
        return standards

    results = []
    q_norm = q.lower() if q else ""
    for std in standards:
        matches_q = True
        matches_cat = True
        
        if q_norm:
            content = f"{std['standard_number']} {std['title']} {std['scope']} {std['category']} {std.get('qco_name', '')}".lower()
            matches_q = q_norm in content
            
        if category:
            matches_cat = std.get("category", "").lower() == category.lower()
            
        if matches_q and matches_cat:
            results.append(std)

    return results

@router.get("/{standard_id}", response_model=StandardDetail)
async def get_standard_by_id(standard_id: str):
    standards = get_standards_data()
    std = next((s for s in standards if s["id"].lower() == standard_id.lower() or standard_id.lower() in s["standard_number"].lower()), None)
    if not std:
        raise HTTPException(status_code=404, detail=f"Standard '{standard_id}' not found.")
    return std

@router.get("/{standard_id}/clauses", response_model=List[ClauseItem])
async def get_clauses_for_standard(standard_id: str):
    clauses = get_clauses_data()
    matched = [c for c in clauses if c["standard_id"].lower() == standard_id.lower() or standard_id.lower() in c["standard_number"].lower()]
    return matched
