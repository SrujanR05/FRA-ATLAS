# AI-Powered FRA Atlas & WebGIS Decision Support System

A final year engineering project for Forest Rights Act land-record management, GIS visualization, OCR digitization, satellite analysis, and scheme recommendation support.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Leaflet, Recharts
- Backend: FastAPI, SQLAlchemy, Pydantic, JWT, Alembic
- Database: PostgreSQL, PostGIS
- AI modules: Tesseract OCR, spaCy NLP, TensorFlow placeholder pipeline
- Deployment: Docker, Docker Compose

## Project Structure

- `backend/` FastAPI application, models, services, routes, Alembic migrations
- `frontend/` React/Vite web client with dashboard, GIS map, OCR upload, analysis, and reports
- `docker-compose.yml` Local full-stack orchestration
- `docker/postgres/init.sql` PostGIS extension bootstrap

## Quick Start

1. Copy `.env.example` to `.env`.
2. Start the stack:

```bash
docker compose up --build
```

3. Open the apps:
- Frontend: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`

## Manual Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Manual Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Root `.env`:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`

Frontend optional `.env`:

- `VITE_API_BASE_URL=http://localhost:8000/api/v1`

## Core Modules

- Authentication: register, login, `/auth/me`, protected routes, role-based guards
- Beneficiaries: create, read, update, delete, search, filter
- GIS: interactive map layers for FRA lands, villages, forest areas, and water bodies
- OCR: upload PDF, PNG, JPG and extract beneficiary and claim fields
- Satellite analysis: upload image and generate forest, water, agriculture, settlement percentages
- Decision support: rule-based recommendations for PM-KISAN, Jal Jeevan Mission, MGNREGA, and others
- Dashboard: KPI cards, pie chart, bar chart, and trend chart
- Reports: PDF and Excel export

## API Docs

FastAPI automatically exposes Swagger/OpenAPI at:

- `http://localhost:8000/docs`
- `http://localhost:8000/redoc`

## Demo Access

The backend seeds a demo admin account when demo data is loaded:

- Email: `admin@fraatlas.local`
- Password: `Admin@12345`

## Notes

- The project uses a TensorFlow placeholder pipeline for satellite analysis so the backend API and UI are complete without requiring a trained model file.
- OCR uses Tesseract where available and falls back safely if the local binary is missing.
- PostgreSQL must have PostGIS enabled. The compose file handles that through the init script.
