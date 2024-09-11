from datetime import datetime, timedelta, timezone
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
from sqlalchemy import UniqueConstraint
import re

class User(db.Model):
    # user model: stores user details and stats
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)  # make sure the username is unique with an index
    password_hash = db.Column(db.String(256)) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc) ) 
    
    # user stats
    games_played = db.Column(db.Integer, default=0)
    total_score = db.Column(db.Integer, default=0) 
    highest_score = db.Column(db.Integer, default=0)

    # the relationships to other models
    challenges = db.relationship('Challenge', backref='creator', lazy=True)  # challenges created by this user
    responses = db.relationship('ChallengeResponse', backref='user', lazy=True)  # responses given by this user
    
    # usernames are unique
    __table_args__ = (UniqueConstraint('username', name='_username_uc'),)

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
        # username exist in the data base?
        if User.query.filter(User.username.ilike(username)).first():
            raise ValueError("Username already taken.")
        return username.lower()  # store usernames in lowercase for consistency

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        # verifies the provided password against the stored hash
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Challenge(db.Model):
    # challenge model: represents a game challenge created by a user
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # should link to the user who created the challenge
    theme = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc) )  # when the challenge was created (utc.now is deprecated*)
    expires_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc) () + timedelta(days=7))  # challenge expiration
    
    # relationships
    responses = db.relationship('ChallengeResponse', backref='challenge', lazy=True)  # responses to this challenge
    questions = db.relationship('ChallengeQuestion', backref='challenge', lazy=True)  # the questions associated with thischallenge

    def __repr__(self):
        return f'<Challenge {self.id} by User {self.creator_id}>'

class ChallengeResponse(db.Model):
    # challenge response model: represents a user's response to a challenge
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    score = db.Column(db.Integer)  # users score
    completed_at = db.Column(db.DateTime, default=datetime.now(timezone.utc) )  # when wasthe response was completed

    def __repr__(self):
        return f'<ChallengeResponse {self.id} by User {self.user_id} for Challenge {self.challenge_id}>'

class Question(db.Model):
    # question model: represents a question used in challenges
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    correct_answer = db.Column(db.String(255), nullable=False)
    theme = db.Column(db.String(64))
    option_a = db.Column(db.String(255)) 
    option_b = db.Column(db.String(255)) 
    option_c = db.Column(db.String(255))  
    option_d = db.Column(db.String(255))  
    
    challenge_questions = db.relationship('ChallengeQuestion', backref='question', lazy=True)

    def __repr__(self):
        return f'<Question {self.id}: {self.question_text[:20]}...>'

class ChallengeQuestion(db.Model):
    # challenge question model: links questions to challenges
    id = db.Column(db.Integer, primary_key=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'), nullable=False) 
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)  

    def __repr__(self):
        return f'<ChallengeQuestion {self.id} for Challenge {self.challenge_id}>'