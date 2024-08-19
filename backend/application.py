from flask import Flask

from constants.routes import Routes

app = Flask(__name__)

@app.route(Routes.HOME.value)
def home():
    return '<h1>REST API</h1>'