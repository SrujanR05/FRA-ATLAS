from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Beneficiary(Base):
    __tablename__ = "beneficiaries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    beneficiary_id: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    village: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
    district: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
    state: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
    land_area: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    approval_status: Mapped[str] = mapped_column(String(40), default="Pending", index=True, nullable=False)
    scheme_eligibility: Mapped[list[str]] = mapped_column(JSON, default=list, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    documents: Mapped[list["Document"]] = relationship(back_populates="beneficiary", cascade="all,delete-orphan")
