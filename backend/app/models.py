from pydantic import BaseModel, Field
from typing import Optional

class LucasLehmerRequest(BaseModel):
    p: int = Field(..., gt=0, le=5000, description="Odd prime p for Mersenne number 2^p - 1")

class LucasLehmerResponse(BaseModel):
    p: int
    mersenne_number: str
    is_prime: bool
    steps: int
    error: Optional[str] = None
