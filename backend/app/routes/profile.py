from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.power.PowerUpActivation import activate_thors_fury, activate_athenas_insight
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

@bp.route('/profile/powerups', methods=['GET'])
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

@bp.route('/powerups/activate', methods=['POST'])
@jwt_required()
def activate_powerup():
    data = request.get_json()
    powerup_name = data['powerup_name']
    user_id = get_jwt_identity()

    if not User.query.get(user_id):
        return jsonify({"msg": "User not found"}), 404

    if powerup_name == 'Thor\'s Fury':
        activate_thors_fury(user_id)
    elif powerup_name == 'Athena\'s Insight':
        activate_athenas_insight(user_id)
    else:
        return jsonify({"msg": "Invalid power-up name"}), 400

    return jsonify({'message': 'Power-up activated'}), 200
