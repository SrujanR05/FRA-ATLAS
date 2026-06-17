from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SatelliteAnalysis(Base):
    __tablename__ = "satellite_analysis"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    image_path: Mapped[str] = mapped_column(String(500), nullable=False)
    forest_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    water_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    agriculture_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    settlement_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
