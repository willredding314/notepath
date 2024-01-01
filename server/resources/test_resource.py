from flask import session
from flask_login import login_required
from flask_restful import Resource
from models.page import Page
from app import db
from models.user import User


class TestResource(Resource):

    @login_required
    def get(self):
        page = Page.query.filter_by(owner="will", name="testDoc").first()
        return page.name
