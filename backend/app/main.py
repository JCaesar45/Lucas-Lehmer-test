from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import lucas_lehmer

app = FastAPI(
    title="Lucas-Lehmer API",
    version="1.0.0",
    description="Mersenne prime primality test API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lucas_lehmer.router)

@app.get("/api/health")
async def health():
    return {"status": "ok"}
