from flask import jsonify
from app.models import User, db

def activate_thors_fury(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    if 'ThorsFury' not in user.active_power_ups:
        user.active_power_ups.append('ThorsFury')
        db.session.commit()
        return jsonify({"message": "Thor's Fury activated"}), 200
    
    return jsonify({"message": "Thor's Fury already active"}), 400

def activate_athenas_insight(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    if 'AthenasInsight' not in user.active_power_ups:
        user.active_power_ups.append('AthenasInsight')
        db.session.commit()
        return jsonify({"message": "Athena's Insight activated"}), 200
    
    return jsonify({"message": "Athena's Insight already active"}), 400

