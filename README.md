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
