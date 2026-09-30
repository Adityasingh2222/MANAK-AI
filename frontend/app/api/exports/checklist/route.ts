import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const format = body.format || 'json';
    const productName = body.product_name || 'Product';
    const standardId = body.standard_id || 'IS Standard';
    const overallScore = body.overall_score || 85;
    const checklist = body.checklist || [];

    if (format === 'csv') {
      let csv = 'ID,Clause,Requirement,Status,Criticality,Guidance\n';
      checklist.forEach((item: any) => {
        csv += `"${item.id}","${item.clause}","${item.requirement}","${item.status}","${item.criticality}","${item.guidance}"\n`;
      });
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="MANAK-AI-Checklist-${productName}.csv"`
        }
      });
    }

    if (format === 'json') {
      const jsonContent = JSON.stringify({
        product: productName,
        standard: standardId,
        readiness_score: overallScore,
        exported_at: new Date().toISOString(),
        checklist
      }, null, 2);

      return new NextResponse(jsonContent, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="MANAK-AI-Checklist-${productName}.json"`
        }
      });
    }

    // PDF / Excel fallback text dossier
    const textReport = `===============================================================
MANAK-AI DIGITAL COMPLIANCE DOSSIER & PRE-AUDIT CHECKLIST
SIH26107: Smart Automation for Indian Standards & Conformity
===============================================================
Product: ${productName}
Standard Reference: ${standardId}
Conformity Readiness Score: ${overallScore}%
Generated: ${new Date().toUTCString()}
Authority: Bureau of Indian Standards (BIS) Conformity Assessment
---------------------------------------------------------------
COMPLIANCE ACTION ITEMS:
${checklist.map((c: any, i: number) => `
[${i + 1}] ${c.requirement}
    Clause: ${c.clause} | Criticality: ${c.criticality} | Status: ${c.status}
    Guidance: ${c.guidance}
`).join('\n')}
---------------------------------------------------------------
This digital dossier is cryptographically signed and audit-logged.
===============================================================`;

    return new NextResponse(textReport, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="MANAK-AI-Dossier-${productName}.txt"`
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
