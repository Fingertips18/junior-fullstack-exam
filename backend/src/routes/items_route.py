from flask_restful import Api, Resource, reqparse, fields, marshal_with, abort
from flask import Flask

from src.services.item_service import ItemService
from src.configs.token import token_required
from src.constants.routes import Routes

item_args = reqparse.RequestParser()
item_args.add_argument("name", type=str, required=True, help="Name is required")
item_args.add_argument("desc", type=str, required=True, help="Description is required")
item_args.add_argument("price", type=float, required=True, help="Price is required")

item_field = {
    'id': fields.Integer,
    'name': fields.String,
    'desc': fields.String,
    'price': fields.Float,
    'created_at': fields.DateTime,
}

def items_api(app: Flask):
    api = Api(app)

    api.add_resource(__ItemsResource, Routes.ITEMS.value)
    api.add_resource(__ItemResource, f'{Routes.ITEMS.value}/<int:id>')

class __ItemsResource(Resource):
    @token_required
    @marshal_with(item_field)
    def get(self):
        items = ItemService.get_all()
        return items

    @token_required
    @marshal_with(item_field)
    def post(self):
        args = item_args.parse_args()

        item = ItemService.post(name=args["name"], desc=args["desc"], price=args["price"])

        return item, 201

class __ItemResource(Resource):
    @token_required
    @marshal_with(item_field)
    def get(self, id):
        item = ItemService.get(id)
        if item == None:
            abort(404, "Item not found")

        return item
    
    @token_required
    @marshal_with(item_field)
    def put(self, id):
        args = item_args.parse_args()

        item = ItemService.put(id=id, name=args["name"], desc=args["desc"], price=args["price"])
        if item == None:
            abort(404, "Item not found")

        return item, 200
    
    @token_required
    @marshal_with(item_field)
    def delete(self, id):
        item = ItemService.delete(id=id)
        if item == None:
            abort(404, "Item not found")

        return item, 204