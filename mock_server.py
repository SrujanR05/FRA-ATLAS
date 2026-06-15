from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="FRA Atlas Mock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api/v1")


class LoginPayload(BaseModel):
    email: str
    password: str


@api.get("/health")
def health():
    return {"status": "ok"}


@api.post("/auth/login")
def login(payload: LoginPayload):
    # Always succeed in mock
    return {"access_token": "demo-token", "token_type": "bearer"}


@api.get("/beneficiaries")
def list_beneficiaries():
    return [
        {
            "id": 1,
            "name": "Rama Devi",
            "village": "Bhumi Nagar",
            "status": "Verified",
        },
        {
            "id": 2,
            "name": "Suresh Kumar",
            "village": "Pinepur",
            "status": "Pending",
        },
    ]


@api.get("/maps/geojson")
def sample_geojson():
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {"name": "Demo parcel"},
                "geometry": {"type": "Polygon", "coordinates": [[[77.0, 28.6], [77.01, 28.6], [77.01, 28.61], [77.0, 28.61], [77.0, 28.6]]]},
            }
        ],
    }


@api.get("/dashboard/stats")
def dashboard_stats():
    return {"total_beneficiaries": 124, "verified": 98, "pending": 26}


app.include_router(api)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("mock_server:app", host="0.0.0.0", port=8000, reload=True)
