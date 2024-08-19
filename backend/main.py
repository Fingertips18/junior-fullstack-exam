from application import app
from api import create_api
from db import init_db

db = init_db(app)
api = create_api(app)

def main():
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)