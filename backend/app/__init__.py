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
    app = Flask(__name__)
    CORS(app, 
     resources={r"/*": {"origins": "http://localhost:3000"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
     expose_headers=["Content-Type", "Authorization"])


    app.config.from_object(config_class)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1) 
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    from .routes import auth, dashboard, profile, game
    app.register_blueprint(auth.bp, url_prefix='/auth')
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(game.bp)
    
    return app



