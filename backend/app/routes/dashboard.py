from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User

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


@bp.route('/leaderboard/global', methods=['GET'])
def global_leaderboard():
    top_users = User.query.order_by(User.total_score.desc()).limit(10).all()
    leaderboard_data = []

    for rank, user in enumerate(top_users, start=1):
        leaderboard_data.append({
            "rank": rank,
            "username": user.username,
            "total_score": user.total_score,
            "highest_score": user.highest_score
        })

    return jsonify(leaderboard_data), 200