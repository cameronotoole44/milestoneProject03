import random
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Question
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

# get a random theme
@bp.route('/random-theme', methods=['GET'])
@jwt_required()
def get_random_theme():
    try:
        themes = db.session.query(Question.theme).distinct().all()
        
        if not themes:
            return jsonify({"error": "No themes available"}), 404
        
        #  convert the tuples to list of strings
        theme_list = [theme[0] for theme in themes]
        
        random_theme = random.choice(theme_list)
        
        return jsonify({"theme": random_theme}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500



@bp.route('/daily-challenge', methods=['GET'])
@jwt_required()
def get_daily_challenge():
    theme = request.args.get('theme')
    
    if not theme:
        return jsonify({"error": "Theme parameter is required"}), 400
    
    try:
        # print(f"Fetching daily challenge for theme: {theme}")  # debugging
        
        question = db.session.query(Question).filter_by(theme=theme).order_by(db.func.random()).first()
        
        if not question:
            return jsonify({"error": "No questions found for the given theme"}), 404
        
        question_data = {
            "id": question.id,
            "question_text": question.question_text,
            "options": [
                {"text": question.option_a},
                {"text": question.option_b},
                {"text": question.option_c},
                {"text": question.option_d},
            ],
            "correct_answer": question.correct_answer
        }
        
        return jsonify(question_data), 200
    except Exception as e:
        return jsonify({"error": "An error occurred"}), 500
