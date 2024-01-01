from flask import jsonify, request, session
from app import app, db, login_manager, migrate
from flask_restful import Api
from models.user import User
from models.page import Page
from resources.test_resource import TestResource
from flask_login import login_user
from resources.login import Login
from resources.register import Register
from resources.pages import Pages
from resources.page_ext import PageExternal
from resources.page import PageData

#########################################
#               API SETUP               #
#########################################

api = Api()

api.add_resource(Login, "/api/login")
api.add_resource(Register, "/api/register")
api.add_resource(Pages, "/api/<string:username>")
api.add_resource(PageData, "/api/page/<string:id>")
api.add_resource(PageExternal, "/pub/api/<string:username>/page/<string:page_name>")
api.add_resource(TestResource, "/api/test")
api.init_app(app)

#########################################
#         LOGIN MANAGEMENT SETUP        #
#########################################

@login_manager.user_loader
def load_user(username):
    return User.query.filter_by(username=username).first()

login_manager.init_app(app)

#########################################
#               DB SETUP                #
#########################################

with app.app_context():
    db.init_app(app)
    db.create_all()
    migrate.init_app(app, db)

#########################################
#                 RUN                   #
#########################################

if __name__ == '__main__':
    app.run(debug=True)