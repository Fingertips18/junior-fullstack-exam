from dotenv import load_dotenv
from flask import Flask
import unittest
import os

from src.configs.token import generate_test_token
from src.routes.users_route import users_api
from src.routes.items_route import items_api
from src.routes.auth_route import auth_bp
from src.routes.home_route import home_bp
from src.configs.db import test_db

class TestBase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = Flask(__name__)

        load_dotenv()
        cls.app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

        cls.db = test_db(app=cls.app)

        cls.app.register_blueprint(auth_bp)
        cls.app.register_blueprint(home_bp)

        users_api(cls.app)
        items_api(cls.app)
        
        cls.client = cls.app.test_client()
        cls.token = generate_test_token(app=cls.app)

        with cls.app.app_context():
            cls.db.create_all()


    @classmethod
    def tearDownClass(cls):
        with cls.app.app_context():
            cls.db.session.remove()
            cls.db.drop_all()

if __name__ == '__main__':
    unittest.main()