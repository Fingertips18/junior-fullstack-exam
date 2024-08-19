from  flask_restful import Resource, Api, reqparse, fields, abort, marshal_with
from loguru import logger
from flask import Flask

from db import ItemsModel, db

item_args = reqparse.RequestParser()
item_args.add_argument("name", type=str, required=True, help="Name is required")
item_args.add_argument("desc", type=str, required=True, help="Description is required")
item_args.add_argument("price", type=float, required=True, help="Price is required")

item_field = {
    'id': fields.Integer,
    'name': fields.String,
    'desc': fields.String,
    'price': fields.Float,
}

def create_api(app: Flask):
    api = Api(app)

    api.add_resource(__ItemsResource, '/api/items/')
    api.add_resource(__ItemResource, '/api/items/<int:id>')

class __ItemsResource(Resource):
    @marshal_with(item_field)
    def get(self):
        try:
            items = ItemsModel.query.all()
            return items
        except Exception as e:
            logger.error(f"Error fetching items: {e}")
            abort(500, "Internal server error")

    @marshal_with(item_field)
    def post(self):
        args = item_args.parse_args()

        item = ItemsModel(name=args["name"], desc=args["desc"], price=args["price"])
        db.session.add(item)
        db.session.commit()

        return item, 201

class __ItemResource(Resource):
    @marshal_with(item_field)
    def get(self, id):
        try:
            item = ItemsModel.query.get(id)
            if item == None:
                abort(404, "Item not found")

            return item
        except Exception as e:
            logger.error(f"Error fetching item: {e}")
            abort(500, "Internal server error")
    
    @marshal_with(item_field)
    def put(self, id):
        args = item_args.parse_args()

        item = ItemsModel.query.get(id)
        if item == None:
            abort(404, "Item not found")

        item.name = args["name"]
        item.desc = args["desc"]
        item.price = args["price"]

        db.session.commit()

        return item, 200
    
    @marshal_with(item_field)
    def delete(self, id):
        try:
            item = ItemsModel.query.get(id)
            if item == None:
                abort(404, "Item not found")

            db.session.delete(item)
            db.session.commit()

            return '', 204
        except Exception as e:
            logger.error(f"Error deleting item: {e}")
            abort(500, "Internal server error")