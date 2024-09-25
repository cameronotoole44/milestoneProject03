import os
from flask import Flask, send_from_directory
from backend import create_app  # Import your create_app function

application = create_app()  # Initialize your Flask app

# Serve frontend files
@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    return send_from_directory('build', path) if path else send_from_directory('build', 'index.html')

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=int(os.getenv("PORT", 8080)))
