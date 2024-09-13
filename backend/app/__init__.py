from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes import auth, dashboard 
    app.register_blueprint(auth.bp, url_prefix='/auth')
    app.register_blueprint(dashboard.bp)



    return app
