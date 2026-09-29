from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from backend.app.services.export_service import export_service
from backend.app.services.compliance_service import compliance_service

router = APIRouter()

class ExportRequest(BaseModel):
    format: str  # pdf, excel, csv, json
    product_name: Optional[str] = "LED Lamp 9W"
    standard_id: Optional[str] = "IS 16102 (Part 1):2012"
    overall_score: Optional[int] = 85
    checklist: Optional[List[Dict[str, Any]]] = None

@router.post("/checklist")
async def export_checklist(req: ExportRequest):
    checklist_data = req.checklist
    if not checklist_data:
        checklist_data = [item.dict() for item in compliance_service.generate_checklist(req.standard_id or "IS-16102-1")]

    metadata = {
        "product_name": req.product_name,
        "standard_id": req.standard_id,
        "overall_score": req.overall_score
    }

    fmt = req.format.lower()
    if fmt == "pdf":
        pdf_bytes = export_service.export_checklist_pdf(checklist_data, metadata)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=manak_ai_compliance_checklist.pdf"}
        )
    elif fmt in ["excel", "xlsx"]:
        xlsx_bytes = export_service.export_checklist_excel(checklist_data, metadata)
        return Response(
            content=xlsx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=manak_ai_compliance_checklist.xlsx"}
        )
    elif fmt == "csv":
        csv_bytes = export_service.export_checklist_csv(checklist_data)
        return Response(
            content=csv_bytes,
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=manak_ai_compliance_checklist.csv"}
        )
    else:  # JSON
        json_bytes = export_service.export_checklist_json(checklist_data, metadata)
        return Response(
            content=json_bytes,
            media_type="application/json",
            headers={"Content-Disposition": "attachment; filename=manak_ai_compliance_checklist.json"}
        )
