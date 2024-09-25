import random
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Question

bp = Blueprint('game', __name__)

def shuffle_options(question): # use the helper function to shuffle

    options = [
        {'option': 'option_a', 'text': question.option_a},
        {'option': 'option_b', 'text': question.option_b},
        {'option': 'option_c', 'text': question.option_c},
        {'option': 'option_d', 'text': question.option_d}
    ]
    random.shuffle(options)
    return options

@bp.route('/questions/', methods=['GET'])
@jwt_required()
def get_questions():
    try:
        current_user = get_jwt_identity()
        print(f"Current user: {current_user}")

        theme = request.args.get('theme')
        if not theme:
            return jsonify({"error": "Theme is required"}), 400
        
        questions = Question.query.filter_by(theme=theme).all()
        random.shuffle(questions)  # shuffle questions list
        
        questions_list = [
            {
                "question_text": q.question_text,
                "correct_answer": q.correct_answer,
                "theme": q.theme,
                "options": shuffle_options(q)  # shuffle answers
            }
            for q in questions
        ]
        
        return jsonify(questions_list), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500



