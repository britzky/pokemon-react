from flask import Flask, g, request
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    
    @app.before_request
    def require_token():
        from app.models import User
        token = request.cookies.get('token')
        if token:
            user = User.check_token(token)
            if user:
                g.current_user = user
        else:
            g.current_user = None

    from app.blueprints.auth import auth
    from app.blueprints.main import main

    app.register_blueprint(auth)
    app.register_blueprint(main)

    CORS(app, supports_credentials=True)


    return app
