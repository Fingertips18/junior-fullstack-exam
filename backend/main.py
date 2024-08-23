from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os

from src.routes.items_route import items_api
from src.routes.users_route import users_api
from src.routes.home_route import home_bp
from src.routes.auth_route import auth_bp
from src.configs.db import init_db

def configure():
    load_dotenv()

def create_app():
    app = Flask(__name__)
    env = os.getenv('FLASK_ENV', 'production')
    if env == 'development':
        CORS(app)
        
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    init_db(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(home_bp)

    users_api(app)
    items_api(app)

    return app

app = create_app()

@app.errorhandler(404)
def not_found_error(_):
    return jsonify({'error': 'Not found', 'status':  404})

@app.errorhandler(500)
def internal_error(_):
    return jsonify({'error': 'Internal server error', 'status':  500}),

if __name__ == '__main__':
    app.run(debug=True)