from src.constants.routes import Routes
from tests.test_base import TestBase

class TestHome(TestBase):
    def test_home_with_token(self):
        with self.client.session_transaction() as sess:
            sess['token'] = 'abc123'

        res = self.client.get(Routes.HOME.value)

        self.assertEqual(res.status_code, 200)
        self.assertIn('Welcome to the API!', res.get_data(as_text=True))