import json
import os
from typing import List, Optional
from fastapi import APIRouter, Query

router = APIRouter()

def get_updates_data() -> List[dict]:
    path = "data/demo/updates_news.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def get_qco_data() -> List[dict]:
    path = "data/demo/qco.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("")
async def get_all_updates(category: Optional[str] = Query(None)):
    updates = get_updates_data()
    if category:
        return [u for u in updates if u.get("type", "").lower() == category.lower() or u.get("category", "").lower() == category.lower()]
    return updates

@router.get("/news")
async def get_news():
    updates = get_updates_data()
    return [u for u in updates if u.get("type") in ["news", "alert", "bis_update"]]

@router.get("/press-releases")
async def get_press_releases():
    updates = get_updates_data()
    return [u for u in updates if u.get("type") == "press"]

@router.get("/gazette")
async def get_gazette_notifications():
    updates = get_updates_data()
    return [u for u in updates if u.get("type") == "gazette"]

@router.get("/qco")
async def get_qco_orders():
    return get_qco_data()

@router.get("/watchdog")
async def get_watchdog_pulse():
    """
    QCO / Gazette Watchdog monitoring endpoint showing updates affecting manufacturers.
    """
    return {
        "status": "Active Monitoring",
        "recent_changes_count": 3,
        "compliance_pulse_message": "3 regulatory changes may affect your saved products this quarter.",
        "tracked_standards": ["IS 16102 (LED)", "IS 302 (Appliances)", "IS 1417 (Gold)", "IS 269 (Cement)"],
        "alerts": [
            {
                "id": "WD-01",
                "title": "Mandatory Scheme-I Enforcement for 16 Electrical Appliances",
                "deadline": "2026-06-30",
                "days_remaining": 91,
                "urgency": "High",
                "affected_items": ["Dry Iron", "Mixer Grinders", "Electric Kettles"]
            },
            {
                "id": "WD-02",
                "title": "Phase V Hallmarking roll-out in 55 remaining districts",
                "deadline": "2026-05-15",
                "days_remaining": 45,
                "urgency": "Critical",
                "affected_items": ["Gold 14K to 24K Jewellery"]
            },
            {
                "id": "WD-03",
                "title": "Revised Blaine Fineness test calibration protocol for Cement",
                "deadline": "2026-08-01",
                "days_remaining": 123,
                "urgency": "Medium",
                "affected_items": ["OPC 43 & 53 Grade Cement"]
            }
        ]
    }
