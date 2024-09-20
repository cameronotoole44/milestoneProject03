from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.power.PowerUpActivation import activate_thors_fury, activate_athenas_insight
from app import db
from ..models import PowerUp, User, user_powerup

bp = Blueprint('profile', __name__)

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()

    if not current_user:
        return jsonify({'message': 'User not found'}), 404

    # use .join to get quantity fromm association table
    powerups_data = db.session.query(PowerUp, user_powerup.c.quantity).join(
        user_powerup,
        PowerUp.id == user_powerup.c.powerup_id
    ).filter(
        user_powerup.c.user_id == current_user_id
    ).all()

    powerups_data = [{
        "name": powerup.name,
        "description": powerup.description,
        "quantity": quantity
    } for powerup, quantity in powerups_data]

    return jsonify({
        'username': current_user.username,
        'games_played': current_user.games_played,
        'highest_score': current_user.highest_score,
        'total_score': current_user.total_score,
        'powerups': powerups_data
    }), 200


@bp.route('/profile/powerups', methods=['GET'])
@jwt_required()
def user_powerups():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    powerups_data = db.session.query(PowerUp, user_powerup.c.quantity).join(
        user_powerup, 
        PowerUp.id == user_powerup.c.powerup_id
    ).filter(
        user_powerup.c.user_id == current_user_id
    ).all()

    powerups_data = [{
        "name": powerup.name,
        "description": powerup.description,
        "quantity": quantity
    } for powerup, quantity in powerups_data]

    return jsonify({
        "username": user.username,
        "powerups": powerups_data
    }), 200


@bp.route('/powerups/activate', methods=['POST'])
@jwt_required()
def activate_powerup():
    data = request.get_json()
    powerup_name = data.get('powerup_name')

    if not powerup_name:
        return jsonify({"msg": "Power-up name is required"}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404

    powerup = PowerUp.query.filter_by(name=powerup_name).first()
    
    if not powerup:
        return jsonify({"msg": "Power-up not found"}), 404

    # association table query for user powerups
    user_powerup_entry = db.session.query(user_powerup).filter_by(user_id=user_id, powerup_id=powerup.id).first()
    
    if not user_powerup_entry:
        return jsonify({"msg": "Power-up not assigned to user"}), 404

    if user_powerup_entry.is_used:
        return jsonify({"msg": "Power-up already used"}), 400

    # hard coded by name for now, not ideal
    if powerup_name == 'ThorsFury':
        activate_thors_fury(user_id)
    elif powerup_name == 'AthenasInsight':
        activate_athenas_insight(user_id)
    else:
        return jsonify({"msg": "Invalid power-up name"}), 400

    # update and mark powerup as used and update quantity -1 after use
    new_quantity = user_powerup_entry.quantity - 1
    db.session.execute(
        user_powerup.update().where(
            user_powerup.c.user_id == user_id,
            user_powerup.c.powerup_id == powerup.id
        ).values(is_used=True, quantity=new_quantity)
    )

    db.session.commit()

    return jsonify({'message': 'Power-up activated'}), 200
