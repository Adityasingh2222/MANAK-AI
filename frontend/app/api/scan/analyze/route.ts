import { NextRequest, NextResponse } from 'next/server';
import { productsSeedData } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const scenarioOverride = body.scenario_override;
    const ocrHint = (body.ocr_hint || '').toLowerCase();

    let matched = null;

    if (scenarioOverride) {
      matched = productsSeedData.find(s => s.scenario_id === scenarioOverride);
    }

    if (!matched && ocrHint) {
      if (ocrHint.includes('huid') || ocrHint.includes('gold') || ocrHint.includes('jewel') || ocrHint.includes('22k')) {
        matched = productsSeedData.find(s => s.scenario_id === 'scenario-2-jewellery');
      } else if (ocrHint.includes('cement') || ocrHint.includes('opc') || ocrHint.includes('269')) {
        matched = productsSeedData.find(s => s.scenario_id === 'scenario-3-cement');
      } else if (ocrHint.includes('steel') || ocrHint.includes('tmt') || ocrHint.includes('1786') || ocrHint.includes('rebar')) {
        matched = productsSeedData.find(s => s.scenario_id === 'scenario-4-steel');
      } else if (ocrHint.includes('iron') || ocrHint.includes('bajaj') || ocrHint.includes('dry iron') || ocrHint.includes('302')) {
        matched = productsSeedData.find(s => s.scenario_id === 'scenario-5-electrical-iron');
      } else if (ocrHint.includes('led') || ocrHint.includes('lamp') || ocrHint.includes('bulb') || ocrHint.includes('16102')) {
        matched = productsSeedData.find(s => s.scenario_id === 'scenario-1-led-lamp');
      }
    }

    // Default fallback to LED lamp scenario (Scenario 1)
    if (!matched) {
      matched = productsSeedData[0];
    }

    const result = {
      ...matched,
      trust_layer: {
        source_verified: true,
        version_checked: true,
        clause_retrieved: true,
        ai_grounded: true,
        citation_attached: true,
        audit_logged: true
      },
      app_mode: 'demo',
      disclaimer: 'DEMO MODE — High-fidelity simulated vision & OCR classification pipeline for SIH26107.'
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
