from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Question
bp = Blueprint('game', __name__)

@bp.route('/questions', methods=['GET'])
@jwt_required()
def get_questions():
    try:
        current_user = get_jwt_identity()
        print(f"Current user: {current_user}")

        theme = request.args.get('theme')
        if not theme:
            return jsonify({"error": "Theme is required"}), 400
        
        questions = Question.query.filter_by(theme=theme).all() # case sensitive for themes, so include it all
        questions_list = [
            {
                "question_text": q.question_text,
                "correct_answer": q.correct_answer,
                "theme": q.theme,
                "option_a": q.option_a,
                "option_b": q.option_b,
                "option_c": q.option_c,
                "option_d": q.option_d
            }
            for q in questions
        ]
        
        return jsonify(questions_list), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500


