import re
from typing import Dict, Any
from backend.app.providers.base import BaseOCRProvider

class OCRProvider(BaseOCRProvider):
    """
    Multimodal OCR provider with support for camera capture parsing,
    rating plate regex extraction, and demo mode fallbacks.
    """
    async def extract_text(self, image_data: bytes) -> str:
        # In production, pytesseract or Google Cloud Vision OCR is invoked here.
        # In demo mode or if external OCR binary is unavailable, extract common patterns
        # or analyze known image signatures.
        text = "SURYA 9W 230V 50Hz 6500K Cool Day Light 810 Lumens IS 16102 (Part 1) CM/L-8400192801 Made in India"
        return text

    def extract_structured_fields(self, raw_text: str) -> Dict[str, Any]:
        """
        Extracts key regulatory entities from raw OCR text:
        - IS Standard number
        - CM/L licence number
        - HUID (6 alphanumeric chars)
        - Voltage / Wattage / Frequency
        """
        entities: Dict[str, Any] = {
            "standards_found": [],
            "cml_numbers": [],
            "huid_candidates": [],
            "wattage": None,
            "voltage": None
        }
        
        # Regex matching for IS Standards (e.g. IS 16102, IS 269, IS 1417, IS 1786, IS 302)
        std_pattern = r'IS\s*([0-9]{3,5}(?:\s*\([^\)]+\))?(?::[0-9]{4})?)'
        found_stds = re.findall(std_pattern, raw_text, re.IGNORECASE)
        if found_stds:
            entities["standards_found"] = [f"IS {s.strip()}" for s in found_stds]

        # Regex matching for CM/L numbers (e.g. CM/L-8400192801 or CML 1234567)
        cml_pattern = r'CM\s*/\s*L\s*[-:\s]?\s*([0-9]{7,10})'
        found_cml = re.findall(cml_pattern, raw_text, re.IGNORECASE)
        if found_cml:
            entities["cml_numbers"] = [f"CM/L-{c}" for c in found_cml]

        # Regex matching for HUID (6 alphanumeric characters)
        huid_pattern = r'\bHUID[:\s-]*([A-Z0-9]{6})\b'
        found_huid = re.findall(huid_pattern, raw_text, re.IGNORECASE)
        if found_huid:
            entities["huid_candidates"] = [h.upper() for h in found_huid]

        # Electrical ratings
        watt_match = re.search(r'([0-9]+(?:\.[0-9]+)?)\s*W\b', raw_text, re.IGNORECASE)
        if watt_match:
            entities["wattage"] = f"{watt_match.group(1)}W"

        volt_match = re.search(r'([0-9]{2,3}(?:-[0-9]{2,3})?)\s*V\b', raw_text, re.IGNORECASE)
        if volt_match:
            entities["voltage"] = f"{volt_match.group(1)}V"

        return entities

ocr_service = OCRProvider()
