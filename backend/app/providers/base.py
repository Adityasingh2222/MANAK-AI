from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class BaseAIProvider(ABC):
    @abstractmethod
    async def generate_response(self, prompt: str, context: List[Dict[str, Any]], language: str = "en") -> Dict[str, Any]:
        pass

class BaseVisionProvider(ABC):
    @abstractmethod
    async def analyze_product_image(self, image_data: bytes, mime_type: str = "image/jpeg") -> Dict[str, Any]:
        pass

class BaseOCRProvider(ABC):
    @abstractmethod
    async def extract_text(self, image_data: bytes) -> str:
        pass

class BaseVerificationProvider(ABC):
    @abstractmethod
    async def verify(self, identifier_type: str, identifier_value: str) -> Dict[str, Any]:
        pass
