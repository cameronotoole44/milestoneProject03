import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    
    if 'DATABASE_URL' in os.environ:
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    else:
        DB_USERNAME = os.environ.get('POSTGRES_USER') or os.environ.get('DB_USERNAME')
        DB_PASSWORD = os.environ.get('POSTGRES_PASSWORD') or os.environ.get('DB_PASSWORD')
        DB_HOST = os.environ.get('PGHOST') or os.environ.get('DB_HOST')
        DB_PORT = os.environ.get('PGPORT') or os.environ.get('DB_PORT')
        DB_DATABASE = os.environ.get('POSTGRES_DB') or os.environ.get('DB_DATABASE')
        DB_DIALECT = 'postgresql'
        
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False