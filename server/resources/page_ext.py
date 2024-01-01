from flask import jsonify, request
from flask_cors import cross_origin
from flask_restful import Resource
from models.user import User
from models.page import Page

class PageExternal(Resource):

    def get(self, username, page_name):
        password = request.json['password']
        user = User.query.filter_by(username=username).first()

        if user is not None and user.password == password:
            page = Page.query.filter_by(name=page_name).first()
            if page.owner == username:
                return jsonify({"content": page.content})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Unauthorized"}), 401