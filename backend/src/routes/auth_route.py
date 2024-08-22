from flask import Blueprint,jsonify, make_response, request, current_app, session
from datetime import datetime, timedelta
import logging
import pytz
import jwt

from src.services.token_service import TokenService
from src.services.user_service import UserService
from src.constants.routes import Routes

auth_bp = Blueprint("auth", __name__)
logger = logging.getLogger(__name__)

@auth_bp.route(Routes.SIGNIN.value, methods=['POST'])
def signIn():
    data = request.json
    
    if not data:
        return make_response(jsonify({'error': 'Invalid JSON'}), 400)

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return make_response(jsonify({'error': 'Email or password is missing'}), 400)

    try:
        user = UserService.signIn(email, password)

        if user is None:
            return make_response(jsonify({'error': 'User not found'}), 404)

        token = TokenService.generate_all_tokens(id=user.id)

        TokenService.store_token(user_id=user.id, token=token['refresh_token'])

        session['token'] = token['refresh_token']

        return make_response(jsonify(token), 200)

    except Exception as e:
        logger.error(e, exc_info=True)
        return make_response(jsonify({'error': 'Unable to verify credentials'}), 500)
    
@auth_bp.route(Routes.SIGNUP.value, methods=['POST'])
def signUp():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return make_response(jsonify({'error': 'One or more of the required fields are missing'}), 400)
    
    try:
        created_at = UserService.signUp(username, email, password)
        return make_response(jsonify({'created_at': created_at.strftime('%Y-%m-%dT%H:%M:%S')}), 201)
    except Exception as e:
        logger.error(e)
        return make_response(jsonify({'error': 'Unable to register credentials'}), 500)

@auth_bp.route(Routes.REFRESH.value, methods=['POST'])
def refresh():
    data = request.json
    refresh_token = data.get('refresh_token')

    if not refresh_token:
        return make_response(jsonify({'error': 'Refresh token is missing'}), 401)

    try:
        payload = jwt.decode(refresh_token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user_id = payload['user_id']
        stored_token = TokenService.get_token(user_id=user_id)

        if not stored_token or refresh_token != stored_token.token:
            return make_response(jsonify({'error': 'Invalid refresh token'}), 401)

        # Generate a new access token
        new_token = TokenService.generate_new_token(id=user_id)

        return make_response(jsonify(new_token), 200)

    except jwt.ExpiredSignatureError:
        return make_response(jsonify({'error': 'Refresh token has expired'}), 401)
    except jwt.InvalidTokenError:
        return make_response(jsonify({'error': 'Invalid refresh token'}), 401)
    except Exception as e:
        logger.error(e)
        return make_response(jsonify({'error': 'Unable to refresh token'}), 500)