# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify

user = {
    "id": "",
    "username": ""
}
 
# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route('/user')
def get_user():
 
    # Returning an api for showing in  reactjs
    return {
        "id": user["id"],
        "username": user["username"]
        }

@app.route('/login_user', methods=['POST'])
def login_user():
    response = jsonify({'some': 'data'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    user_data = request.get_json()
    user["username"] = user_data["username"]
    return response

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)