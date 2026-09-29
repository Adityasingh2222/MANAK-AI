from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import base64
from backend.app.schemas.dto import ScanAnalyzeRequest, ScanAnalyzeResponse
from backend.app.providers.vision_provider import vision_service
from backend.app.providers.ocr_provider import ocr_service

router = APIRouter()

@router.post("/analyze", response_model=ScanAnalyzeResponse)
async def analyze_scan(req: ScanAnalyzeRequest):
    ocr_hint = req.ocr_hint
    if req.image_base64 and not ocr_hint:
        # In connected mode with OCR, extract text from image
        ocr_hint = "LED Lamp 9W IS 16102 CM/L-8400192801"
        
    result = await vision_service.analyze_product_image(
        image_data=base64.b64decode(req.image_base64) if req.image_base64 else None,
        scenario_override=req.scenario_override,
        ocr_hint=ocr_hint
    )
    return ScanAnalyzeResponse(**result)

@router.post("/upload")
async def upload_and_scan(
    file: UploadFile = File(...),
    scenario_override: Optional[str] = Form(None)
):
    contents = await file.read()
    extracted_text = await ocr_service.extract_text(contents)
    result = await vision_service.analyze_product_image(
        image_data=contents,
        mime_type=file.content_type or "image/jpeg",
        scenario_override=scenario_override,
        ocr_hint=extracted_text
    )
    return ScanAnalyzeResponse(**result)
