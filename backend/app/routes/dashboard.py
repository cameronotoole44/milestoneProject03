import random
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Question, UserDailyChallenge, DailyTheme
from datetime import datetime, timezone, timedelta
import pytz
from sqlalchemy import func
from app import db

bp = Blueprint('dashboard', __name__)

@bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    response = {
        "username": user.username,
        "games_played": user.games_played,
        "total_score": user.total_score,
        "highest_score": user.highest_score,
    }

    return jsonify(response), 200

@bp.route('/leaderboard', methods=['GET'])
@jwt_required()
def get_leaderboard():
    try:
        users = User.query.order_by(User.total_score.desc()).limit(10).all()
        leaderboard = [
            {"username": user.username, "total_score": user.total_score}
            for user in users
        ]
        return jsonify(leaderboard), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500

@bp.route('/random-theme', methods=['GET'])
@jwt_required()
def get_random_theme():
    today = datetime.now(timezone.utc).date()

    # is the theme set for the day?
    daily_theme = DailyTheme.query.filter_by(date=today).first()

    if daily_theme:
        return jsonify({"theme": daily_theme.theme}), 200
    
    # no? generate a new random theme
    themes = db.session.query(Question.theme).distinct().all()

    if not themes:
        return jsonify({"error": "No themes available"}), 404

    theme_list = [theme[0] for theme in themes]
    random_theme = random.choice(theme_list)

    # save the theme to database
    new_daily_theme = DailyTheme(date=today, theme=random_theme)
    db.session.add(new_daily_theme)
    db.session.commit()

    return jsonify({"theme": random_theme}), 200

@bp.route('/daily-challenge', methods=['GET'])
@jwt_required()
def get_daily_challenge():
    user_id = get_jwt_identity()
    
    # installed pytz to handle different timezones for the 12h check(offset-aware*)
    tz = pytz.timezone('America/New_York')  # using my timezone
    today = datetime.now(tz)

    # does user have a daily challenge for the day
    daily_challenge = UserDailyChallenge.query.filter_by(user_id=user_id).first()

    # makes last_challenge_time is aware
    if daily_challenge and daily_challenge.last_challenge_time.tzinfo is None:
        # set to UTC if timezone is 'naive'
        daily_challenge.last_challenge_time = daily_challenge.last_challenge_time.replace(tzinfo=timezone.utc)

    # does challenge exist and has it been less than 12 hours?
    if daily_challenge:
        time_since_last_challenge = today - daily_challenge.last_challenge_time
        if time_since_last_challenge < timedelta(hours=12):
            question = Question.query.get(daily_challenge.question_id)
            if not question:
                return jsonify({"error": "Question not found"}), 404
            return jsonify({
                "id": question.id,
                "question_text": question.question_text,
                "options": [
                    {"text": question.option_a},
                    {"text": question.option_b},
                    {"text": question.option_c},
                    {"text": question.option_d},
                ]
            }), 200

    # ff none and it's been longer than 12h, generate a new challenge
    theme = request.args.get('theme')
    if not theme:
        return jsonify({"error": "Theme parameter is required"}), 400

    question = db.session.query(Question).filter_by(theme=theme).order_by(func.random()).first()
    if not question:
        return jsonify({"error": "No questions found for the given theme"}), 404

    if daily_challenge:
        daily_challenge.question_id = question.id
        daily_challenge.last_challenge_time = today
    else:
        daily_challenge = UserDailyChallenge(user_id=user_id, question_id=question.id, last_challenge_time=today)
        db.session.add(daily_challenge)

    db.session.commit()

    return jsonify({
        "id": question.id,
        "question_text": question.question_text,
        "options": [
            {"text": question.option_a},
            {"text": question.option_b},
            {"text": question.option_c},
            {"text": question.option_d},
        ]
    }), 200


@bp.route('/submit-daily-challenge', methods=['POST'])
@jwt_required()
def submit_daily_challenge():
    user_id = get_jwt_identity()
    data = request.json
    question_id = data.get('question_id')
    submitted_answer = data.get('answer')

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    is_correct = submitted_answer.strip().lower() == question.correct_answer.strip().lower()

    daily_challenge = UserDailyChallenge.query.filter_by(user_id=user_id, question_id=question_id).first()
    if not daily_challenge:
        return jsonify({"error": "Daily challenge not found"}), 404

    daily_challenge.correct = is_correct
    daily_challenge.date_answered = datetime.now(timezone.utc)
    db.session.commit()

    return jsonify({"message": "Daily challenge completed", "correct": is_correct}), 200