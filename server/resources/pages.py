from flask import jsonify, request, session
from flask_login import login_required
from flask_restful import Resource
from models.user import User
from models.page import Page
from app import db


class Pages(Resource):

    @login_required
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if user is not None:
            if user.username == session['username']:
                results = []
                for page_title in user.pages:
                    page = Page.query.filter_by(name=page_title).first()
                    if page is not None:
                        results.append({"name": page_title, "id": page.id})
                return jsonify({"pages": results})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Nonexistent User"}), 400
    
    @login_required
    def put(self, username):
        page_name = request.json['name']
        user = User.query.filter_by(username=username).first()
        if user is not None:
            if user.username == session['username']:
                new_pages = user.pages
                new_pages.append(page_name)
                user.pages = new_pages
                db.session.commit()
                return jsonify({"pages": new_pages})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Nonexistent User"}), 400

    @login_required
    def delete(self, username):
        page_name = request.json['name']
        user = User.query.filter_by(username=username).first()
        if user is not None:
            if user.username == session['username']:
                new_pages = user.pages
                new_pages.remove(page_name)
                user.pages = new_pages
                db.session.commit()
                return jsonify({"pages": new_pages})
            else:
                return jsonify({"error": "Unauthorized"}), 401
        else:
            return jsonify({"error": "Nonexistent User"}), 400