from fastapi import APIRouter, HTTPException
from ..models import LucasLehmerRequest, LucasLehmerResponse

router = APIRouter(prefix="/api", tags=["lucas-lehmer"])

def is_odd_prime(n: int) -> bool:
    if n == 2:
        return False
    if n < 3 or n % 2 == 0:
        return False
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True

def lucas_lehmer_test(p: int) -> tuple[bool, int]:
    if not is_odd_prime(p):
        return False, 0

    mersenne = (1 << p) - 1  # Python native big int, same as 2^p - 1
    s = 4
    steps = 0

    for _ in range(p - 2):
        s = (s * s - 2) % mersenne
        steps += 1

    return s == 0, steps

@router.post("/lucas-lehmer", response_model=LucasLehmerResponse)
async def calculate_lucas_lehmer(req: LucasLehmerRequest):
    try:
        mersenne = (1 << req.p) - 1
        is_prime, steps = lucas_lehmer_test(req.p)

        return LucasLehmerResponse(
            p=req.p,
            mersenne_number=str(mersenne),
            is_prime=is_prime,
            steps=steps
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
