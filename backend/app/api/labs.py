import json
import os
import math
from typing import List, Optional
from fastapi import APIRouter, Query

router = APIRouter()

def get_labs_data() -> List[dict]:
    path = "data/demo/labs.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> int:
    # Haversine formula
    R = 6371 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return int(R * c)

@router.get("/search")
@router.get("")
async def search_labs(
    query: Optional[str] = Query(None, description="Search by lab name, city, state, or standard"),
    standard: Optional[str] = Query(None, description="Filter by Indian Standard"),
    accreditation: Optional[str] = Query(None, description="BIS or NABL"),
    state: Optional[str] = Query(None, description="Filter by Indian state"),
    user_lat: Optional[float] = Query(None, description="User latitude for distance calculation"),
    user_lon: Optional[float] = Query(None, description="User longitude for distance calculation")
):
    labs = get_labs_data()
    results = []

    q_norm = query.lower() if query else ""
    std_norm = standard.lower() if standard else ""
    acc_norm = accreditation.lower() if accreditation else ""
    state_norm = state.lower() if state else ""

    for lab in labs:
        matches = True
        
        if q_norm:
            combined = f"{lab['name']} {lab['city']} {lab['state']} {' '.join(lab['tested_standards'])} {' '.join(lab['capabilities'])}".lower()
            if q_norm not in combined:
                matches = False

        if std_norm:
            if not any(std_norm in s.lower() for s in lab["tested_standards"]):
                matches = False

        if acc_norm:
            if acc_norm not in lab["accreditation"].lower():
                matches = False

        if state_norm:
            if state_norm not in lab["state"].lower():
                matches = False

        if matches:
            lab_copy = dict(lab)
            if user_lat and user_lon and lab.get("latitude") and lab.get("longitude"):
                lab_copy["distance_km"] = calculate_distance(user_lat, user_lon, lab["latitude"], lab["longitude"])
            elif not lab_copy.get("distance_km"):
                lab_copy["distance_km"] = 25  # sensible default demo distance
            results.append(lab_copy)

    # Sort by distance if calculated
    results.sort(key=lambda x: x.get("distance_km", 9999))
    return results

@router.get("/{lab_id}")
async def get_lab_by_id(lab_id: str):
    labs = get_labs_data()
    lab = next((l for l in labs if l["id"].lower() == lab_id.lower()), None)
    if not lab:
        return {"error": f"Lab {lab_id} not found"}
    return lab
