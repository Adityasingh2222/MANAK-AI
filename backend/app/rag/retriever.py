import json
import os
import re
from typing import List, Dict, Any, Tuple, Optional
from backend.app.rag.bm25 import SimpleBM25

class HybridRetriever:
    """
    Hybrid Standards & Clause Retriever.
    Combines:
    1. Exact regulatory identifier matcher (IS numbers, clauses, schemes)
    2. BM25 sparse lexical search
    3. Dense semantic vector score (or Qdrant if connected)
    """
    def __init__(self, standards_path: str = "data/demo/standards.json", clauses_path: str = "data/demo/clauses.json"):
        self.standards_path = standards_path
        self.clauses_path = clauses_path
        self.bm25 = SimpleBM25()
        self.clauses: List[Dict[str, Any]] = []
        self.standards: List[Dict[str, Any]] = []
        self._load_data()

    def _load_data(self):
        if os.path.exists(self.standards_path):
            with open(self.standards_path, "r", encoding="utf-8") as f:
                self.standards = json.load(f)
        else:
            self.standards = []

        if os.path.exists(self.clauses_path):
            with open(self.clauses_path, "r", encoding="utf-8") as f:
                self.clauses = json.load(f)
        else:
            self.clauses = []

        # Fit BM25 index on clauses
        self.bm25.fit(self.clauses, text_field="text")

    def retrieve(
        self,
        query: str,
        exact_is_number: Optional[str] = None,
        exact_clause: Optional[str] = None,
        top_k: int = 4
    ) -> List[Dict[str, Any]]:
        scored_clauses: Dict[str, Dict[str, Any]] = {}
        
        # 1. Exact Identifier Matching
        query_norm = query.upper()
        
        # Check for IS number patterns in query
        detected_is = exact_is_number
        if not detected_is:
            match = re.search(r'IS\s*([0-9]{3,5})', query_norm)
            if match:
                detected_is = match.group(1)

        # Check for clause patterns (e.g. clause 7.2 or cl 8.1)
        detected_clause = exact_clause
        if not detected_clause:
            cl_match = re.search(r'(?:CLAUSE|CL\.?)\s*([0-9]+(?:\.[0-9]+)*)', query_norm)
            if cl_match:
                detected_clause = cl_match.group(1)

        for clause in self.clauses:
            clause_id = clause["id"]
            score = 0.0
            
            # Exact IS number match gets high priority
            if detected_is:
                if detected_is in clause["standard_number"] or detected_is in clause["standard_id"]:
                    score += 5.0

            # Exact clause number match gets high priority
            if detected_clause:
                if detected_clause == clause["clause"] or detected_clause == clause.get("sub_clause"):
                    score += 6.0
                elif clause["clause"].startswith(detected_clause):
                    score += 3.0

            if score > 0:
                scored_clauses[clause_id] = {
                    "clause": clause,
                    "score": score,
                    "match_type": "exact_identifier"
                }

        # 2. BM25 Sparse Lexical Search
        bm25_results = self.bm25.search(query, top_k=top_k * 2)
        for clause, bm_score in bm25_results:
            cid = clause["id"]
            if cid in scored_clauses:
                scored_clauses[cid]["score"] += bm_score * 0.8
                scored_clauses[cid]["match_type"] = "hybrid_exact_and_bm25"
            else:
                scored_clauses[cid] = {
                    "clause": clause,
                    "score": bm_score * 0.8,
                    "match_type": "bm25_lexical"
                }

        # 3. Dense semantic similarity placeholder / embedding boost
        # Calculate token overlap boost
        q_tokens = set(SimpleBM25.tokenize(query))
        for item in scored_clauses.values():
            cl_text = item["clause"]["text"].lower()
            overlap = sum(1 for t in q_tokens if t in cl_text)
            item["score"] += overlap * 0.2

        sorted_items = sorted(scored_clauses.values(), key=lambda x: x["score"], reverse=True)
        return [item["clause"] for item in sorted_items[:top_k]]

retriever = HybridRetriever()
