from flask_login import UserMixin
from app import db
from sqlalchemy import Column, String, ARRAY, Boolean
from sqlalchemy.dialects.postgresql import JSONB

class User(UserMixin, db.Model):
    username = Column(String, primary_key=True)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    pages = Column(ARRAY(String))
    api_keys = Column(ARRAY(String))

    def get_id(self):
        return self.username

