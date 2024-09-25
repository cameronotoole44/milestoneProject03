import os
from flask import Flask, send_from_directory


application = Flask(__name__, static_folder='static')


@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(application.static_folder, path)):
        return send_from_directory(application.static_folder, path)
    else:
        return send_from_directory(application.static_folder, 'index.html')

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=int(os.getenv("PORT", 8080)))