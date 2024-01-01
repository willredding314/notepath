import crypt
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///notepathdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = "sqlalchemy"
app.secret_key = 'super secret string'

db = SQLAlchemy()
migrate = Migrate()
CORS(app, supports_credentials=True)
login_manager = LoginManager()