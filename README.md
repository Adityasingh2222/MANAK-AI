# MANAK-AI: Intelligent Quality Ecosystem & Standards Assistant
### Problem Statement: SIH26107 | Team: RushLiners | Domain: Smart Automation

> **MANAK-AI** is a comprehensive, production-grade AI-powered regulatory intelligence platform designed for the **Bureau of Indian Standards (BIS)** conformity assessment ecosystem. It empowers manufacturers, MSMEs, labs, and consumers by automating standard identification, exact clause citation, QCO validation, laboratory discovery, and compliance auditing.

---

## ⚡ Quick Start: Running the Live Prototype

The prototype consists of a **FastAPI backend** (port 8000) and a **Next.js frontend** (port 3000).

### 1. Prerequisites
- Python 3.10+ (virtual environment located in `backend/venv`)
- Node.js 18+ (installed in `C:\Users\DELL\.nodejs`)

### 2. Start the Backend
From the repository root (`c:\Users\DELL\Downloads\MANAK-AI`):
```powershell
.\backend\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 3. Start the Frontend
From `c:\Users\DELL\Downloads\MANAK-AI\frontend`:
```powershell
$env:PATH = "C:\Users\DELL\.nodejs;$env:PATH"
& "C:\Users\DELL\.nodejs\npm.cmd" run dev
```
- Access Frontend: **[http://localhost:3000](http://localhost:3000)**

---

## 🎯 The Primary 10-Step Judge Demo Flow

To demonstrate the full capability of MANAK-AI to judges or evaluators:

1. **Step 1: Open the Scanner (`/scan`)**
   - Navigate to [http://localhost:3000/scan](http://localhost:3000/scan).
   - Use either the live browser camera (`getUserMedia`), drag-and-drop an image, or click any of the **5 Pre-Loaded Demo Scenarios** (e.g. *9W LED Bulb*, *Gold Jewellery*, *OPC 53 Cement*, *TMT Steel Bar*, *Electric Iron*).

2. **Step 2: Product Identification**
   - Click **"Analyze Product"**. The multimodal vision and OCR pipeline extracts rating plate data, model name, wattage, voltage, and markings with 98%+ confidence.

3. **Step 3: Standard Matching**
   - System identifies the exact governing Indian Standard: **IS 16102 (Part 1):2012 & IS 16102 (Part 2):2017**.

4. **Step 4: Exact Clause & Evidence Display**
   - View exact clause citations: *Clause 5.1 (Marking)*, *Clause 8.1 (Insulation Resistance)*, *Clause 11.1 (Total Harmonic Distortion)* with direct verbatim quotes from the BIS Gazette.

5. **Step 5: Quality Control Order (QCO) Verification**
   - System checks DPIIT / Ministry QCO databases and flags mandatory compliance under **BIS Scheme-I & Scheme-II**.

6. **Step 6: Required Tests Parameter Matrix**
   - Displays all 5 mandatory tests, test conditions, pass/fail limits, and test priorities (*Critical*, *High*).

7. **Step 7: Smart Lab Finder (`/labs`)**
   - Locates nearest BIS-recognized and NABL-accredited test laboratories (e.g. *ERDA Vadodara*, *CPRI Bengaluru*, *NTH Ghaziabad*) with distance, test capabilities, and contact information.

8. **Step 8: Certification Roadmap (`/certification`)**
   - Step-by-step interactive workflow from application submission to factory audit, sample testing, and grant of CM/L licence.

9. **Step 9: Compliance Readiness Score & Pre-Audit Checklist (`/compliance`)**
   - Computes an 88/100 readiness score across 7 weighted dimensions.
   - Generates an actionable pre-audit checklist with 1-click export to **PDF**, **Excel (.xlsx)**, **CSV**, or **JSON**.

10. **Step 10: Trust Layer & Audit Evidence (`/admin/audit`)**
    - Cryptographically verified SHA-256 Merkle chain proving that all recommendations are strictly grounded in official BIS source documents without hallucination.

---

## 🏛️ Navigation & Features Directory

| Page Route | Feature / Module | Purpose |
|---|---|---|
| `/` | **National Standards Portal** | Government-style homepage with quick actions, statistics, and live updates. |
| `/scan` | **AI Product Scanner** | Browser webcam, file upload, or 1-click demo scenario analysis. |
| `/copilot` | **Multilingual AI Copilot** | Zero-hallucination Q&A with voice input (Web Speech API) in English, Hindi, and Hinglish. |
| `/standards` | **Know Your Standard** | Searchable BIS standards catalog with clause-level drill-down. |
| `/standards/[id]` | **Clause Details & Evidence** | Deep-dive into specific IS clauses, amendments, and test matrices. |
| `/compliance` | **Readiness Score & Checklist** | Dynamic gap analysis with exportable compliance reports (PDF/Excel). |
| `/labs` | **Accredited Lab Finder** | Geospatial filtering of BIS-approved testing facilities. |
| `/verify` | **Licence Verification** | ISI CM/L, Gold HUID, and CRS registration verification (*DEMO MODE clearly labelled*). |
| `/consumer` | **Consumer Shield** | Fake mark detection guide, complaint generator, and rights awareness. |
| `/msme` | **MSME & Startup Desk** | 80% fee concessions, testing subsidies, and incubation roadmaps. |
| `/certification` | **Certification Navigator** | End-to-end guidance for Scheme-I, Scheme-II, Scheme-IV, and Hallmarking. |
| `/updates` | **Gazette & QCO Tracker** | Latest notifications, draft standards, and regulatory amendments. |
| `/sources` | **Sources & References** | Grounding citations and public BIS documentation transparency. |
| `/admin` | **Admin Dashboard** | System health, query throughput, and operational metrics. |
| `/admin/audit` | **SHA-256 Audit Ledger** | Immutable cryptographic chain validating every AI retrieval event. |
| `/admin/evaluation` | **Benchmarking & Accuracy** | Precision, recall, and hallucination-free performance metrics. |

---

## 🔒 Trust, Accuracy & Disclaimer

- **DEMO MODE**: When live government BIS portals or paid AI vision APIs are offline or lack API keys, MANAK-AI operates in **DEMO MODE**.
- **No Hallucination**: AI responses are strictly grounded in structured BIS standard data (`data/demo/standards.json`, `clauses.json`, `qco.json`) using hybrid lexical BM25 and exact identifier retrieval.
- **No Fabricated Data**: Verification records clearly state **DEMO DATA** to prevent misleading users regarding real statutory certifications.

---

## 🐳 Docker Deployment

To launch the complete stack using Docker:

```bash
# Build and run containers
docker-compose up --build
```
- Frontend will be available at `http://localhost:3000`
- Backend will be available at `http://localhost:8000`

---

## 🧪 Running Automated Tests

Run backend integration and unit tests:
```powershell
.\backend\venv\Scripts\python.exe -m pytest -o asyncio_mode=auto backend\tests
```
Expected output: **`8 passed in ~2.2s`**.
