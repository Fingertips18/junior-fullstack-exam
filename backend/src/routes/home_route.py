from flask import Blueprint, jsonify, render_template, session

from src.constants.routes import Routes

home_bp = Blueprint(Routes.HOME.name.lower(), __name__)

@home_bp.route(Routes.HOME.value)
def home():
    if 'token' in session:
        return jsonify({ "message": "Welcome to the API!"})
    else:
        return render_template('sign-in-form.html', alert_message="You are not signed in! Please authenticate to continue.")