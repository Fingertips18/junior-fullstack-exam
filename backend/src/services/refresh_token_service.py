from datetime import datetime, timedelta
import pytz

from src.models.refresh_token_model import RefreshTokenModel
from src.configs.db import db

class RefreshTokenService:
    @staticmethod
    def store_token(user_id, token):
        expires_at = datetime.now(pytz.utc) + timedelta(days=1)

        storedToken = RefreshTokenModel.query.filter_by(user_id=user_id).first()

        if not storedToken: 
            new_token = RefreshTokenModel(
                user_id=user_id,
                token=token,
                expires_at=expires_at,
            )
            db.session.add(new_token)
        else:
            storedToken.token = token
            storedToken.expires_at = expires_at

        db.session.commit()

    @staticmethod
    def get_token(user_id):
        return RefreshTokenModel.query.get(user_id)
