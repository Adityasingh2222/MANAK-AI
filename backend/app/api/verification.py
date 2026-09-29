from fastapi import APIRouter
from backend.app.schemas.dto import VerificationRequest, VerificationResponse
from backend.app.providers.verification_provider import verification_service

router = APIRouter()

@router.post("/verify", response_model=VerificationResponse)
async def verify_general(req: VerificationRequest):
    result = await verification_service.verify(req.identifier_type, req.identifier_value)
    return VerificationResponse(**result)

@router.get("/isi/{cml_number:path}", response_model=VerificationResponse)
async def verify_isi(cml_number: str):
    result = await verification_service.verify("isi", cml_number)
    return VerificationResponse(**result)

@router.get("/huid/{huid_code}", response_model=VerificationResponse)
async def verify_huid(huid_code: str):
    result = await verification_service.verify("huid", huid_code)
    return VerificationResponse(**result)

@router.get("/crs/{reg_number:path}", response_model=VerificationResponse)
async def verify_crs(reg_number: str):
    result = await verification_service.verify("crs", reg_number)
    return VerificationResponse(**result)

@router.get("/cml/{cml_number:path}", response_model=VerificationResponse)
async def verify_cml(cml_number: str):
    result = await verification_service.verify("cml", cml_number)
    return VerificationResponse(**result)
