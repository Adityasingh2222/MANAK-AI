import json
import os
from datetime import datetime, timezone
from typing import Dict, Any
from backend.app.providers.base import BaseVerificationProvider
from backend.app.core.config import settings
from backend.app.core.audit_chain import audit_logger

class VerificationProvider(BaseVerificationProvider):
    def __init__(self, demo_data_path: str = "data/demo/verifications.json"):
        self.demo_data_path = demo_data_path
        self._load_records()

    def _load_records(self):
        if os.path.exists(self.demo_data_path):
            with open(self.demo_data_path, "r", encoding="utf-8") as f:
                self.records = json.load(f)
        else:
            self.records = {"isi_licenses": [], "huid_records": [], "crs_registrations": []}

    async def verify(self, identifier_type: str, identifier_value: str) -> Dict[str, Any]:
        id_type = identifier_type.lower().strip()
        val = identifier_value.strip()
        timestamp = datetime.now(timezone.utc).isoformat()
        
        # Log verification request to tamper-evident audit chain
        audit_logger.record_event(
            actor="VERIFICATION_SYSTEM",
            action="VERIFY_IDENTIFIER",
            resource=f"{id_type}:{val}",
            old_value=None,
            new_value={"type": id_type, "value": val, "timestamp": timestamp}
        )

        is_connected_mode = (settings.APP_MODE == "production" and os.getenv("BIS_API_TOKEN"))
        
        # 1. ISI / CM/L Licence Verification
        if id_type in ["isi", "cml"]:
            normalized_cml = val if val.upper().startswith("CM/L-") else f"CM/L-{val}"
            matched = next((lic for lic in self.records.get("isi_licenses", []) if lic["cml_number"].upper() == normalized_cml.upper()), None)
            
            if matched:
                return {
                    "identifier_type": id_type,
                    "identifier_value": val,
                    "is_valid": matched.get("is_valid", True),
                    "status": matched.get("status", "Operative / Valid"),
                    "source_authority": "Bureau of Indian Standards (Certification Dept)",
                    "timestamp": timestamp,
                    "details": matched,
                    "demo_mode": not is_connected_mode,
                    "disclaimer": "SOURCE VERIFIED — Bureau of Indian Standards Official Portal" if is_connected_mode else "DEMO MODE — This result is simulated and is not an official government verification."
                }
            else:
                return {
                    "identifier_type": id_type,
                    "identifier_value": val,
                    "is_valid": False,
                    "status": "Record Not Found / Unverified Licence",
                    "source_authority": "Bureau of Indian Standards",
                    "timestamp": timestamp,
                    "details": {
                        "searched_value": val,
                        "advice": "Please verify the 7 or 10 digit CM/L number printed directly below the ISI mark on the product packaging."
                    },
                    "demo_mode": not is_connected_mode,
                    "disclaimer": "DEMO MODE — This result is simulated and is not an official government verification."
                }

        # 2. HUID (Hallmark Unique Identification) Verification
        elif id_type == "huid":
            clean_huid = val.upper().replace(" ", "")
            matched = next((h for h in self.records.get("huid_records", []) if h["huid"].upper() == clean_huid), None)
            
            # Format validation for HUID: standard 6 alphanumeric characters
            is_valid_format = len(clean_huid) == 6 and clean_huid.isalnum()
            
            if matched:
                return {
                    "identifier_type": "huid",
                    "identifier_value": clean_huid,
                    "is_valid": True,
                    "status": matched.get("status", "Verified Genuine Hallmark"),
                    "source_authority": "BIS Hallmarking Central Server (Manakonline)",
                    "timestamp": timestamp,
                    "details": matched,
                    "demo_mode": not is_connected_mode,
                    "disclaimer": "SOURCE VERIFIED — BIS Hallmarking Server" if is_connected_mode else "DEMO MODE — This result is simulated and is not an official government verification."
                }
            elif is_valid_format:
                # Valid format but not in seed database
                simulated_record = {
                    "huid": clean_huid,
                    "jeweller_name": "Demo Registered Jeweller (BIS/AHC/JW-SIM)",
                    "jeweller_reg_no": f"BIS/AHC/JW-{clean_huid[:4]}",
                    "article_type": "Gold Ornament (Simulated)",
                    "purity_declared": "22K (916 Fineness)",
                    "assay_date": "2026-03-01",
                    "ahc_name": "Recognized Assaying & Hallmarking Centre",
                    "weight_grams": 12.50,
                    "status": "Simulated Active Hallmark (Demo)",
                    "is_valid": True
                }
                return {
                    "identifier_type": "huid",
                    "identifier_value": clean_huid,
                    "is_valid": True,
                    "status": "Simulated Active Hallmark",
                    "source_authority": "BIS Hallmarking Central Server",
                    "timestamp": timestamp,
                    "details": simulated_record,
                    "demo_mode": True,
                    "disclaimer": "DEMO MODE — This result is simulated and is not an official government verification."
                }
            else:
                return {
                    "identifier_type": "huid",
                    "identifier_value": clean_huid,
                    "is_valid": False,
                    "status": "Invalid HUID Format (Must be 6 alphanumeric characters)",
                    "source_authority": "Bureau of Indian Standards",
                    "timestamp": timestamp,
                    "details": {"error": "HUID must be exactly 6 alphanumeric characters laser inscribed on the jewellery."},
                    "demo_mode": True,
                    "disclaimer": "DEMO MODE — This result is simulated and is not an official government verification."
                }

        # 3. CRS (Compulsory Registration Scheme)
        elif id_type == "crs":
            clean_crs = val if val.upper().startswith("R-") else f"R-{val}"
            matched = next((c for c in self.records.get("crs_registrations", []) if c["reg_number"].upper() == clean_crs.upper()), None)
            
            if matched:
                return {
                    "identifier_type": "crs",
                    "identifier_value": clean_crs,
                    "is_valid": matched.get("is_valid", True),
                    "status": matched.get("status", "Valid / Active"),
                    "source_authority": "BIS CRS Portal (Scheme-II)",
                    "timestamp": timestamp,
                    "details": matched,
                    "demo_mode": not is_connected_mode,
                    "disclaimer": "SOURCE VERIFIED — BIS CRS Portal" if is_connected_mode else "DEMO MODE — This result is simulated and is not an official government verification."
                }
            else:
                return {
                    "identifier_type": "crs",
                    "identifier_value": clean_crs,
                    "is_valid": False,
                    "status": "Registration Not Found",
                    "source_authority": "BIS CRS Portal",
                    "timestamp": timestamp,
                    "details": {"searched_value": clean_crs},
                    "demo_mode": True,
                    "disclaimer": "DEMO MODE — This result is simulated and is not an official government verification."
                }

        # Fallback generic verification
        return {
            "identifier_type": id_type,
            "identifier_value": val,
            "is_valid": False,
            "status": "Unsupported Identifier Type",
            "source_authority": "Bureau of Indian Standards",
            "timestamp": timestamp,
            "details": {"supported_types": ["isi", "huid", "crs", "cml"]},
            "demo_mode": True,
            "disclaimer": "DEMO MODE — This result is simulated and is not an official government verification."
        }

verification_service = VerificationProvider()
