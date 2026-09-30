import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product_category = 'General Goods',
      brand_or_seller = 'Unknown Retailer',
      issue_type = 'non_compliant',
      purchase_place = 'Retail Store',
      product_details = 'Product failed mandatory quality markings.',
      cml_or_huid = null
    } = body;

    const draftLetter = `To,
The Head (Complaints & Enforcement Department)
Bureau of Indian Standards (BIS)
Government of India

Subject: Formal Complaint under Section 29 of the Bureau of Indian Standards Act, 2016 regarding Non-Compliant / Suspect Product

Respected Authority,

I am submitting this grievance regarding a product purchased from ${purchase_place} that appears to violate mandatory Quality Control Orders (QCO) issued by the Central Government.

1. Product Details:
   - Category: ${product_category}
   - Brand / Seller: ${brand_or_seller}
   - Identified Number (CM/L or HUID): ${cml_or_huid || 'Not marked / Illegible'}

2. Specific Infringement:
   - Nature of Grievance: ${issue_type.replace('_', ' ').toUpperCase()}
   - Observations: ${product_details}

3. Legal Reference:
   Under Section 29(1) of the BIS Act 2016, manufacturing, importing, selling, or offering for sale goods that fail to comply with compulsory Indian Standards or misuse the Standard Mark constitutes a cognizable offense punishable with imprisonment up to two years or fine up to ten lakh rupees.

I request the Enforcement Branch of the Bureau of Indian Standards to inspect the vendor and sample the product batches for surveillance laboratory testing.

Yours sincerely,
Concerned Consumer / Whistleblower
Generated via MANAK-AI Consumer Protection Assistant (SIH26107)`;

    return NextResponse.json({
      draft_letter: draftLetter,
      filing_channels: [
        { name: "BIS Care Mobile App", method: "Direct Grievance Submission" },
        { name: "National Consumer Helpline (NCH)", method: "Toll-Free 1915" },
        { name: "e-Daakhil Portal", method: "Consumer Commission Online Filing" }
      ],
      legal_provision: "Section 29 of BIS Act, 2016 & Consumer Protection Act, 2019"
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
