from flask import jsonify, request, session
from flask_login import login_required, login_user
from flask_restful import Resource
from models.user import User
from app import db

class Register(Resource):

    def post(self):
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]

        existing_user_by_name = User.query.filter_by(username=username).first()
        existing_user_by_email = User.query.filter_by(email=email).first()

        if existing_user_by_name is None and existing_user_by_email is None and len(password) >= 8:
            new_user = User(
                username=username, 
                password=password, 
                email=email, 
                pages=[]
            )
            db.session.add(new_user)
            db.session.commit()

            login_user(new_user)
            session["username"] = username
            return jsonify({"result": "registered", "name": username})
        
        elif existing_user_by_name is None:
            return jsonify({"result": "name-exists", "name": username})
        else:
            return jsonify({"result": "email-exists", "name": username})