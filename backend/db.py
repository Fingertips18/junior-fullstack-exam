from flask_sqlalchemy import SQLAlchemy
from flask import Flask

db = SQLAlchemy()

class ItemsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    desc = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"Item(id={self.id}, name={self.name}, desc={self.desc}, price={self.price})"


def init_db(app: Flask):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    db.init_app(app)

    with app.app_context():
        db.create_all()

    return db
