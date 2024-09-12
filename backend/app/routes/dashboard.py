from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Challenge, ChallengeResponse

bp = Blueprint('dashboard', __name__)

@bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    created_challenges = Challenge.query.filter_by(creator_id=user.id).all()
    completed_challenges = ChallengeResponse.query.filter_by(user_id=user.id).all()

    response = {
        "username": user.username,
        "games_played": user.games_played,
        "total_score": user.total_score,
        "highest_score": user.highest_score,
        "challenges_created": [challenge.id for challenge in created_challenges],
        "challenges_completed": [response.id for response in completed_challenges]
    }

    return jsonify(response), 200


