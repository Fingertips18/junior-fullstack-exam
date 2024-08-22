from flask_restful import Api, Resource, reqparse, fields, marshal_with, abort
from flask import Flask

from src.services.user_service import UserService
from src.configs.token import token_required
from src.constants.routes import Routes

user_args = reqparse.RequestParser()
user_args.add_argument("username", type=str, required=True, help="Username is required")
user_args.add_argument("email", type=str, required=True, help="Email is required")
user_args.add_argument("password", type=str, required=True, help="Password is required")


user_field = {
    'id': fields.Integer,
    'username': fields.String,
    'email': fields.String,
    'password_hash': fields.String,
    'created_at': fields.DateTime,
}

def users_api(app: Flask):
    api = Api(app)
    
    api.add_resource(__UsersResource, Routes.USERS.value)
    api.add_resource(__UserResource, f'{Routes.USERS.value}/<int:id>')

class __UsersResource(Resource):
    @token_required
    @marshal_with(user_field)
    def get(self):
        users = UserService.get_all()
        return users

class __UserResource(Resource):
    @token_required
    @marshal_with(user_field)
    def delete(self, id):
        user = UserService.delete(id)
        if user is None:
            abort(404, "User not found")

        return user, 204
