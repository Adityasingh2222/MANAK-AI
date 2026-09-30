export const standardsData = [
  {
    "id": "IS-16102-1",
    "standard_number": "IS 16102 (Part 1):2012",
    "title": "Self-Ballasted LED Lamps for General Lighting Services - Part 1: Safety Requirements",
    "year": 2012,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Electronics & Electrical",
    "scope": "This standard specifies the safety and interchangeability requirements, together with the test methods and conditions required to show compliance of LED lamps with integrated means for controlling, intended for domestic and similar general lighting purposes.",
    "committee": "Electrotechnical Division Council (ETD 23)",
    "qco_applicable": true,
    "qco_name": "Electrical Appliances (Quality Control) Order / CRS Notification",
    "scheme": "Scheme-II (Compulsory Registration Scheme - CRS) & Scheme-I (ISI Mark)",
    "effective_date": "2015-05-07",
    "is_mandatory": true,
    "required_tests": [
      { "name": "Marking & Constructional Safety", "clause": "Clause 5 & 6", "priority": "High" },
      { "name": "Insulation Resistance & Electric Strength", "clause": "Clause 8.1", "priority": "Critical" },
      { "name": "Cap Temperature Rise Test", "clause": "Clause 11", "priority": "High" },
      { "name": "Resistance to Heat and Fire (Glow Wire)", "clause": "Clause 12", "priority": "High" },
      { "name": "Fault Conditions Test", "clause": "Clause 13", "priority": "Medium" }
    ],
    "applicable_labs": ["ERDA Vadodara", "CPRI Bengaluru", "National Test House Ghaziabad", "BIS Central Lab Sahibabad"]
  },
  {
    "id": "IS-16102-2",
    "standard_number": "IS 16102 (Part 2):2017",
    "title": "Self-Ballasted LED Lamps for General Lighting Services - Part 2: Performance Requirements",
    "year": 2017,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Electronics & Electrical",
    "scope": "Specifies the performance requirements together with the test methods and conditions for self-ballasted LED lamps having rated wattage up to 60W.",
    "committee": "Electrotechnical Division Council (ETD 23)",
    "qco_applicable": true,
    "qco_name": "Quality Control Order for LED Luminaires & Lamps",
    "scheme": "Scheme-II (CRS)",
    "effective_date": "2018-09-01",
    "is_mandatory": true,
    "required_tests": [
      { "name": "Lamp Wattage & Power Factor", "clause": "Clause 7.1", "priority": "High" },
      { "name": "Luminous Flux & Efficacy (Lumens/Watt)", "clause": "Clause 8.2", "priority": "Critical" },
      { "name": "Correlated Colour Temperature (CCT) & CRI", "clause": "Clause 9.1", "priority": "High" },
      { "name": "Life Test & Lumen Maintenance (6000 hrs)", "clause": "Clause 10.3", "priority": "Critical" },
      { "name": "Harmonics Current Emission (THD)", "clause": "Clause 11", "priority": "High" }
    ],
    "applicable_labs": ["ERDA Vadodara", "CPRI Bengaluru", "UL India Bengaluru", "TUV Rheinland India"]
  },
  {
    "id": "IS-1417",
    "standard_number": "IS 1417:2016",
    "title": "Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking",
    "year": 2016,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Precious Metals & Hallmarking",
    "scope": "Prescribes fineness grades and marking requirements for gold and gold alloys including jewellery and artefacts. Defines caratage grades (14K, 18K, 20K, 22K, 23K, 24K) and 6-digit Hallmark Unique Identification (HUID).",
    "committee": "Metallurgical Engineering Division (MTD 10)",
    "qco_applicable": true,
    "qco_name": "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020",
    "scheme": "Scheme-IV (Hallmarking Scheme)",
    "effective_date": "2021-06-16",
    "is_mandatory": true,
    "required_tests": [
      { "name": "Fire Assay / Cupellation Test for Gold Fineness", "clause": "Clause 6.1 & IS 1418", "priority": "Critical" },
      { "name": "XRF Spectrometry Preliminary Screening", "clause": "Clause 6.2", "priority": "High" },
      { "name": "Laser Marking Verification (BIS Logo, Fineness, HUID)", "clause": "Clause 7", "priority": "Critical" }
    ],
    "applicable_labs": ["Apex Assaying and Hallmarking Centre Mumbai", "National Hallmarking Centre Chennai", "Bengal Gold Assaying Centre Kolkata"]
  },
  {
    "id": "IS-269",
    "standard_number": "IS 269:2015",
    "title": "Ordinary Portland Cement - Specification (33, 43 and 53 Grade)",
    "year": 2015,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Civil & Construction",
    "scope": "Covers manufacture and chemical/physical requirements of three grades of Ordinary Portland Cement: 33 grade, 43 grade, and 53 grade.",
    "committee": "Cement and Concrete Sectional Committee (CED 2)",
    "qco_applicable": true,
    "qco_name": "Cement (Quality Control) Order, 2024",
    "scheme": "Scheme-I (ISI Mark Licence)",
    "effective_date": "2016-06-01",
    "is_mandatory": true,
    "required_tests": [
      { "name": "Fineness by Specific Surface (Blaine Air Permeability > 225 m2/kg)", "clause": "Clause 6.1", "priority": "High" },
      { "name": "Soundness (Le Chatelier < 10mm / Autoclave < 0.8%)", "clause": "Clause 6.2", "priority": "Critical" },
      { "name": "Setting Time (Initial > 30 min, Final < 600 min)", "clause": "Clause 6.3", "priority": "High" },
      { "name": "Compressive Strength (72h, 168h, 672h)", "clause": "Clause 6.4", "priority": "Critical" },
      { "name": "Chemical Composition (Insoluble Residue, Magnesia, SO3, Loss on Ignition)", "clause": "Clause 5", "priority": "High" }
    ],
    "applicable_labs": ["National Test House Ghaziabad", "National Test House Kolkata", "NCCBM Ballabgarh"]
  },
  {
    "id": "IS-1786",
    "standard_number": "IS 1786:2008",
    "title": "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    "year": 2008,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Metallurgy & Steel",
    "scope": "Specifies requirements for high strength deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600.",
    "committee": "Steel Tubes, Pipes and Fittings Sectional Committee (CED 54)",
    "qco_applicable": true,
    "qco_name": "Steel and Steel Products (Quality Control) Order, 2024",
    "scheme": "Scheme-I (ISI Mark Licence)",
    "effective_date": "2012-09-15",
    "is_mandatory": true,
    "required_tests": [
      { "name": "0.2% Proof Stress / Yield Stress Determination", "clause": "Clause 8.1", "priority": "Critical" },
      { "name": "Tensile Strength (UTS) & UTS/YS Ratio", "clause": "Clause 8.2", "priority": "Critical" },
      { "name": "Percentage Elongation at Gauge Length", "clause": "Clause 8.3", "priority": "High" },
      { "name": "Bend and Rebend Test", "clause": "Clause 9", "priority": "Critical" },
      { "name": "Chemical Composition (Carbon, Sulphur, Phosphorus max limits)", "clause": "Clause 4", "priority": "High" }
    ],
    "applicable_labs": ["National Test House Kolkata", "National Test House Ghaziabad", "CSIR-NML Jamshedpur"]
  },
  {
    "id": "IS-302-2-3",
    "standard_number": "IS 302 (Part 2/Sec 3):2007",
    "title": "Safety of Household and Similar Electrical Appliances - Particular Requirements - Electric Irons",
    "year": 2007,
    "status": "Active",
    "authority": "Bureau of Indian Standards",
    "category": "Consumer Electrical Appliances",
    "scope": "Deals with the safety of electric dry irons and steam irons, including those with a separate water reservoir or boiler having a capacity not exceeding 5 litres, for household and similar purposes.",
    "committee": "Electrical Appliances Sectional Committee (ETD 32)",
    "qco_applicable": true,
    "qco_name": "Household and Similar Electrical Appliances (Quality Control) Order, 2023",
    "scheme": "Scheme-I (ISI Mark Licence)",
    "effective_date": "2024-03-01",
    "is_mandatory": true,
    "required_tests": [
      { "name": "Input Power and Current Deviation", "clause": "Clause 10", "priority": "High" },
      { "name": "Heating & Thermal Safety (Soleplate Temperature)", "clause": "Clause 11", "priority": "Critical" },
      { "name": "Leakage Current and Electric Strength at Operating Temperature", "clause": "Clause 13", "priority": "Critical" },
      { "name": "Moisture Resistance & Spillage Test", "clause": "Clause 15", "priority": "High" },
      { "name": "Earthing Resistance (<0.1 Ω)", "clause": "Clause 27", "priority": "Critical" }
    ],
    "applicable_labs": ["ERDA Vadodara", "CPRI Bengaluru", "National Test House Ghaziabad"]
  }
];

export const clausesData = [
  {
    "id": "CL-16102-1-8-1",
    "standard_id": "IS-16102-1",
    "standard_number": "IS 16102 (Part 1)",
    "year": 2012,
    "clause": "8.1",
    "sub_clause": "8.1.1",
    "title": "Insulation Resistance and Electric Strength Requirements",
    "page": 9,
    "section": "Safety & Electrical Properties",
    "citation": "IS 16102 (Part 1):2012, Clause 8.1, Sub-clause 8.1.1",
    "text": "The insulation resistance between live parts of the lamp cap and accessible parts of the lamp body shall be not less than 4 Megohms (MΩ) when tested with a DC voltage of 500 V applied for 1 minute. Following the insulation resistance test, the lamp shall withstand an AC dielectric strength test of 4000 V RMS for 1 minute without breakdown or flashover.",
    "effective_date": "2015-05-07",
    "status": "Current",
    "source_doc": "BIS Official Publication IS 16102 (Part 1) : 2012",
    "keywords": ["insulation", "electric strength", "dielectric", "megohm", "voltage", "safety", "led", "lamp"]
  },
  {
    "id": "CL-16102-1-5-1",
    "standard_id": "IS-16102-1",
    "standard_number": "IS 16102 (Part 1)",
    "year": 2012,
    "clause": "5.1",
    "sub_clause": "5.1.2",
    "title": "Marking Requirements for Self-Ballasted LED Lamps",
    "page": 6,
    "section": "Marking and Identification",
    "citation": "IS 16102 (Part 1):2012, Clause 5.1, Sub-clause 5.1.2",
    "text": "Lamps shall be clearly and indelibly marked with the following mandatory information on the lamp body: (a) Mark of origin (manufacturer name or registered trade mark); (b) Rated supply voltage or voltage range in Volts; (c) Rated wattage in Watts; (d) Rated frequency in Hertz; (e) Standard Mark (ISI mark with CM/L number or CRS registration number R-XXXXXXXX). Markings must be legible after rubbing for 15 seconds with a cloth soaked in water and petroleum spirit.",
    "effective_date": "2015-05-07",
    "status": "Current",
    "source_doc": "BIS Official Publication IS 16102 (Part 1) : 2012",
    "keywords": ["marking", "label", "rated voltage", "wattage", "cml", "crs", "trade mark", "led lamp"]
  },
  {
    "id": "CL-16102-2-7-1",
    "standard_id": "IS-16102-2",
    "standard_number": "IS 16102 (Part 2)",
    "year": 2017,
    "clause": "7.1",
    "sub_clause": "7.1.1",
    "title": "Lamp Wattage and Operating Power Factor",
    "page": 8,
    "section": "Performance Parameters",
    "citation": "IS 16102 (Part 2):2017, Clause 7.1, Sub-clause 7.1.1",
    "text": "The initial power consumed by the self-ballasted LED lamp shall not exceed 110 percent of the rated wattage. The power factor of lamps with rated wattage greater than 5W shall not be less than 0.90 for high power factor lamps or 0.50 for standard power factor lamps as declared by the manufacturer.",
    "effective_date": "2018-09-01",
    "status": "Current",
    "source_doc": "BIS Official Publication IS 16102 (Part 2) : 2017",
    "keywords": ["wattage", "power factor", "efficiency", "electrical", "led lamp"]
  },
  {
    "id": "CL-16102-2-11",
    "standard_id": "IS-16102-2",
    "standard_number": "IS 16102 (Part 2)",
    "year": 2017,
    "clause": "11.1",
    "sub_clause": "11.1.2",
    "title": "Total Harmonic Distortion (THD) and Harmonics Current Emission",
    "page": 12,
    "section": "Power Quality and Harmonics",
    "citation": "IS 16102 (Part 2):2017, Clause 11.1, Sub-clause 11.1.2",
    "text": "The Total Harmonic Distortion (THD) of the input current for lamps having rated power above 5W and up to 25W shall not exceed 33 percent when measured under rated supply voltage and nominal operating conditions. The 3rd harmonic current shall not exceed 86% of the fundamental current multiplied by power factor.",
    "effective_date": "2018-09-01",
    "status": "Current",
    "source_doc": "BIS Official Publication IS 16102 (Part 2) : 2017",
    "keywords": ["harmonics", "thd", "total harmonic distortion", "3rd harmonic", "power quality", "led lamp"]
  },
  {
    "id": "CL-1417-6-1",
    "standard_id": "IS-1417",
    "standard_number": "IS 1417",
    "year": 2016,
    "clause": "6.1",
    "sub_clause": "6.1.1",
    "title": "Gold Fineness Grades and Karatage Standards",
    "page": 4,
    "section": "Fineness and Marking",
    "citation": "IS 1417:2016, Clause 6.1, Sub-clause 6.1.1",
    "text": "Gold artefacts and jewellery shall be hallmarked under one of the recognized standard grades: 24K (999 parts per thousand fine gold), 23K (958 fineness), 22K (916 fineness), 20K (833 fineness), 18K (750 fineness), and 14K (585 fineness). No negative tolerance is permitted in the gold fineness declared on hallmarked jewellery.",
    "effective_date": "2021-06-16",
    "status": "Current",
    "source_doc": "BIS Hallmarking Specification IS 1417 : 2016",
    "keywords": ["gold", "hallmark", "huid", "fineness", "karat", "22k916", "24k", "purity", "jewellery"]
  },
  {
    "id": "CL-269-6-2",
    "standard_id": "IS-269",
    "standard_number": "IS 269",
    "year": 2015,
    "clause": "6.2",
    "sub_clause": "6.2.1",
    "title": "Soundness Test Requirements for Portland Cement",
    "page": 7,
    "section": "Physical Requirements",
    "citation": "IS 269:2015, Clause 6.2, Sub-clause 6.2.1",
    "text": "When tested by the Le Chatelier method in accordance with IS 4031 (Part 3), the expansion of unaerated cement shall not exceed 10 mm. When tested by the autoclave method in accordance with IS 4031 (Part 3), the expansion shall not exceed 0.8 percent.",
    "effective_date": "2016-06-01",
    "status": "Current",
    "source_doc": "BIS Specification IS 269 : 2015",
    "keywords": ["cement", "soundness", "le chatelier", "autoclave", "expansion", "opc", "physical tests"]
  }
];

export const labsData = [
  {
    "id": "LAB-ERDA-01",
    "name": "Electrical Research and Development Association (ERDA)",
    "institution_type": "Autonomous Research Laboratory",
    "accreditation": "BIS Recognized & NABL Accredited",
    "nabl_cert_no": "TC-5021",
    "bis_lab_code": "BIS-LAB-042",
    "address": "ERDA Road, GIDC Makarpura Industrial Estate, Vadodara, Gujarat 390010",
    "city": "Vadodara",
    "state": "Gujarat",
    "pincode": "390010",
    "latitude": 22.2536,
    "longitude": 73.2014,
    "contact_email": "testing@erda.org",
    "phone": "+91-265-3043128",
    "website": "https://www.erda.org",
    "tested_standards": ["IS 16102 (Part 1):2012", "IS 16102 (Part 2):2017", "IS 302 (Part 2/Sec 3):2007", "IS 1293:2019"],
    "capabilities": [
      "Photometry and Goniophotometer Testing",
      "Harmonics and EMI/EMC Analysis (THD up to 50th harmonic)",
      "Dielectric Strength up to 10 kV and Insulation Resistance",
      "Glow-Wire Flammability and Cap Temperature Rise",
      "Accelerated Lumen Maintenance & 6000-hour Life Endurance"
    ],
    "avg_turnaround_days": 14,
    "sample_capacity_per_month": 450,
    "status": "Active / Accepting Samples"
  },
  {
    "id": "LAB-CPRI-01",
    "name": "Central Power Research Institute (CPRI) - Energy & Lighting Lab",
    "institution_type": "Ministry of Power Autonomous Body",
    "accreditation": "BIS Recognized & NABL Accredited",
    "nabl_cert_no": "TC-5489",
    "bis_lab_code": "BIS-LAB-003",
    "address": "Prof. Sir C.V. Raman Road, Sadashivanagar, Bengaluru, Karnataka 560080",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560080",
    "latitude": 13.0135,
    "longitude": 77.5815,
    "contact_email": "lightinglab@cpri.in",
    "phone": "+91-80-22072222",
    "website": "https://cpri.res.in",
    "tested_standards": ["IS 16102 (Part 1 & 2)", "IS 10322", "IS 16242", "IS 302"],
    "capabilities": [
      "Integrating Sphere Spectroradiometer 2-metre",
      "Surge Immunity Testing up to 10 kV",
      "Environmental Chamber (-40°C to +150°C)",
      "Power Quality and Total Harmonic Distortion (THD)",
      "High Voltage Dielectric & Leakage Current Testing"
    ],
    "avg_turnaround_days": 18,
    "sample_capacity_per_month": 300,
    "status": "Active / Accepting Samples"
  },
  {
    "id": "LAB-NTH-NR",
    "name": "National Test House (Northern Region)",
    "institution_type": "Government of India (Dept of Consumer Affairs)",
    "accreditation": "Premier Government Laboratory / NABL / BIS Recognized",
    "nabl_cert_no": "TC-5110",
    "bis_lab_code": "BIS-LAB-GOV-001",
    "address": "Kamla Nehru Nagar, Ghaziabad, Uttar Pradesh 201002",
    "city": "Ghaziabad",
    "state": "Uttar Pradesh",
    "pincode": "201002",
    "latitude": 28.6723,
    "longitude": 77.4429,
    "contact_email": "nth-gzb@nic.in",
    "phone": "+91-120-2789901",
    "website": "http://www.nth.gov.in",
    "tested_standards": ["IS 16102 (Part 1 & 2)", "IS 269:2015", "IS 1786:2008", "IS 9873 (Part 1):2019", "IS 302"],
    "capabilities": [
      "Universal Testing Machine 1000 kN (TMT Yield / Tensile)",
      "Automated Cement Mortar Compressive Testing Machine",
      "Chemical XRF & Optical Emission Spectrometry (OES)",
      "Electrical Safety and Leakage Current Setup",
      "Toy Mechanical Testing Safety Jigs"
    ],
    "avg_turnaround_days": 10,
    "sample_capacity_per_month": 800,
    "status": "Active / Accepting Samples"
  },
  {
    "id": "LAB-AHC-MUMBAI",
    "name": "Apex Assaying and Hallmarking Centre (AHC-0102)",
    "institution_type": "BIS Recognized Assaying and Hallmarking Centre",
    "accreditation": "BIS Recognized under Scheme-IV & NABL",
    "nabl_cert_no": "TC-8120",
    "bis_lab_code": "AHC-MH-0102",
    "address": "Zaveri Bazaar, Kalbadevi, Mumbai, Maharashtra 400002",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400002",
    "latitude": 18.9515,
    "longitude": 72.8311,
    "contact_email": "ahc.mumbai@goldassay.in",
    "phone": "+91-22-23429810",
    "website": "https://www.bis.gov.in/hallmarking",
    "tested_standards": ["IS 1417:2016", "IS 1418:2009", "IS 15820:2009"],
    "capabilities": [
      "Fire Assay Method (Lead cupellation and parting) with 0.1 ppt accuracy",
      "Multi-point XRF Elemental Karatage Verification",
      "Laser Inscription of 6-Digit Alphanumeric HUID",
      "Real-time upload to BIS Hallmarking Central Server"
    ],
    "avg_turnaround_days": 1,
    "sample_capacity_per_month": 25000,
    "status": "Active / Immediate Turnaround (24h)"
  }
];

export const productsSeedData = [
  {
    "scenario_id": "scenario-1-led-lamp",
    "product_name": "Self-Ballasted 9W B22 LED Lamp",
    "product_category": "Lighting & Electronics",
    "detected_text": "SURYA 9W 230V 50Hz 6500K Cool Day Light 810 Lumens IS 16102 (Part 1) CM/L-8400192801 Made in India",
    "brand": "SURYA ROSHNI",
    "model": "SSK-PA-9W",
    "rating_plate": {
      "wattage": "9W",
      "voltage": "220-240V AC",
      "frequency": "50Hz",
      "lumens": "810 lm",
      "cct": "6500K",
      "cap_type": "B22",
      "power_factor": ">0.90"
    },
    "applicable_standard": "IS 16102 (Part 1):2012 & IS 16102 (Part 2):2017",
    "standard_id": "IS-16102-1",
    "qco_status": "Mandatory CRS / BIS Scheme-I & Scheme-II",
    "cml_detected": "CM/L-8400192801",
    "huid_detected": null,
    "confidence_score": 0.98,
    "required_tests": [
      { "name": "Marking & Constructional Safety", "clause": "IS 16102 (Part 1) Cl 5 & 6", "priority": "High" },
      { "name": "Insulation Resistance (>4 MΩ) & Electric Strength (4 kV)", "clause": "IS 16102 (Part 1) Cl 8.1", "priority": "Critical" },
      { "name": "Total Harmonic Distortion (THD < 33%)", "clause": "IS 16102 (Part 2) Cl 11.1", "priority": "High" },
      { "name": "Cap Temperature Rise (<120°C)", "clause": "IS 16102 (Part 1) Cl 11", "priority": "High" },
      { "name": "Lumen Maintenance (6000 hrs)", "clause": "IS 16102 (Part 2) Cl 10.3", "priority": "Critical" }
    ],
    "suggested_labs": [
      { "name": "ERDA Vadodara", "distance_km": 12, "accreditation": "BIS & NABL" },
      { "name": "CPRI Bengaluru", "distance_km": 28, "accreditation": "BIS & NABL" },
      { "name": "National Test House Ghaziabad", "distance_km": 45, "accreditation": "BIS Government Lab" }
    ],
    "compliance_readiness": {
      "overall_score": 88,
      "breakdown": {
        "standard_identified": 100,
        "qco_applicability": 100,
        "documentation": 85,
        "product_testing": 90,
        "lab_testing": 85,
        "marking_traceability": 95,
        "certification_status": 75
      },
      "status": "Ready for Pre-Audit",
      "missing_actions": ["Submit annual factory surveillance test report to BIS portal", "Update packaging label barcode"]
    }
  },
  {
    "scenario_id": "scenario-2-jewellery",
    "product_name": "22 Karat Gold Hallmarked Bangle",
    "product_category": "Precious Metals & Jewellery",
    "detected_text": "BIS LOGO 22K916 HUID: AA1234 AHC-MH-0102 Net Wt 18.450g",
    "brand": "TANISHQ",
    "model": "BG-22K-916-2026",
    "rating_plate": {
      "purity": "22K (91.6% Pure Gold)",
      "fineness": "916",
      "gross_weight": "18.450g",
      "net_weight": "18.450g"
    },
    "applicable_standard": "IS 1417:2016",
    "standard_id": "IS-1417",
    "qco_status": "Mandatory Hallmarking (Scheme-IV)",
    "cml_detected": null,
    "huid_detected": "AA1234",
    "confidence_score": 0.99,
    "required_tests": [
      { "name": "Fire Assay / Cupellation Test for Gold Fineness", "clause": "IS 1417 Cl 6.1 & IS 1418", "priority": "Critical" },
      { "name": "XRF Spectrometry Screening", "clause": "IS 1417 Cl 6.2", "priority": "High" },
      { "name": "Laser Inscribed 3-Symbol Marking Verification", "clause": "IS 1417 Cl 7", "priority": "Critical" }
    ],
    "suggested_labs": [
      { "name": "Apex Assaying and Hallmarking Centre Mumbai", "distance_km": 5, "accreditation": "BIS Recognized Scheme-IV" }
    ],
    "compliance_readiness": {
      "overall_score": 96,
      "breakdown": {
        "standard_identified": 100,
        "qco_applicability": 100,
        "documentation": 95,
        "product_testing": 95,
        "lab_testing": 95,
        "marking_traceability": 100,
        "certification_status": 95
      },
      "status": "Fully Compliant",
      "missing_actions": ["Keep digital copy of AHC assay certificate in central register"]
    }
  },
  {
    "scenario_id": "scenario-3-cement",
    "product_name": "Ordinary Portland Cement 43 Grade (50kg Bag)",
    "product_category": "Building & Construction Materials",
    "detected_text": "ULTRATECH OPC 43 GRADE IS 269 CM/L-1234567890 BATCH-B26-088 NET WEIGHT 50 KG",
    "brand": "ULTRATECH",
    "model": "OPC-43",
    "rating_plate": {
      "grade": "43 Grade",
      "standard": "IS 269:2015",
      "net_mass": "50 kg",
      "batch_no": "B26-088"
    },
    "applicable_standard": "IS 269:2015",
    "standard_id": "IS-269",
    "qco_status": "Mandatory ISI Scheme-I (Quality Control Order 2024)",
    "cml_detected": "CM/L-1234567890",
    "huid_detected": null,
    "confidence_score": 0.95,
    "required_tests": [
      { "name": "Compressive Strength (72h, 168h, 672h)", "clause": "IS 269 Cl 6.4", "priority": "Critical" },
      { "name": "Soundness Test (Le Chatelier & Autoclave)", "clause": "IS 269 Cl 6.2", "priority": "Critical" },
      { "name": "Setting Time (Initial & Final)", "clause": "IS 269 Cl 6.3", "priority": "High" },
      { "name": "Blaine Fineness Test (>225 m2/kg)", "clause": "IS 269 Cl 6.1", "priority": "High" }
    ],
    "suggested_labs": [
      { "name": "National Test House Ghaziabad", "distance_km": 40, "accreditation": "BIS Government Lab" },
      { "name": "National Test House Kolkata", "distance_km": 80, "accreditation": "BIS Government Lab" }
    ],
    "compliance_readiness": {
      "overall_score": 92,
      "breakdown": {
        "standard_identified": 100,
        "qco_applicability": 100,
        "documentation": 90,
        "product_testing": 95,
        "lab_testing": 90,
        "marking_traceability": 90,
        "certification_status": 90
      },
      "status": "Ready for Pre-Audit",
      "missing_actions": ["Upload 28-day concrete cube compression test records"]
    }
  },
  {
    "scenario_id": "scenario-4-steel",
    "product_name": "High Strength TMT Rebar Fe 500D (12mm)",
    "product_category": "Metallurgy & Steel",
    "detected_text": "TATA TISCON 500 D 12MM IS 1786 CM/L-0000000000 HEAT-NO-H9420",
    "brand": "TATA TISCON",
    "model": "FE-500D-12MM",
    "rating_plate": {
      "grade": "Fe 500D",
      "nominal_size": "12 mm",
      "standard": "IS 1786:2008"
    },
    "applicable_standard": "IS 1786:2008",
    "standard_id": "IS-1786",
    "qco_status": "Mandatory ISI Scheme-I (Steel QCO 2024)",
    "cml_detected": "CM/L-0000000000",
    "huid_detected": null,
    "confidence_score": 0.94,
    "required_tests": [
      { "name": "0.2% Proof Stress / Yield Stress", "clause": "IS 1786 Cl 8.1", "priority": "Critical" },
      { "name": "Tensile Strength (UTS/YS Ratio)", "clause": "IS 1786 Cl 8.2", "priority": "Critical" },
      { "name": "Bend and Rebend Test", "clause": "IS 1786 Cl 9", "priority": "Critical" },
      { "name": "Chemical Composition (S & P Limits)", "clause": "IS 1786 Cl 4", "priority": "High" }
    ],
    "suggested_labs": [
      { "name": "National Test House Kolkata", "distance_km": 35, "accreditation": "BIS Government Lab" }
    ],
    "compliance_readiness": {
      "overall_score": 85,
      "breakdown": {
        "standard_identified": 100,
        "qco_applicability": 100,
        "documentation": 80,
        "product_testing": 85,
        "lab_testing": 85,
        "marking_traceability": 85,
        "certification_status": 75
      },
      "status": "Ready for Pre-Audit",
      "missing_actions": ["Verify ladle heat analysis report against IS 1786 S&P maximum thresholds"]
    }
  },
  {
    "scenario_id": "scenario-5-electrical-iron",
    "product_name": "Dry Electric Iron 1000W",
    "product_category": "Electrical Appliances",
    "detected_text": "BAJAJ DX-7 1000W 230V 50Hz NON-STICK SOLEPLATE IS 302-2-3 CM/L-9999999999",
    "brand": "BAJAJ",
    "model": "DX-7",
    "rating_plate": {
      "wattage": "1000W",
      "voltage": "230V AC",
      "frequency": "50Hz",
      "standard": "IS 302-2-3"
    },
    "applicable_standard": "IS 302 (Part 2/Sec 3):2007",
    "standard_id": "IS-302-2-3",
    "qco_status": "Mandatory ISI Scheme-I (Electrical Appliances QCO 2023)",
    "cml_detected": "CM/L-9999999999",
    "huid_detected": null,
    "confidence_score": 0.93,
    "required_tests": [
      { "name": "Input Power and Current Deviation", "clause": "IS 302-2-3 Cl 10", "priority": "High" },
      { "name": "Heating & Thermal Safety", "clause": "IS 302-2-3 Cl 11", "priority": "Critical" },
      { "name": "Leakage Current and Electric Strength", "clause": "IS 302-2-3 Cl 13", "priority": "Critical" },
      { "name": "Earthing Resistance (<0.1 Ω)", "clause": "IS 302-2-3 Cl 27", "priority": "Critical" }
    ],
    "suggested_labs": [
      { "name": "ERDA Vadodara", "distance_km": 15, "accreditation": "BIS & NABL" },
      { "name": "CPRI Bengaluru", "distance_km": 25, "accreditation": "BIS & NABL" }
    ],
    "compliance_readiness": {
      "overall_score": 68,
      "breakdown": {
        "standard_identified": 100,
        "qco_applicability": 100,
        "documentation": 50,
        "product_testing": 60,
        "lab_testing": 60,
        "marking_traceability": 60,
        "certification_status": 40
      },
      "status": "Action Required (Licence Expired)",
      "missing_actions": ["CM/L-9999999999 licence is EXPIRED on portal. Must renew licence immediately with BIS Branch Office."]
    }
  }
];

export const qcoData = [
  {
    "id": "QCO-ELECTRICAL-2023",
    "title": "Household and Similar Electrical Appliances (Quality Control) Order, 2023",
    "order_number": "S.O. 1293(E)",
    "ministry": "Ministry of Commerce and Industry (DPIIT)",
    "publication_date": "2023-03-05",
    "effective_date": "2024-03-01",
    "status": "In Force",
    "mandatory_scheme": "Scheme-I (Standard Mark / ISI Licence)",
    "covered_products": [
      "Electric Iron (IS 302 Part 2/Sec 3)",
      "Electric Food Mixers, Grinders & Juicers (IS 302 Part 2/Sec 14)",
      "Electric Immersion Water Heaters (IS 302 Part 2/Sec 201)",
      "Room Heaters & Radiators (IS 302 Part 2/Sec 30)"
    ],
    "exemption_msme": "Micro enterprises given additional 6 months; Small enterprises given 3 months transition.",
    "summary": "Mandates that goods or articles specified shall conform to corresponding Indian Standards and bear the Standard Mark under licence from BIS. No person shall manufacture, import, distribute, sell, hire, lease, store or exhibit for sale any non-compliant goods.",
    "gazette_link": "https://egazette.gov.in/WriteReadData/2023/243912.pdf"
  },
  {
    "id": "QCO-STEEL-2024",
    "title": "Steel and Steel Products (Quality Control) Order, 2024",
    "order_number": "S.O. 581(E)",
    "ministry": "Ministry of Steel",
    "publication_date": "2024-01-18",
    "effective_date": "2024-07-18",
    "status": "In Force",
    "mandatory_scheme": "Scheme-I (ISI Mark)",
    "covered_products": [
      "High Strength Deformed Steel Bars for Concrete Reinforcement (IS 1786)",
      "Structural Steel - Standard Quality (IS 2062)",
      "Galvanized Steel Sheets (IS 277)"
    ],
    "exemption_msme": "Domestic micro and small steel re-rollers granted technical assistance through Ministry of Steel taskforce.",
    "summary": "Mandatory conformity to IS 1786 and related metallurgical standards to curb sub-standard rebar in infrastructure projects. Direct penalty under Section 29 of BIS Act 2016 for non-compliance.",
    "gazette_link": "https://egazette.gov.in/WriteReadData/2024/251004.pdf"
  },
  {
    "id": "QCO-CEMENT-2024",
    "title": "Cement (Quality Control) Order, 2024",
    "order_number": "S.O. 942(E)",
    "ministry": "Ministry of Commerce and Industry (DPIIT)",
    "publication_date": "2024-02-27",
    "effective_date": "2024-05-27",
    "status": "In Force",
    "mandatory_scheme": "Scheme-I (ISI Mark)",
    "covered_products": [
      "Ordinary Portland Cement (IS 269)",
      "Portland Pozzolana Cement - Fly Ash Based (IS 1489 Part 1)",
      "Portland Slag Cement (IS 455)"
    ],
    "exemption_msme": "None (zero exemption for structural construction materials).",
    "summary": "Consolidates all previous cement quality directives. Requires strict batch traceability, mandatory laboratory test certification, and RFID/QR batch verification on packaging.",
    "gazette_link": "https://egazette.gov.in/WriteReadData/2024/252119.pdf"
  },
  {
    "id": "QCO-HALLMARK-2020",
    "title": "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 (as amended)",
    "order_number": "S.O. 320(E)",
    "ministry": "Ministry of Consumer Affairs, Food and Public Distribution",
    "publication_date": "2020-01-15",
    "effective_date": "2021-06-16",
    "status": "In Force (Expanded to 343 Districts)",
    "mandatory_scheme": "Scheme-IV (Hallmarking Scheme)",
    "covered_products": [
      "Gold Jewellery and Artefacts of 14K, 18K, 20K, 22K, 23K, and 24K (IS 1417)"
    ],
    "exemption_msme": "Jewellers with annual turnover up to ₹40 lakh exempt from mandatory registration.",
    "summary": "Prohibits sale of non-hallmarked gold jewellery in mandatory districts. Enforces 6-digit HUID marking laser engraved on each individual item.",
    "gazette_link": "https://egazette.gov.in/WriteReadData/2020/215321.pdf"
  },
  {
    "id": "QCO-ELECTRONICS-CRS",
    "title": "Electronics and Information Technology Goods (Requirements for Compulsory Registration) Order",
    "order_number": "MeitY/CRO-2021",
    "ministry": "Ministry of Electronics and Information Technology (MeitY)",
    "publication_date": "2021-03-18",
    "effective_date": "2021-10-01",
    "status": "In Force",
    "mandatory_scheme": "Scheme-II (Compulsory Registration Scheme - CRS)",
    "covered_products": [
      "Self-Ballasted LED Lamps (IS 16102 Part 1 & 2)",
      "Power Adaptors for IT Equipment (IS 13252 Part 1)",
      "Smart Watches & Wearables (IS 13252 Part 1)",
      "Uninterruptible Power Systems - UPS (IS 16242 Part 1)"
    ],
    "exemption_msme": "Pre-compliance testing discount for startups registered under DPIIT.",
    "summary": "Mandatory testing from recognized Indian laboratories and registration with BIS prior to import, manufacturing, or distribution across Indian territory.",
    "gazette_link": "https://meity.gov.in/writereaddata/files/cro_order.pdf"
  }
];

export const updatesNewsData = [
  {
    "id": "NEWS-001",
    "type": "gazette",
    "category": "Gazette Notification",
    "title": "Ministry of Commerce and Industry issues Quality Control Order for Electrical Appliances (2024 Revisions)",
    "date": "2026-03-25",
    "summary": "The Central Government after consulting Bureau of Indian Standards mandates ISI mark for 16 additional electrical kitchen and home appliances under Scheme-I.",
    "source": "The Gazette of India: Extraordinary (Part II-Sec. 3(ii))",
    "source_url": "https://egazette.gov.in",
    "status": "In Force",
    "related_standard": "IS 302 / IS 1293",
    "impact_level": "High Priority",
    "demo_label": "DEMO CONTENT"
  },
  {
    "id": "NEWS-002",
    "type": "qco",
    "category": "QCO Update",
    "title": "Mandatory Hallmarking expanded to 55 additional districts across 7 states under Phase V",
    "date": "2026-03-10",
    "summary": "Gold jewellery hallmarking with 6-digit HUID now covers 343 districts nationwide. Jewellers without valid BIS registration prohibited from trading gold ornaments.",
    "source": "Bureau of Indian Standards Hallmarking Division",
    "source_url": "https://www.bis.gov.in/hallmarking",
    "status": "Regulatory Mandate",
    "related_standard": "IS 1417:2016",
    "impact_level": "Critical",
    "demo_label": "DEMO CONTENT"
  },
  {
    "id": "NEWS-003",
    "type": "bis_update",
    "category": "BIS Update",
    "title": "BIS announces simplified certification procedure for Micro and Small Enterprises (MSMEs)",
    "date": "2026-02-18",
    "summary": "Up to 50% concession on minimum marking fees and 80% fast-track processing timeline for certified MSME manufacturers adopting Make in India standards.",
    "source": "BIS Press Information Bureau Release",
    "source_url": "https://pib.gov.in",
    "status": "Scheme Active",
    "related_standard": "All Standards (MSME Concession)",
    "impact_level": "Medium Priority",
    "demo_label": "DEMO CONTENT"
  },
  {
    "id": "NEWS-004",
    "type": "alert",
    "category": "Consumer Alert",
    "title": "Advisory on Fake ISI Marks on Sub-Standard LED Bulbs and Plugs",
    "date": "2026-01-30",
    "summary": "BIS Enforcement branch conducts search and seizure operations seizing 4,200 non-compliant LED lamps bearing fake CM/L numbers in wholesale markets.",
    "source": "BIS Enforcement Wing",
    "source_url": "https://www.bis.gov.in/enforcement",
    "status": "Consumer Warning",
    "related_standard": "IS 16102 (Part 1)",
    "impact_level": "High Warning",
    "demo_label": "DEMO CONTENT"
  },
  {
    "id": "NEWS-005",
    "type": "press",
    "category": "Press Release",
    "title": "National Standards Conclave 2026 emphasizes AI-driven compliance and rapid lab onboarding",
    "date": "2026-01-12",
    "summary": "Minister addresses industry leaders on zero-defect manufacturing and digital verification pipelines to enhance Indian exports to G20 economies.",
    "source": "PIB New Delhi / Ministry of Consumer Affairs",
    "source_url": "https://pib.gov.in",
    "status": "Archived News",
    "related_standard": "General Standards Policy",
    "impact_level": "Informational",
    "demo_label": "DEMO CONTENT"
  }
];

export const verificationsData = {
  "isi_licenses": [
    {
      "cml_number": "CM/L-8400192801",
      "licensee_name": "Surya Roshni Limited",
      "factory_address": "Plot No 26-28, Industrial Area, Kashipur, Uttarakhand 244713",
      "standard_number": "IS 16102 (Part 1):2012",
      "product_name": "Self-Ballasted LED Lamps for General Lighting Services",
      "valid_from": "2020-04-01",
      "valid_upto": "2027-03-31",
      "status": "Operative / Valid",
      "brand_name": "SURYA",
      "model_numbers": ["SSK-PA-9W", "SSK-PA-12W", "SSK-PA-15W"],
      "last_surveillance_date": "2025-11-14",
      "is_valid": true
    },
    {
      "cml_number": "CM/L-1234567890",
      "licensee_name": "UltraTech Cement Limited",
      "factory_address": "Aditya Nagar, Malkhed Road, Gulbarga, Karnataka 585292",
      "standard_number": "IS 269:2015",
      "product_name": "Ordinary Portland Cement 43 Grade",
      "valid_from": "2018-01-01",
      "valid_upto": "2026-12-31",
      "status": "Operative / Valid",
      "brand_name": "ULTRATECH",
      "model_numbers": ["OPC-43-HD"],
      "last_surveillance_date": "2026-02-10",
      "is_valid": true
    },
    {
      "cml_number": "CM/L-9999999999",
      "licensee_name": "Expired Example Manufacturing Ltd",
      "factory_address": "Sector 4, Industrial Area, Faridabad, Haryana",
      "standard_number": "IS 302 (Part 2/Sec 3):2007",
      "product_name": "Electric Iron",
      "valid_from": "2019-01-01",
      "valid_upto": "2023-12-31",
      "status": "Expired / Cancelled",
      "brand_name": "EXPIRED-BRAND",
      "model_numbers": ["EI-100"],
      "last_surveillance_date": "2023-06-01",
      "is_valid": false
    }
  ],
  "huid_records": [
    {
      "huid": "AA1234",
      "jeweller_name": "Tanishq Jewellers (Titan Company Ltd)",
      "jeweller_reg_no": "BIS/AHC/JW-882194",
      "article_type": "Gold Bangle (22K)",
      "purity_declared": "22K (916 Fineness)",
      "assay_date": "2026-03-12",
      "ahc_name": "Apex Assaying and Hallmarking Centre Mumbai (AHC-MH-0102)",
      "weight_grams": 18.45,
      "status": "Verified Genuine Hallmark",
      "is_valid": true
    },
    {
      "huid": "XY9876",
      "jeweller_name": "Kalyan Jewellers India Limited",
      "jeweller_reg_no": "BIS/AHC/JW-651239",
      "article_type": "Gold Necklace (18K)",
      "purity_declared": "18K (750 Fineness)",
      "assay_date": "2026-04-20",
      "ahc_name": "National Hallmarking Centre Chennai (AHC-TN-0044)",
      "weight_grams": 32.10,
      "status": "Verified Genuine Hallmark",
      "is_valid": true
    },
    {
      "huid": "JH5678",
      "jeweller_name": "Malabar Gold and Diamonds",
      "jeweller_reg_no": "BIS/AHC/JW-910482",
      "article_type": "Gold Coin (24K)",
      "purity_declared": "24K (999 Fineness)",
      "assay_date": "2026-05-02",
      "ahc_name": "Bengal Gold Assaying Centre Kolkata (AHC-WB-0211)",
      "weight_grams": 10.00,
      "status": "Verified Genuine Hallmark",
      "is_valid": true
    }
  ],
  "crs_registrations": [
    {
      "reg_number": "R-41012345",
      "applicant_name": "Signify Innovations India Limited (Philips)",
      "product_category": "Self-Ballasted LED Lamp",
      "standard_number": "IS 16102 (Part 1):2012 & IS 16102 (Part 2):2017",
      "country_of_origin": "India",
      "valid_from": "2021-08-15",
      "valid_upto": "2026-08-14",
      "brand": "PHILIPS",
      "models": ["CorePro LEDBulb 9W", "Stellar Bright 12W"],
      "status": "Valid / Active",
      "is_valid": true
    },
    {
      "reg_number": "R-41098765",
      "applicant_name": "Syska LED Lights Private Limited",
      "product_category": "Self-Ballasted LED Lamp",
      "standard_number": "IS 16102 (Part 1):2012",
      "country_of_origin": "India",
      "valid_from": "2020-11-01",
      "valid_upto": "2027-10-31",
      "brand": "SYSKA",
      "models": ["SSK-SRL-9W", "SSK-SRL-14W"],
      "status": "Valid / Active",
      "is_valid": true
    }
  ]
};

export const documentsStoreData = [
  {
    "id": "DOC-BIS-16102-1",
    "title": "IS 16102 (Part 1) : 2012 Gazette Specification",
    "standard_number": "IS 16102 (Part 1):2012",
    "document_type": "Official BIS Standard",
    "authority": "Bureau of Indian Standards",
    "status": "indexed",
    "chunks_count": 48,
    "extracted_clauses": 14,
    "uploaded_at": "2026-01-10T09:30:00Z",
    "approved_by": "KnowledgeAdmin_01",
    "content_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    "id": "DOC-QCO-ELEC-2023",
    "title": "S.O. 1293(E) Electrical Appliances QCO Order",
    "standard_number": "QCO-2023",
    "document_type": "Gazette Order",
    "authority": "Ministry of Commerce and Industry",
    "status": "approved",
    "chunks_count": 22,
    "extracted_clauses": 6,
    "uploaded_at": "2026-02-14T11:20:00Z",
    "approved_by": "ComplianceOfficer_03",
    "content_hash": "a4f89d9128bc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b899"
  },
  {
    "id": "DOC-BIS-1417-REV",
    "title": "Hallmarking Purity & Fineness Amendments 2024",
    "standard_number": "IS 1417:2016 (Amd 3)",
    "document_type": "Amendment Bulletin",
    "authority": "BIS Hallmarking Section",
    "status": "review",
    "chunks_count": 16,
    "extracted_clauses": 4,
    "uploaded_at": "2026-03-20T14:15:00Z",
    "approved_by": null,
    "content_hash": "c7a88e99128bc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b112"
  }
];

export const auditTrailData = [
  {
    "sequence": 1,
    "event_hash": "f4c901a1e0b573a98a09e02c6b4d372e9a2b5e7d4c1f9e8a7b6c5d4e3f2a1b0c",
    "timestamp": "2026-09-30T01:00:00Z",
    "actor": "MANAK_CORE_RAG",
    "action": "RETRIEVE_VERIFIED_CLAUSE",
    "resource": "IS 16102 (Part 1):2012 Clause 8.1",
    "status": "VERIFIED_GENUINE",
    "previous_hash": "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    "sequence": 2,
    "event_hash": "a8e329d47c61f5e8b0a9d4c2b7f1e5d8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "timestamp": "2026-09-30T01:05:00Z",
    "actor": "MULTIMODAL_SCANNER",
    "action": "CLASSIFY_PRODUCT_RATING_PLATE",
    "resource": "Surya 9W LED Lamp IS 16102",
    "status": "HIGH_CONFIDENCE_MATCH",
    "previous_hash": "f4c901a1e0b573a98a09e02c6b4d372e9a2b5e7d4c1f9e8a7b6c5d4e3f2a1b0c"
  },
  {
    "sequence": 3,
    "event_hash": "d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2",
    "timestamp": "2026-09-30T01:10:00Z",
    "actor": "VERIFICATION_REGISTRY",
    "action": "QUERY_BIS_PORTAL_CML",
    "resource": "CM/L-8400192801",
    "status": "OPERATIVE_VALID",
    "previous_hash": "a8e329d47c61f5e8b0a9d4c2b7f1e5d8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
  }
];
