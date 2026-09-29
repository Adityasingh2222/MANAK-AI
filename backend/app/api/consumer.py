from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter()

class ComplaintDraftRequest(BaseModel):
    product_category: str
    brand_or_seller: str
    issue_type: str  # fake_mark, poor_quality, non_compliant, missing_huid
    purchase_place: str
    product_details: str
    cml_or_huid: Optional[str] = None

@router.get("/marks")
async def get_certification_marks():
    return [
        {
            "id": "isi",
            "name": "ISI Mark (Scheme-I)",
            "meaning": "Guarantees product conformity to specified Indian Standards for safety and quality. Mandatory for cement, steel, electronics, and household goods under QCO.",
            "how_to_verify": "Look for 7 to 10 digit CM/L number printed directly below the ISI mark. Verify on MANAK-AI or BIS Care App.",
            "authority": "Bureau of Indian Standards",
            "status": "Mandatory for QCO listed products"
        },
        {
            "id": "hallmark",
            "name": "BIS Hallmark for Gold",
            "meaning": "Certifies exact purity of gold jewellery (e.g. 22K916 = 91.6% pure gold).",
            "how_to_verify": "Check for 3 laser-inscribed symbols: (1) BIS Triangle Logo, (2) Karatage/Fineness (22K916), (3) 6-digit alphanumeric HUID.",
            "authority": "BIS Hallmarking Scheme-IV",
            "status": "Mandatory in 343 districts"
        },
        {
            "id": "crs",
            "name": "Compulsory Registration Scheme (CRS - Scheme-II)",
            "meaning": "Applies to IT, electronics, solar, and LED lighting products to ensure electrical and laser safety.",
            "how_to_verify": "Look for BIS CRS logo with Registration Number R-XXXXXXXX and standard reference IS 16102 / IS 13252.",
            "authority": "Ministry of Electronics & IT / BIS",
            "status": "Mandatory for 65+ electronic categories"
        },
        {
            "id": "bee-star",
            "name": "BEE Star Energy Rating",
            "meaning": "Measures energy efficiency and power consumption savings (1 Star to 5 Stars).",
            "how_to_verify": "Check BEE hologram, appliance QR code, and annual energy consumption kWh label.",
            "authority": "Bureau of Energy Efficiency (BEE)",
            "status": "Mandatory for AC, Refrigerator, Geysers"
        }
    ]

@router.post("/complaint-guide")
async def generate_complaint_guide(req: ComplaintDraftRequest):
    """
    Consumer non-compliance complaint assistance under BIS Act 2016 Section 29.
    Does not falsely submit to government servers without credentials; generates prepared draft dossier.
    """
    draft_letter = (
        f"To,\n"
        f"The Head (Complaints & Enforcement Department)\n"
        f"Bureau of Indian Standards, Manak Bhavan, New Delhi\n\n"
        f"Subject: Formal complaint regarding suspected non-compliant / sub-standard goods ({req.product_category})\n\n"
        f"Respected Authority,\n"
        f"I wish to report suspected non-compliance regarding a purchase made at {req.purchase_place} "
        f"involving brand '{req.brand_or_seller}'.\n"
        f"Nature of Issue: {req.issue_type.replace('_', ' ').title()}\n"
        f"Product Details: {req.product_details}\n"
        f"Reported Marking Reference: {req.cml_or_huid or 'Not Visible / Counterfeit'}\n\n"
        f"Under Section 29 of the BIS Act, 2016, manufacturing or marketing products without valid conformity marks "
        f"attracts penalty and seizure. I request an official inspection of the reported batch.\n\n"
        f"Sincerely,\n"
        f"Vigilant Indian Consumer"
    )
    
    return {
        "status": "Draft Prepared",
        "guidance_steps": [
            "1. Take clear high-resolution photographs of product label, packaging, and invoice.",
            "2. Note down exact seller GSTIN and retail address.",
            "3. Submit this prepared dossier via BIS Care App or national consumer helpline (NCH 1915).",
            "4. Track complaint acknowledgement number provided by BIS Enforcement Branch."
        ],
        "statutory_act": "The Bureau of Indian Standards Act, 2016 (Act No. 11 of 2016)",
        "draft_letter": draft_letter,
        "helpline": "National Consumer Helpline: 1915 / BIS Toll-free: 1800-11-2345"
    }
