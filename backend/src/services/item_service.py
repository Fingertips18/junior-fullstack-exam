from src.models.item_model import ItemModel
from src.configs.db import db

class ItemService:
    @staticmethod
    def get_all():
        return ItemModel.query.all()
    
    @staticmethod
    def get(id):
        return ItemModel.query.filter_by(id=id).first()
    
    @staticmethod
    def post(name, desc, price):
        item = ItemModel(name=name, desc=desc, price=price)
        db.session.add(item)
        db.session.commit()

        return item
    
    @staticmethod
    def put(id, name, desc, price):
        item = ItemService.get(id)

        if item == None:
            return None
        
        item.name = name
        item.desc = desc
        item.price = price

        db.session.commit()

        return item
    
    @staticmethod
    def delete(id):
        item = ItemService.get(id)

        if item == None:
            return None
        
        db.session.delete(item)
        db.session.commit()

        return ''
