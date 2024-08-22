from flask import Flask, abort, current_app, request
from functools import wraps
import datetime
import pytz
import jwt

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            abort(401, 'Token is missing!')
        
        try:
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            abort(401, 'Token is expired!')
        except jwt.InvalidTokenError:
            abort(401, 'Token is invalid!')
        except Exception:
            abort(500, 'Server error')
        
        return func(*args, **kwargs)
    
    return decorated

def generate_test_token(app: Flask):
    payload = {
        'user_id': 1,
        'exp': datetime.datetime.now(pytz.utc) + datetime.timedelta(seconds=30)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token