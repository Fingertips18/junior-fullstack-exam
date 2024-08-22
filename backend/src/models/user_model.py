from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

from src.configs.db import db

class UserModel(db.Model):
    __tablename__ = 'user_model'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f"User(id={self.id}, username={self.username}, email={self.email}, created_at={self.created_at})"