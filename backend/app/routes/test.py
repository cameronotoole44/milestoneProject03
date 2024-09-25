from flask import Blueprint, jsonify

bp = Blueprint('test', __name__)

@bp.route('/', methods=['GET'])
def test_route():
    return jsonify({"message": "Backend is working!"}), 200