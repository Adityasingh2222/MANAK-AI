import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MANAK-AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    APP_MODE: str = os.getenv("APP_MODE", "demo")  # demo | production
    
    # Secrets & API Keys
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./manak_ai.db")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # Security & CORS
    SECRET_KEY: str = os.getenv("SECRET_KEY", "manak-ai-sih26107-super-secret-key-2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "*"
    ]
    
    # Audit hash chain
    GENESIS_HASH: str = "0000000000000000000000000000000000000000000000000000000000000000"

    model_config = {"case_sensitive": True, "env_file": ".env", "extra": "ignore"}

settings = Settings()
