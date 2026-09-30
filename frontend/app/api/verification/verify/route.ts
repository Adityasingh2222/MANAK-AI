import { NextRequest, NextResponse } from 'next/server';
import { verificationsData } from '@/lib/mockData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idType = (body.identifier_type || 'isi').toLowerCase().trim();
    const val = (body.identifier_value || '').trim();
    const timestamp = new Date().toISOString();

    if (idType === 'isi' || idType === 'cml') {
      const normalizedCml = val.toUpperCase().startsWith('CM/L-') ? val : `CM/L-${val}`;
      const matched = verificationsData.isi_licenses.find(
        lic => lic.cml_number.toUpperCase() === normalizedCml.toUpperCase() || lic.cml_number.toUpperCase() === val.toUpperCase()
      );

      if (matched) {
        return NextResponse.json({
          identifier_type: idType,
          identifier_value: val,
          is_valid: matched.is_valid,
          status: matched.status,
          source_authority: 'Bureau of Indian Standards (Certification Dept)',
          timestamp,
          details: matched,
          demo_mode: true,
          disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
        });
      }

      return NextResponse.json({
        identifier_type: idType,
        identifier_value: val,
        is_valid: false,
        status: 'Record Not Found / Unverified Licence',
        source_authority: 'Bureau of Indian Standards',
        timestamp,
        details: {
          searched_value: val,
          advice: 'Please verify the 7 or 10 digit CM/L number printed directly below the ISI mark on the product packaging.'
        },
        demo_mode: true,
        disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
      });
    }

    if (idType === 'huid') {
      const cleanHuid = val.toUpperCase().replace(/\s+/g, '');
      const matched = verificationsData.huid_records.find(
        h => h.huid.toUpperCase() === cleanHuid
      );

      if (matched) {
        return NextResponse.json({
          identifier_type: 'huid',
          identifier_value: cleanHuid,
          is_valid: matched.is_valid,
          status: matched.status,
          source_authority: 'BIS Hallmarking Registration Centre (AHC)',
          timestamp,
          details: matched,
          demo_mode: true,
          disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
        });
      }

      return NextResponse.json({
        identifier_type: 'huid',
        identifier_value: cleanHuid,
        is_valid: false,
        status: 'HUID Not Found in Registry',
        source_authority: 'Bureau of Indian Standards Hallmarking Division',
        timestamp,
        details: {
          searched_value: cleanHuid,
          advice: 'Enter the exact 6-character alphanumeric code laser inscribed on the gold article.'
        },
        demo_mode: true,
        disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
      });
    }

    if (idType === 'crs') {
      const cleanCrs = val.toUpperCase().startsWith('R-') ? val.toUpperCase() : `R-${val.toUpperCase()}`;
      const matched = verificationsData.crs_registrations.find(
        r => r.reg_number.toUpperCase() === cleanCrs || r.reg_number.toUpperCase() === val.toUpperCase()
      );

      if (matched) {
        return NextResponse.json({
          identifier_type: 'crs',
          identifier_value: val,
          is_valid: matched.is_valid,
          status: matched.status,
          source_authority: 'Ministry of Electronics & IT / BIS CRS Portal',
          timestamp,
          details: matched,
          demo_mode: true,
          disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
        });
      }

      return NextResponse.json({
        identifier_type: 'crs',
        identifier_value: val,
        is_valid: false,
        status: 'Registration Number Not Found',
        source_authority: 'BIS Compulsory Registration Scheme (CRS)',
        timestamp,
        details: { searched_value: val },
        demo_mode: true,
        disclaimer: 'DEMO MODE — This result is simulated and is not an official government verification.'
      });
    }

    return NextResponse.json({
      identifier_type: idType,
      identifier_value: val,
      is_valid: false,
      status: 'Unsupported Identifier Type',
      source_authority: 'Bureau of Indian Standards',
      timestamp,
      details: {},
      demo_mode: true,
      disclaimer: 'DEMO MODE'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
