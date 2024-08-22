from src.constants.routes import Routes
from tests.test_base import TestBase

class TestItems(TestBase):
    def test_token_missing(self):
        # GET ITEMS
        res = self.client.get(Routes.ITEMS.value)

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

        # GET ITEM    
        res = self.client.get(f'{Routes.ITEMS.value}/1')

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

        # CREATE ITEM
        payload = {
            'name': 'Test Item',
            'desc': 'This is a test item\'description',
            'price': 99.99
        }

        res = self.client.post(Routes.ITEMS.value, json=payload)

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

        # UPDATE ITEM
        payload = {
            'name': 'Update Test Item',
            'desc': 'This is an update test item\'description',
            'price': 11.11
        }

        res = self.client.put(f'{Routes.ITEMS.value}/1', json=payload)

        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

        # DELETE ITEM
        res = self.client.delete(f'{Routes.ITEMS.value}/1')
        
        self.assertEqual(res.status_code, 401)
        self.assertIn('Token is missing!', res.get_data(as_text=True))

    def test_create_item(self):
        headers = { 'Authorization': self.token }

        item = {
            'name': 'test item',
            'desc': 'this is a test item\'s description.',
            'price': 99.99
        }

        res = self.client.post(Routes.ITEMS.value, headers=headers, json=item)

        created_item = res.get_json()

        self.assertEqual(res.status_code, 201)

        self.assertEqual(created_item['name'], item['name'])
        self.assertEqual(created_item['desc'], item['desc'])
        self.assertEqual(created_item['price'], item['price'])

    def test_get_items(self):
        headers = { 'Authorization': self.token }
        res = self.client.get(Routes.ITEMS.value, headers=headers)

        items = res.get_json()

        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(items, list)
        self.assertGreater(len(items), 0)

        first_item = items[0]
        self.assertIn('name', first_item)
        self.assertIn('desc', first_item)
        self.assertIn('price', first_item)
    
    def test_get_item(self):
        headers = { 'Authorization': self.token }

        res = self.client.get(f'{Routes.ITEMS.value}/1', headers=headers)

        item = res.get_json()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(item['id'], 1)
        self.assertEqual
        self.assertIn('name', item)
        self.assertIn('desc', item)
        self.assertIn('price', item)

    def test_update_item(self):
        headers = { 'Authorization': self.token }
        item = {
            'name': 'update test item',
            'desc': 'this is a update test item\'s description.',
            'price': 11.11
        }
        res = self.client.put(f'{Routes.ITEMS.value}/1', headers=headers, json=item)

        updated_item = res.get_json()

        if updated_item:
            self.assertEqual(res.status_code, 200)

            self.assertEqual(updated_item['name'], item['name'])
            self.assertEqual(updated_item['desc'], item['desc'])
            self.assertEqual(updated_item['price'], item['price'])

        else:
            self.assertEqual(res.status_code, 404)

    def test_delete_item(self):
        headers = { 'Authorization': self.token }
        
        item = {
            'name': 'item to delete',
            'desc': 'this item will be deleted',
            'price': 55.55
        }
        create_res = self.client.post(Routes.ITEMS.value, headers=headers, json=item)
        created_item = create_res.get_json()
        item_id = created_item['id']
        
        delete_res = self.client.delete(f'{Routes.ITEMS.value}/{item_id}', headers=headers)
        self.assertEqual(delete_res.status_code, 204)