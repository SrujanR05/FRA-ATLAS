from app.services.auth_service import create_user, get_user_by_email
from app.schemas.auth import UserCreate
from app.db.session import SessionLocal

db = SessionLocal()
user_in = UserCreate(name='Srujan R', email='s99005623@gmail.com', password='Password123', role='Government Officer')
try:
    existing = get_user_by_email(db, user_in.email)
    print('existing before:', existing)
    user = create_user(db, user_in)
    print('created:', user.email, user.id)
except Exception as e:
    print('EXCEPTION:', e)
finally:
    db.close()
