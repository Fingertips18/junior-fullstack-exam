import os

from src.constants.routes import Routes
from tests.test_base import TestBase

class TestAuth(TestBase):
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

    def test_username_is_missing(self):
        # SIGN UP
        payload = {
            'email': self.email,
            'password': self.password
        }

        res = self.client.post(Routes.SIGNUP.value, json=payload)

        self.assertEqual(res.status_code, 400)
        self.assertIn('One or more of the required fields are missing', res.get_data(as_text=True))

    def test_email_is_missing(self):
        # SIGN UP
        payload = {
            'username': self.username,
            'password': self.password
        }

        res = self.client.post(Routes.SIGNUP.value, json=payload)

        self.assertEqual(res.status_code, 400)
        self.assertIn('One or more of the required fields are missing', res.get_data(as_text=True))
        
        # SIGN IN
        payload = {
            'password': self.password
        }

        res = self.client.post(Routes.SIGNIN.value, json=payload)

        self.assertEqual(res.status_code, 400)
        self.assertIn('Email or password is missing', res.get_data(as_text=True))

    def test_password_is_missing(self):
        # SIGN UP
        payload = {
            'username': self.username,
            'email': self.email,
        }

        res = self.client.post(Routes.SIGNUP.value, json=payload)

        self.assertEqual(res.status_code, 400)
        self.assertIn('One or more of the required fields are missing', res.get_data(as_text=True))

        # SIGN IN
        payload = {
            'email': self.email,
        }

        res = self.client.post(Routes.SIGNIN.value, json=payload)

        self.assertEqual(res.status_code, 400)
        self.assertIn('Email or password is missing', res.get_data(as_text=True))

    def test_sign_in_404(self):
        payload = {
            'email': self.email,
            'password': self.password
        }

        res = self.client.post(Routes.SIGNIN.value, json=payload)

        self.assertEqual(res.status_code, 404)
        self.assertIn('User not found', res.get_data(as_text=True))
  
    def test_signup_signin(self):
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