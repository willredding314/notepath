from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
db = SQLAlchemy()

#api.add_resource(, '/')

if __name__ == '__main__':
    app.run(debug=True)