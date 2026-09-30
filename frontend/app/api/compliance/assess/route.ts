import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      standard_id = 'IS-16102-1',
      manufacturer_type = 'Small',
      has_test_reports = false,
      has_quality_manual = false,
      has_in_house_lab = false,
      has_calibrated_instruments = false,
      has_traceability_system = false,
    } = body;

    const scores: Record<string, number> = {
      standard_identification: 100,
      qco_applicability: 100,
      documentation: has_quality_manual ? 90 : 40,
      product_testing: has_test_reports ? 95 : 35,
      lab_testing: has_in_house_lab ? 85 : 30,
      marking_traceability: has_traceability_system ? 90 : 45,
      calibration_control: has_calibrated_instruments ? 85 : 40,
      msme_readiness: ['Micro', 'Small'].includes(manufacturer_type) ? 80 : 90
    };

    const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

    const gaps: string[] = [];
    const actions: string[] = [];

    if (!has_test_reports) {
      gaps.push("Missing accredited lab type-test reports for mandatory parameters.");
      actions.push("Book type testing with a recognized BIS/NABL testing laboratory.");
    }
    if (!has_quality_manual) {
      gaps.push("Quality Control Manual (Scheme of Inspection and Testing - SIT) not formalized.");
      actions.push("Draft factory quality control and in-house inspection manual.");
    }
    if (!has_calibrated_instruments) {
      gaps.push("In-house testing gauges and measuring instruments lack NABL calibration certificates.");
      actions.push("Get all instruments calibrated with valid calibration stickers.");
    }
    if (!has_traceability_system) {
      gaps.push("Product batch identification, raw material test certificates (MTC) not systematically linked.");
      actions.push("Implement batch coding and manufacturing register linking raw material heats to finished goods.");
    }

    const status = gaps.length === 0 ? "Audit Ready" : (overall >= 75 ? "Pre-Audit Candidate" : "Needs Preparation");
    const readiness_level = gaps.length === 0 ? "High Confidence (Grade A)" : (overall >= 75 ? "Moderate Confidence (Grade B)" : "Action Required (Grade C)");

    const checklist = [
      {
        id: "CHK-01",
        clause: "Clause 5 & 6",
        requirement: "Marking & Constructional Safety Documentation",
        status: has_traceability_system ? "Completed" : "Pending",
        criticality: "High",
        guidance: "Ensure legible marking of manufacturer name, rated voltage, wattage, and BIS Standard Mark."
      },
      {
        id: "CHK-02",
        clause: "Clause 8.1",
        requirement: "Insulation Resistance & High Voltage Dielectric Test",
        status: has_test_reports ? "Completed" : "Action Required",
        criticality: "Critical",
        guidance: "Insulation resistance shall be >= 4 Megohms at 500V DC; withstand 4000V AC dielectric for 1 minute."
      },
      {
        id: "CHK-03",
        clause: "Clause 11",
        requirement: "In-House Calibration and Scheme of Inspection (SIT)",
        status: has_calibrated_instruments ? "Completed" : "Action Required",
        criticality: "Critical",
        guidance: "Maintain daily testing register and periodic surveillance audit logs."
      },
      {
        id: "CHK-04",
        clause: "QCO Mandate",
        requirement: "BIS Portal Application Dossier (Form-V)",
        status: has_quality_manual ? "In Progress" : "Pending",
        criticality: "High",
        guidance: "Upload factory layout, manufacturing machinery list, and laboratory equipment certificates."
      }
    ];

    return NextResponse.json({
      overall_score: overall,
      category_scores: scores,
      status,
      readiness_level,
      key_gaps: gaps.length ? gaps : ["All core pre-conditions satisfied for initial audit application."],
      action_plan: actions.length ? actions : ["Proceed to submit Form-V on BIS Manakonline portal."],
      checklist
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
