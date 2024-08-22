import os

from src.constants.routes import Routes
from tests.test_base import TestBase


class TestUsers(TestBase):
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


    def test_token_missing(self):
        # GET USERS
        res = self.client.get(Routes.USERS.value)

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

        # DELETE USERS
        res = self.client.delete(f'{Routes.USERS.value}/1')
        
        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

    def test_delete_user(self):
        # CREATE USER
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

        # DELETE USER
        headers = { 'Authorization': self.token }

        res = self.client.delete(f'{Routes.USERS.value}/1', headers=headers)

        self.assertEqual(res.status_code, 204)
        
