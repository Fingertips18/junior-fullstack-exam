from datetime import datetime

from src.configs.db import db

class RefreshTokenModel(db.Model):
    __tablename__ = 'refresh_token_model'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=False)
    token = db.Column(db.String(500), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f"RefreshTokenModel(user_id={self.user_id}, token='{self.token}', expires_at={self.expires_at}, created_at={self.created_at})"