from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test_route():
    return jsonify({"message": "Backend is working!"}), 200

if __name__ == "__main__":
    app.run(debug=True)