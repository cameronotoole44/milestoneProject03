import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    application = Flask(__name__)
    CORS(application,
     resources={r"/*": {"origins": [
         "http://localhost:3000",
         "https://milestone-project03.vercel.app",
         "https://loremasterfe.up.railway.app"
     ],
     "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     "allow_headers": ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
     "expose_headers": ["Content-Type", "Authorization"]
     }},
     supports_credentials=True)

    application.config.from_object(config_class)
    application.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

    db.init_app(application)
    migrate.init_app(application, db)
    jwt.init_app(application)

    from .routes import auth, dashboard, profile, game, test
    application.register_blueprint(auth.bp, url_prefix='/auth')
    application.register_blueprint(dashboard.bp)
    application.register_blueprint(profile.bp)
    application.register_blueprint(game.bp)
    application.register_blueprint(test.bp)
    

    return application