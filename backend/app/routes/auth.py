from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from ..models import User
from app import db, jwt

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password) 

    db.session.add(new_user)
    db.session.commit()

    # proper access token
    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "msg": "User registered successfully",
        "user": {"id": new_user.id, "username": new_user.username},
        "access_token": access_token
    }), 201

# better input validation for username/password maybe?
# def register():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     if not username or not password:
#         return jsonify({"msg": "Missing username or password"}), 400

#     if len(username) < 3 or len(username) > 20:
#         return jsonify({"msg": "Username must be between 3 and 20 characters"}), 400

#     if len(password) < 8:
#         return jsonify({"msg": "Password must be at least 8 characters long"}), 400

#     if User.query.filter_by(username=username).first():
#         return jsonify({"msg": "Username already exists"}), 400

#     new_user = User(username=username)
#     new_user.set_password(password)

#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"msg": "User registered successfully"}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid username or password"}), 401

@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    return jsonify({"msg": "Successfully logged out"}), 200

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

@bp.route('/update_stats', methods=['POST'])
@jwt_required()
def update_stats():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    # print(f"User found: {user}")

    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    print(f"Received data: {data}")

    try:
        # update stats after a game
        if 'score' in data:
            user.games_played += 1
            user.total_score += data['score']
            if data['score'] > user.highest_score:
                user.highest_score = data['score']

        db.session.commit()
        print("Database changes committed")

        updated_user = User.query.get(user.id)
        print(f"Updated user stats: games_played={updated_user.games_played}, total_score={updated_user.total_score}, highest_score={updated_user.highest_score}")

        return jsonify({"msg": "Stats updated successfully"}), 200
    except Exception as e:
        print(f"Error updating stats: {str(e)}")
        db.session.rollback()
        return jsonify({"msg": "Error updating stats"}), 500

# error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"msg": "Token has expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"msg": "Invalid token"}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"msg": "Missing authorization token"}), 401