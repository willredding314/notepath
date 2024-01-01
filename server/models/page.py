from sqlalchemy import Column, Integer, String
from app import db

class Page(db.Model):

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    owner = Column(String, nullable=False)
    content = Column(String, nullable=False)