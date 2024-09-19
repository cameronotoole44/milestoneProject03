from flask import jsonify
from app.power.ThorsFury import ThorsFury
from app.power.AthenasInsight import AthenasInsight
from app.models import User, db

def activate_thors_fury(user_id):
    user = User.query.get(user_id)
    if user:
        
        if 'Thor\'s Fury' not in user.active_power_ups:
            user.active_power_ups.append('Thor\'s Fury')
            db.session.commit()
        return jsonify({"message": "Thor's Fury activated"}), 200
    else:
        return jsonify({"msg": "User not found"}), 404

def activate_athenas_insight(user_id):
    user = User.query.get(user_id)
    if user:
        
        if 'Athena\'s Insight' not in user.active_power_ups:
            user.active_power_ups.append('Athena\'s Insight')
            db.session.commit()
        return jsonify({"message": "Athena's Insight activated"}), 200
    else:
        return jsonify({"msg": "User not found"}), 404
