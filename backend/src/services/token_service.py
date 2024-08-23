from datetime import datetime, timedelta
from flask import current_app
import pytz
import jwt

from src.models.refresh_token_model import RefreshTokenModel
from src.configs.db import db

class TokenService:
    @staticmethod
    def generate_all_tokens(id, username):
        access_expiration = datetime.now(pytz.utc) + timedelta(minutes=15)
        refresh_expiration = datetime.now(pytz.utc) + timedelta(days=7)

        access_token = jwt.encode({
            'user_id': id,
            'username': username,
            'exp': access_expiration
        }, 
        current_app.config['SECRET_KEY'], 
        algorithm='HS256'
        )

        refresh_token = jwt.encode({
            'user_id': id,
            'username': username,
            'exp': refresh_expiration
        }, 
        current_app.config['SECRET_KEY'], 
        algorithm='HS256'
        )

        return { 'access_token': access_token, 'refresh_token': refresh_token }
    
    @staticmethod
    def generate_new_token(id, username):
        exp = datetime.now(pytz.utc) + timedelta(minutes=15)

        new_token = jwt.encode({
            'user_id': id,
            'username': username,
            'exp': exp
        },
        current_app.config['SECRET_KEY'], 
        algorithm='HS256'
        )

        return { 'access_token': new_token }
    
    
    @staticmethod
    def store_token(user_id, token):
        expires_at = datetime.now(pytz.utc) + timedelta(days=7)

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
        return RefreshTokenModel.query.filter_by(user_id=user_id).first()