from datetime import datetime, timedelta
import pytz
import jwt

from src.constants.routes import Routes
from tests.test_base import TestBase

class TestToken(TestBase):
    def generate_expired_token(self):
        expired_time = datetime.now(pytz.utc) - timedelta(days=1)
        token = jwt.encode({
            'user_id': 1,
            'exp': expired_time
        }, self.app.config['SECRET_KEY'], algorithm='HS256')
        return token
    
    def generate_active_token(self):
        exp = datetime.now(pytz.utc) + timedelta(minutes=5)
        token = jwt.encode({
            'user_id': 1,
            'exp': exp
        }, self.app.config['SECRET_KEY'], algorithm='HS256')
        return token

    def test_token_expired(self):
        expired_token = self.generate_expired_token()
        
        headers = { 'Authorization': expired_token }

        res = self.client.get(Routes.ITEMS.value, headers=headers)

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is expired!', res.get_data(as_text=True))

    def test_token_active(self):
        active_token = self.generate_active_token()

        headers = { 'Authorization': active_token }

        res = self.client.get(Routes.ITEMS.value, headers=headers)

        self.assertEqual(res.status_code, 200)