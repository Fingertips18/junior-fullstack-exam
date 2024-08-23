from datetime import datetime, timedelta
import pytz
import jwt
import os

from src.constants.routes import Routes
from tests.test_base import TestBase

class TestToken(TestBase):
    def setUp(self):
        super().setUp()

        self.username = os.getenv('TEST_USERNAME')
        self.email = os.getenv('TEST_EMAIL')
        self.password = os.getenv('TEST_PASSWORD')

        if not self.username:
            raise ValueError("TEST_USERNAME environment variable is not set or is empty")
        if not self.email:
            raise ValueError("TEST_EMAIL environment variable is not set or is empty")
        if not self.password:
            raise ValueError("TEST_PASSWORD environment variable is not set or is empty")
        
    def generate_expired_token(self):
        expired_time = datetime.now(pytz.utc) - timedelta(days=1)
        token = jwt.encode({
            'user_id': 1,
            'username': self.username,
            'exp': expired_time
        }, self.app.config['SECRET_KEY'], algorithm='HS256')
        return token
    
    def generate_active_token(self):
        exp = datetime.now(pytz.utc) + timedelta(minutes=5)
        token = jwt.encode({
            'user_id': 1,
            'username': self.username,
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

    def test_refresh_token(self):
        # SIGN UP
        payload = {
            'username': self.username,
            'email': self.email,
            'password': self.password
        }

        res = self.client.post(Routes.SIGNUP.value, json=payload)
        data = res.get_json()

        self.assertEqual(res.status_code, 201)
        self.assertIn('created_at', data)
        self.assertIsInstance(data['created_at'], str)

        # SIGN IN
        payload = {
            'email': self.email,
            'password': self.password
        }

        res = self.client.post(Routes.SIGNIN.value, json=payload)
        data = res.get_json()

        self.assertEqual(res.status_code, 200)
        self.assertIn('access_token', data)
        self.assertIn('refresh_token', data)
        self.assertIsInstance(data['access_token'], str)
        self.assertIsInstance(data['refresh_token'], str)

        # GENERATE NEW TOKEN
        res = self.client.post(Routes.REFRESH.value, json={'refresh_token': data['refresh_token']})
        data = res.get_json()

        self.assertEqual(res.status_code, 200)
        self.assertIn('access_token', data)
        self.assertIsInstance(data['access_token'], str)
