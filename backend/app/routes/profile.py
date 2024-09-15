from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User

bp = Blueprint('profile', __name__)

@bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    if not user:
        return jsonify({"msg": "User not found"}), 404

    response = {
        "games_played": user.games_played,
        "total_score": user.total_score,
        "highest_score": user.highest_score,
        "powerups": [powerup.to_dict() for powerup in user.powerups]
    }
    
    return jsonify(response), 200

@bp.route('/powerups', methods=['GET'])
@jwt_required()
def user_powerups():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    powerups_data = [{"name": powerup.name, "description": powerup.description} for powerup in user.powerups]

    return jsonify({
        "username": user.username,
        "powerups": powerups_data
    }), 200