from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.blueprints.auth import auth
    from app.blueprints.main import main

    app.register_blueprint(auth)
    app.register_blueprint(main)


    return app
