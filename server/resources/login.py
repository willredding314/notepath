from flask import jsonify, request, session
from flask_login import login_required, login_user
from flask_restful import Resource
from models.user import User
from app import db

class Login(Resource):

    def get(self):
        if session.get("username") is not None:
            return jsonify({"result": "success", "username": session["username"]})
        else:
            return jsonify({"result": "failure"})      

    def post(self):
        username = request.json["username"]
        password = request.json["password"]

        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({"error": "Unauthorized"}), 401
        if user.password != password:
            return jsonify({"error": "Unauthorized"}), 401
        login_user(user)
        session["username"] = user.username
        return user.username