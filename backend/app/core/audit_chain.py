import hashlib
import json
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from backend.app.core.config import settings

class AuditLogChain:
    """
    Tamper-Evident Hash Chain Audit Logger.
    Every event contains previous_event_hash and computes current_event_hash = SHA256(prev + data).
    """
    _instance = None
    
    def __init__(self):
        self.chain: List[Dict[str, Any]] = []
        self.last_hash = settings.GENESIS_HASH
        
        # Initialize with genesis event
        self.record_event(
            actor="SYSTEM_INIT",
            action="GENESIS_RECORD",
            resource="MANAK_AUDIT_LOG",
            old_value=None,
            new_value={"message": "Audit chain initialized for SIH26107 MANAK-AI"}
        )

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = AuditLogChain()
        return cls._instance

    @staticmethod
    def _compute_hash(data: str) -> str:
        return hashlib.sha256(data.encode("utf-8")).hexdigest()

    def record_event(
        self,
        actor: str,
        action: str,
        resource: str,
        old_value: Optional[Any] = None,
        new_value: Optional[Any] = None
    ) -> Dict[str, Any]:
        timestamp = datetime.now(timezone.utc).isoformat()
        
        old_val_str = json.dumps(old_value, sort_keys=True) if old_value is not None else ""
        new_val_str = json.dumps(new_value, sort_keys=True) if new_value is not None else ""
        
        old_hash = self._compute_hash(old_val_str)
        new_hash = self._compute_hash(new_val_str)
        
        record_payload = {
            "index": len(self.chain),
            "timestamp": timestamp,
            "actor": actor,
            "action": action,
            "resource": resource,
            "old_value_hash": old_hash,
            "new_value_hash": new_hash,
            "previous_event_hash": self.last_hash
        }
        
        payload_str = json.dumps(record_payload, sort_keys=True)
        current_hash = self._compute_hash(f"{self.last_hash}:{payload_str}")
        
        event = {
            **record_payload,
            "current_event_hash": current_hash,
            "payload_preview": new_val_str[:200] if new_val_str else "N/A"
        }
        
        self.chain.append(event)
        self.last_hash = current_hash
        return event

    def get_events(self, limit: int = 50) -> List[Dict[str, Any]]:
        return list(reversed(self.chain[-limit:]))

    def verify_integrity(self) -> Dict[str, Any]:
        """
        Validates entire hash chain from index 0 to head.
        Returns validation status and verification details.
        """
        if not self.chain:
            return {"valid": True, "total_records": 0, "verified_at": datetime.now(timezone.utc).isoformat()}
            
        prev_hash = settings.GENESIS_HASH
        for idx, event in enumerate(self.chain):
            if event["previous_event_hash"] != prev_hash:
                return {
                    "valid": False,
                    "error": f"Hash chain broken at index {idx}. Expected prev_hash {prev_hash}, found {event['previous_event_hash']}",
                    "broken_at_index": idx
                }
            
            record_payload = {
                "index": event["index"],
                "timestamp": event["timestamp"],
                "actor": event["actor"],
                "action": event["action"],
                "resource": event["resource"],
                "old_value_hash": event["old_value_hash"],
                "new_value_hash": event["new_value_hash"],
                "previous_event_hash": event["previous_event_hash"]
            }
            computed_current = self._compute_hash(f"{prev_hash}:{json.dumps(record_payload, sort_keys=True)}")
            if computed_current != event["current_event_hash"]:
                return {
                    "valid": False,
                    "error": f"Current hash mismatch at index {idx}",
                    "broken_at_index": idx
                }
            prev_hash = event["current_event_hash"]
            
        return {
            "valid": True,
            "total_records": len(self.chain),
            "head_hash": self.last_hash,
            "verified_at": datetime.now(timezone.utc).isoformat(),
            "algorithm": "SHA-256 Append-Only Merkle Chain"
        }

audit_logger = AuditLogChain.get_instance()
