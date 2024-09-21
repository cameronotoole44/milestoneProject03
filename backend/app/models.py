from datetime import datetime, timezone
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
import re

# association table
user_powerup = db.Table('user_powerup',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('powerup_id', db.Integer, db.ForeignKey('powerup.id'), primary_key=True),
    db.Column('is_used', db.Boolean, default=False),
    db.Column('earned_at', db.DateTime, default=db.func.now()),
    db.Column('quantity', db.Integer, default=1)
)

class User(db.Model):
    # user model: stores user details and stats
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)  # make sure the username is unique with an index
    password_hash = db.Column(db.String(256)) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc)) 
    active_power_ups = db.Column(db.JSON, default=list)    
    # user stats
    games_played = db.Column(db.Integer, default=0)
    total_score = db.Column(db.Integer, default=0)
    highest_score = db.Column(db.Integer, default=0)
    daily_challenge_completed = db.Column(db.Boolean, default=False)

    # many-to-many relationship
    powerups = db.relationship('PowerUp', secondary=user_powerup,
                               backref=db.backref('users', lazy='dynamic'))

    __table_args__ = (db.UniqueConstraint('username', name='_username_uc'),)

    @validates('username')
    def validate_username(self, key, username):
        # check the username meets requirements
        if not username:
            raise ValueError("Username can't be empty.")
        if len(username) < 3 or len(username) > 20:
            raise ValueError("Username must be between 3 and 20 characters.")
        # username contains only allowed characters
        if not re.match('^[A-Za-z0-9_-]+$', username):
            raise ValueError("Username can only include letters, numbers, underscores, and hyphens.")
        # username exists in the database?
        if User.query.filter(User.username.ilike(username)).first():
            raise ValueError("Username already taken.")
        return username.lower()  # store usernames in lowercase for consistency

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class DailyTheme(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=True, nullable=False)
    theme = db.Column(db.String, nullable=False)


class UserDailyChallenge(db.Model):
    __tablename__ = 'user_daily_challenges'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    
    date_answered = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    correct = db.Column(db.Boolean, nullable=False)
    
    # relationships
    user = db.relationship('User', backref='daily_challenges')
    question = db.relationship('Question', backref='daily_attempts')


class PowerUp(db.Model):
    __tablename__ = 'powerup'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    activation_conditions = db.Column(db.String(255))
    usage_limit = db.Column(db.Integer)  # times it can be used

    def __repr__(self):
        return f'<PowerUp {self.name}>'



class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    correct_answer = db.Column(db.String(255), nullable=False)
    theme = db.Column(db.String(64))
    option_a = db.Column(db.String(255))
    option_b = db.Column(db.String(255))
    option_c = db.Column(db.String(255))
    option_d = db.Column(db.String(255))

    def __repr__(self):
        return f'<Question {self.id}: {self.question_text[:20]}...>'
