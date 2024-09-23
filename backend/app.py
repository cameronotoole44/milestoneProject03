from app import create_app

application = create_app() # creating the **instance** of the app

if __name__ == '__main__':
    # app.run(debug=True) # runs the app with debug mode on
    application.run(host='0.0.0.0', port=5000, debug=False)