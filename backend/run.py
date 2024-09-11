from app import create_app

app = create_app() # creating the **instance** of the app

if __name__ == '__main__':
    app.run(debug=True) # runs the app with debug mode on