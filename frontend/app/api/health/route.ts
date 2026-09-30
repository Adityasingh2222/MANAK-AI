import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    app_mode: 'demo',
    version: '1.0.0',
    platform: 'MANAK-AI Indian Standards & Compliance AI',
    sih_problem_id: 'SIH26107'
  });
}
