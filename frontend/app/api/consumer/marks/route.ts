import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: "isi",
      name: "ISI Mark (Scheme-I)",
      meaning: "Guarantees product conformity to specified Indian Standards for safety and quality. Mandatory for cement, steel, electronics, and household goods under QCO.",
      how_to_verify: "Look for 7 to 10 digit CM/L number printed directly below the ISI mark. Verify on MANAK-AI or BIS Care App.",
      authority: "Bureau of Indian Standards",
      status: "Mandatory for QCO listed products"
    },
    {
      id: "hallmark",
      name: "BIS Hallmark for Gold",
      meaning: "Certifies exact purity of gold jewellery (e.g. 22K916 = 91.6% pure gold).",
      how_to_verify: "Check for 3 laser-inscribed symbols: (1) BIS Triangle Logo, (2) Karatage/Fineness (22K916), (3) 6-digit alphanumeric HUID.",
      authority: "BIS Hallmarking Scheme-IV",
      status: "Mandatory in 343 districts"
    },
    {
      id: "crs",
      name: "Compulsory Registration Scheme (CRS - Scheme-II)",
      meaning: "Applies to IT, electronics, solar, and LED lighting products to ensure electrical and laser safety.",
      how_to_verify: "Look for BIS CRS logo with Registration Number R-XXXXXXXX and standard reference IS 16102 / IS 13252.",
      authority: "Ministry of Electronics & IT / BIS",
      status: "Mandatory for 65+ electronic categories"
    },
    {
      id: "bee-star",
      name: "BEE Star Energy Rating",
      meaning: "Measures energy efficiency and power consumption savings (1 Star to 5 Stars).",
      how_to_verify: "Check BEE hologram, appliance QR code, and annual energy consumption kWh label.",
      authority: "Bureau of Energy Efficiency (BEE)",
      status: "Mandatory for AC, Refrigerator, Geysers"
    }
  ]);
}
