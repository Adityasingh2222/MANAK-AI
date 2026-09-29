from typing import Dict, Any, List
from backend.app.schemas.dto import ComplianceAssessRequest, ComplianceAssessResponse, ChecklistItem

class ComplianceService:
    def assess_readiness(self, req: ComplianceAssessRequest) -> ComplianceAssessResponse:
        # Dynamic scoring calculation based on input dimensions
        scores: Dict[str, int] = {
            "standard_identification": 100,  # Identified
            "qco_applicability": 100,       # QCO identified
            "documentation": 40 if not req.has_quality_manual else 90,
            "product_testing": 35 if not req.has_test_reports else 95,
            "lab_testing": 30 if not req.has_in_house_lab else 85,
            "marking_traceability": 45 if not req.has_traceability_system else 90,
            "calibration_control": 40 if not req.has_calibrated_instruments else 85,
            "msme_readiness": 80 if req.manufacturer_type in ["Micro", "Small"] else 90
        }
        
        overall = int(sum(scores.values()) / len(scores))
        
        gaps = []
        actions = []
        if not req.has_test_reports:
            gaps.append("Missing accredited lab type-test reports for mandatory parameters.")
            actions.append("Book type testing with a recognized BIS/NABL testing laboratory.")
        if not req.has_quality_manual:
            gaps.append("Quality Control Manual (Scheme of Inspection and Testing - SIT) not formalized.")
            actions.append("Draft factory quality control and in-house inspection manual.")
        if not req.has_calibrated_instruments:
            gaps.append("In-house testing gauges and measuring instruments lack NABL calibration certificates.")
            actions.append("Get all verniers, multimeters, and pressure gauges calibrated with valid calibration stickers.")
        if not req.has_traceability_system:
            gaps.append("Product batch identification, raw material test certificates (MTC) not systematically linked.")
            actions.append("Implement batch coding and manufacturing register linking raw material heats to finished goods.")

        if not gaps:
            status = "Audit Ready"
            readiness_level = "High Confidence (Grade A)"
        elif overall >= 75:
            status = "Pre-Audit Candidate"
            readiness_level = "Moderate Confidence (Grade B)"
        else:
            status = "Needs Preparation"
            readiness_level = "Action Required (Grade C)"

        # Generate standard-specific checklist
        checklist = self.generate_checklist(req.standard_id)

        return ComplianceAssessResponse(
            overall_score=overall,
            category_scores=scores,
            status=status,
            readiness_level=readiness_level,
            key_gaps=gaps or ["All core pre-conditions satisfied for initial audit application."],
            action_plan=actions or ["Proceed to submit Form-V on BIS Manakonline portal."],
            checklist=checklist
        )

    def generate_checklist(self, standard_id: str) -> List[ChecklistItem]:
        # Template checklist mapped to standard requirements
        items = [
            ChecklistItem(
                id="CHK-001",
                requirement="Calibration of all routine testing instruments by NABL accredited lab",
                clause="BIS Act 2016 / Scheme-I SIT Cl 3.1",
                evidence_needed="Valid calibration certificates with traceability to national standards",
                priority="Critical",
                completed=True,
                owner="Quality Assurance Manager",
                due_date="2026-10-10",
                notes="Thermocouples, Megger and multimeters calibrated on 2026-02-15"
            ),
            ChecklistItem(
                id="CHK-002",
                requirement="Scheme of Inspection and Testing (SIT) documentation and implementation",
                clause="BIS General Guidelines Cl 4",
                evidence_needed="Controlled copy of SIT manual with designated QC personnel sign-off",
                priority="Critical",
                completed=False,
                owner="Technical Director",
                due_date="2026-10-15",
                notes="Review draft against latest BIS guidelines"
            ),
            ChecklistItem(
                id="CHK-003",
                requirement="Verification of raw material test certificates (MTC)",
                clause="Raw Material Quality Cl 2",
                evidence_needed="Supplier mill test certificates for each production batch",
                priority="High",
                completed=True,
                owner="Procurement Lead",
                due_date="2026-10-12",
                notes="Suppliers verified against ISO 9001 / BIS licences"
            ),
            ChecklistItem(
                id="CHK-004",
                requirement="Marking and Label Artwork Compliance (ISI Mark / CRS / HUID)",
                clause="Standard Marking Clause",
                evidence_needed="Product rating plate samples, packaging carton master artworks with correct font size",
                priority="Critical",
                completed=False,
                owner="Packaging Team",
                due_date="2026-10-18",
                notes="Ensure CM/L number or CRS registration number format is exact"
            ),
            ChecklistItem(
                id="CHK-005",
                requirement="Type Test Report from BIS-Recognized or NABL Laboratory",
                clause="Conformity Assessment Regulations",
                evidence_needed="Complete type test report not older than 12 months with no test failures",
                priority="Critical",
                completed=False,
                owner="R&D Engineer",
                due_date="2026-10-25",
                notes="Samples dispatched to ERDA / NTH for testing"
            ),
            ChecklistItem(
                id="CHK-006",
                requirement="Customer Complaint Handling and Corrective Action Register",
                clause="BIS Quality System Requirements Cl 7",
                evidence_needed="Documented SOP for complaints, recall procedure and CAPA records",
                priority="Medium",
                completed=True,
                owner="Customer Care Head",
                due_date="2026-10-05",
                notes="Quarterly audit log verified"
            )
        ]
        return items

compliance_service = ComplianceService()
