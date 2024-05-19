from flask import Flask, request, jsonify, json, make_response
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import sqlite3

app = Flask(__name__)
api = Api(app)
#CORS(app)
# cors = CORS(app, supports_credentials=True)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

class GetUser(Resource):
    def post(self, user_id):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM User WHERE user_id = ?", (user_id,))
        rows = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in rows]
        print(f"{type(results)} of type {type(results[0])}")
        userJSON = json.dumps(results)
        return userJSON
    
class CreateUser(Resource):
    def put(self):
        json = request.get_json(force=True)
        user_id = json['user_id']

        conn = get_db_connection()
        conn.execute('INSERT INTO User (user_id) VALUES (?)', (user_id,))
        conn.commit()
        conn.close()
        return jsonify(user_id=user_id)
    
class SetBreed(Resource):
    def put(self):
        json = request.get_json(force=True)
        user_id = json['user_id']
        cat_breed = json['cat_breed']

        conn = get_db_connection()
        conn.execute('UPDATE User SET cat_breed = ? WHERE user_id = ?', (cat_breed, user_id))
        conn.commit()
        conn.close()
        return jsonify(user_id=user_id, cat_breed=cat_breed)

class GoalList(Resource):
    def post(self):
        try:
            json_data = request.get_json(force=True)
            user_id = json_data['user_id']
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("SELECT * FROM Goal WHERE user_id = ?", (user_id,))
            rows = cur.fetchall()
            conn.close()
            results = [tuple(row) for row in rows]
            # print(f"{type(results)} of type {type(results[0])}")
            # goalsJSON = json.dumps(results)
            response = jsonify(results)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response;
        except Exception as e:
            print(e)
            response = jsonify(e)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    
class GetGoal(Resource):
    def get(self, goal_id):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Goal WHERE goal_id = ?", (goal_id,))
        rows = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in rows]
        print(f"{type(results)} of type {type(results[0])}")
        goalJSON = json.dumps(results)
        return goalJSON

class CreateGoal(Resource):
    def put(self):
        json = request.get_json(force=True)
        user_id = json['user_id']
        goal_text = json['goal_text']
        category = json['category']

        conn = get_db_connection()
        conn.execute('INSERT INTO Goal (user_id, goal_text, category) VALUES (?, ?, ?)',
        (user_id, goal_text, category))
        conn.commit()
        conn.close()
        return jsonify(user_id=user_id, goal_text=goal_text, category=category)
    
class CompleteGoal(Resource):
    def put(self):
        json = request.get_json(force=True)
        goal_id = json['goal_id']
        complete = json['complete']

        conn = get_db_connection()
        conn.execute('INSERT INTO GoalHistory (goal_id, complete) VALUES (?, ?)',
        (goal_id, complete))
        conn.commit()
        conn.close()
        return jsonify(goal_id=goal_id, complete=complete)
    
class GetMood(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''SELECT u.user_id, COUNT(h.complete) AS total_num,
                    SUM(CASE WHEN h.complete = 1 THEN 1 ELSE 0 END
                    ) AS num_complete
                    FROM User u INNER JOIN Goal g ON (u.user_id = g.user_id)
                    INNER JOIN GoalHistory h ON (g.goal_id = h.goal_id)
                    WHERE g.date_created > DATE('now', '-14 days');''')
        row = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in row] #(user_id, total_num, num_complete)
        print(results)
        percentage = results[0][2]/results[0][1] * 100
        
        return jsonify(percentage)
    
class GetSleep(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''SELECT u.user_id, COUNT(h.complete) AS total_num,
                    SUM(CASE WHEN h.complete = 1 THEN 1 ELSE 0 END
                    ) AS num_complete
                    FROM User u INNER JOIN Goal g ON (u.user_id = g.user_id)
                    INNER JOIN GoalHistory h ON (g.goal_id = h.goal_id)
                    WHERE g.category = 'Sleep' AND g.date_created > DATE('now', '-14 days');''')
        row = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in row] #(user_id, total_num, num_complete)
        print(results)
        percentage = results[0][2]/results[0][1] * 100
        
        return jsonify(percentage)
        
class GetActiveTime(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''SELECT u.user_id, COUNT(h.complete) AS total_num,
                    SUM(CASE WHEN h.complete = 1 THEN 1 ELSE 0 END
                    ) AS num_complete
                    FROM User u INNER JOIN Goal g ON (u.user_id = g.user_id)
                    INNER JOIN GoalHistory h ON (g.goal_id = h.goal_id)
                    WHERE g.category = 'Active Time' AND g.date_created > DATE('now', '-14 days');''')
        row = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in row] #(user_id, total_num, num_complete)
        print(results)
        percentage = results[0][2]/results[0][1] * 100
        
        return jsonify(percentage)

class GetSteps(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''SELECT u.user_id, COUNT(h.complete) AS total_num,
                    SUM(CASE WHEN h.complete = 1 THEN 1 ELSE 0 END
                    ) AS num_complete
                    FROM User u INNER JOIN Goal g ON (u.user_id = g.user_id)
                    INNER JOIN GoalHistory h ON (g.goal_id = h.goal_id)
                    WHERE g.category = 'Steps' AND g.date_created > DATE('now', '-14 days');''')
        row = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in row] #(user_id, total_num, num_complete)
        print(results)
        percentage = results[0][2]/results[0][1] * 100
        
        return jsonify(percentage)

    
class User(Resource):
    def get(self):
        user = {
            "id": "",
           "username": ""
        }
        response = jsonify(user)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
        
class Login(Resource):
    def post(self):
        data = request.get_json(force=True)
        response = jsonify({'user_id': data["username"]})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response 
        

api.add_resource(Login, "/login_user")
api.add_resource(CreateUser, '/create_user')
api.add_resource(GetUser, '/user/<string:user_id>')
api.add_resource(GetGoal, '/goals/<string:goal_id>')
api.add_resource(GoalList, '/goals')
api.add_resource(CreateGoal, '/create_goal')
api.add_resource(CompleteGoal, '/complete_goal')
api.add_resource(SetBreed, '/set_breed')
api.add_resource(GetMood, '/mood')
api.add_resource(GetSleep, '/sleep')
api.add_resource(GetActiveTime, '/active_time')
api.add_resource(GetSteps, '/steps')

if __name__ == '__main__':
    app.run(debug=True)
