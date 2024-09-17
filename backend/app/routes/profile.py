from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User

bp = Blueprint('profile', __name__)

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "games_played": user.games_played,
        "total_score": user.total_score,
        "highest_score": user.highest_score
    }), 200

@bp.route('/powerups', methods=['GET'])
@jwt_required()
def user_powerups():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id) 

    if not user:
        return jsonify({"msg": "User not found"}), 404

    powerups_data = [{"name": powerup.name, "description": powerup.description} for powerup in user.powerups]

    return jsonify({
        "username": user.username,
        "powerups": powerups_data
    }), 200