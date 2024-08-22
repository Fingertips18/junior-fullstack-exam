from datetime import datetime

from src.configs.db import db

class ItemModel(db.Model):
    __tablename__ = 'item_model'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    desc = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f"Item(id={self.id}, name={self.name}, desc={self.desc}, price={self.price}, created_at={self.created_at})"