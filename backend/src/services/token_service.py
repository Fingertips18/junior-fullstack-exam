from datetime import datetime, timedelta
from flask import current_app
import pytz
import jwt

from src.services.refresh_token_service import RefreshTokenService

class TokenService:
    @staticmethod
    def generate_token(id):
        access_expiration = datetime.now(pytz.utc) + timedelta(minutes=5)
        refresh_expiration = datetime.now(pytz.utc) + timedelta(days=1)
        
        access_token = jwt.encode({
            'user_id': id,
            'expiration': access_expiration.isoformat()
        }, 
        current_app.config['SECRET_KEY'], 
        algorithm='HS256'
        )

        refresh_token = jwt.encode({
            'user_id': id,
            'expiration': refresh_expiration.isoformat()
        }, 
        current_app.config['SECRET_KEY'], 
        algorithm='HS256'
        )

        RefreshTokenService.store_token(user_id=id, token=refresh_token)

        return { 'access_token': access_token, 'refresh_token': refresh_token }