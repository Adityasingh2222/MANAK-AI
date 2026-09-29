import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app
from backend.app.core.audit_chain import audit_logger

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get("/api/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "healthy"
        assert data["primary_judge_flow_ready"] is True

@pytest.mark.asyncio
async def test_standards_search_exact_is_number():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get("/api/standards/search?q=IS 16102")
        assert res.status_code == 200
        data = res.json()
        assert len(data) >= 1
        assert "16102" in data[0]["standard_number"]

@pytest.mark.asyncio
async def test_standards_clauses_citation():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get("/api/standards/IS-16102-1/clauses")
        assert res.status_code == 200
        clauses = res.json()
        assert len(clauses) >= 1
        # Check citation structure
        assert "citation" in clauses[0]
        assert "IS 16102" in clauses[0]["citation"]

@pytest.mark.asyncio
async def test_rag_copilot_grounded_query():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "query": "What are the insulation resistance requirements in IS 16102 clause 8.1?",
            "language": "en"
        }
        res = await ac.post("/api/copilot/query", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "applicable_standard" in data
        assert len(data["citations"]) > 0
        assert data["trust_layer"]["ai_grounded"] is True
        assert data["trust_layer"]["source_verified"] is True

@pytest.mark.asyncio
async def test_scan_analyze_led_lamp_scenario():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "scenario_override": "scenario-1-led-lamp",
            "ocr_hint": "SURYA 9W IS 16102 CM/L-8400192801"
        }
        res = await ac.post("/api/scan/analyze", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["scenario_id"] == "scenario-1-led-lamp"
        assert "IS 16102" in data["applicable_standard"]
        assert len(data["required_tests"]) >= 3
        assert len(data["suggested_labs"]) >= 1
        assert data["compliance_readiness"]["overall_score"] > 80

@pytest.mark.asyncio
async def test_verification_isi_and_huid():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # ISI verification
        isi_res = await ac.get("/api/verification/isi/CM/L-8400192801")
        assert isi_res.status_code == 200
        isi_data = isi_res.json()
        assert isi_data["is_valid"] is True
        assert "DEMO MODE" in isi_data["disclaimer"]

        # HUID verification
        huid_res = await ac.get("/api/verification/huid/AA1234")
        assert huid_res.status_code == 200
        huid_data = huid_res.json()
        assert huid_data["is_valid"] is True
        assert huid_data["details"]["purity_declared"] == "22K (916 Fineness)"

@pytest.mark.asyncio
async def test_compliance_assessment_and_export():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        assess_payload = {
            "product_name": "LED Lamp 9W",
            "standard_id": "IS-16102-1",
            "manufacturer_type": "Micro",
            "has_test_reports": True,
            "has_quality_manual": True
        }
        res = await ac.post("/api/compliance/assess", json=assess_payload)
        assert res.status_code == 200
        data = res.json()
        assert data["overall_score"] >= 70
        assert len(data["checklist"]) >= 3

        # Test PDF export
        export_payload = {
            "format": "pdf",
            "product_name": "LED Lamp 9W",
            "standard_id": "IS-16102-1",
            "checklist": data["checklist"]
        }
        exp_res = await ac.post("/api/exports/checklist", json=export_payload)
        assert exp_res.status_code == 200
        assert exp_res.headers["content-type"] == "application/pdf"
        assert len(exp_res.content) > 500

@pytest.mark.asyncio
async def test_tamper_evident_audit_chain_integrity():
    integrity = audit_logger.verify_integrity()
    assert integrity["valid"] is True
    assert integrity["total_records"] >= 1
    assert "head_hash" in integrity
