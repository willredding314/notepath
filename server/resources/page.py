from flask import jsonify, request, session
from flask_login import login_required
from flask_restful import Resource
from app import db
from models.page import Page

class PageData(Resource):

    @login_required
    def get(self, id):
        page = Page.query.filter_by(id=id).first()
        if page is not None:
            if page.owner == session["username"].username:
                return jsonify({"content": page.content})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Nonexistent Page"}), 400
    
    @login_required
    def post(self, id):
        content = request.json["content"]
        page = Page.query.filter_by(id=id).first()
        if page is not None:
            if page.owner == session["username"].username:
                page.content = content
                db.session.commit()
                return jsonify({"content": page.content})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Nonexistent Page"}), 400