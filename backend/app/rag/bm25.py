import math
import re
from typing import List, Dict, Any, Tuple

class SimpleBM25:
    """
    In-memory BM25 retrieval index for standards documents and clauses.
    """
    def __init__(self, k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus: List[Dict[str, Any]] = []
        self.doc_lengths: List[int] = []
        self.avg_doc_len: float = 0.0
        self.df: Dict[str, int] = {}
        self.idf: Dict[str, float] = {}
        self.doc_freqs: List[Dict[str, int]] = []

    @staticmethod
    def tokenize(text: str) -> List[str]:
        text = text.lower()
        # Extract alphanumeric words and special patterns like IS numbers
        return re.findall(r'[a-z0-9]+', text)

    def fit(self, documents: List[Dict[str, Any]], text_field: str = "text"):
        self.corpus = documents
        self.doc_lengths = []
        self.doc_freqs = []
        self.df = {}
        
        for doc in documents:
            content = f"{doc.get('title', '')} {doc.get('standard_number', '')} {doc.get('clause', '')} {doc.get(text_field, '')} {' '.join(doc.get('keywords', []))}"
            tokens = self.tokenize(content)
            self.doc_lengths.append(len(tokens))
            freq: Dict[str, int] = {}
            for t in tokens:
                freq[t] = freq.get(t, 0) + 1
            self.doc_freqs.append(freq)
            for t in freq:
                self.df[t] = self.df.get(t, 0) + 1

        total_docs = len(documents)
        self.avg_doc_len = sum(self.doc_lengths) / total_docs if total_docs > 0 else 0
        
        # Compute IDF
        self.idf = {}
        for word, freq in self.df.items():
            self.idf[word] = math.log((total_docs - freq + 0.5) / (freq + 0.5) + 1)

    def search(self, query: str, top_k: int = 5) -> List[Tuple[Dict[str, Any], float]]:
        query_tokens = self.tokenize(query)
        scores: List[float] = [0.0] * len(self.corpus)

        for i, doc_freq in enumerate(self.doc_freqs):
            doc_len = self.doc_lengths[i]
            for token in query_tokens:
                if token in doc_freq:
                    tf = doc_freq[token]
                    idf = self.idf.get(token, 0.1)
                    denom = tf + self.k1 * (1 - self.b + self.b * (doc_len / (self.avg_doc_len or 1.0)))
                    scores[i] += idf * (tf * (self.k1 + 1)) / (denom or 1.0)

        results = [(self.corpus[i], scores[i]) for i in range(len(self.corpus)) if scores[i] > 0]
        results.sort(key=lambda x: x[1], reverse=True)
        return results[:top_k]
