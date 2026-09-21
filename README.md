# Lucas-Lehmer Primality Test — Full-Stack App

An interactive tool for testing whether Mersenne numbers (2^p − 1) are prime.
FastAPI backend implements the algorithm. React + TypeScript frontend handles the UI.

## Stack

| Layer | Tech | Why |
|---|---|---|
| Backend | FastAPI + Python 3.12 | Fast API, native big integers |
| Frontend | React 18 + TypeScript + Vite | Type-safe SPA |
| Deploy | Docker multi-stage | Single production image |

## Quick Start

### Dev mode

Terminal 1 (backend):
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload


---

### Verifiability

The backend implements the Lucas-Lehmer test exactly as defined: start at `S(1) = 4`, iterate `p - 2` times, check if the final `S mod M_p` is zero. All your test cases pass — p=11/15/21 return false, p=13/17/19 return true. Python's arbitrary-precision integers mean no overflow for p up to 5000 (the validation ceiling).

**To run it:** `cd backend && uvicorn app.main:app --reload`, then `cd frontend && npm install && npm run dev`. Two terminals. Done.
