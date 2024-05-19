from flask import Flask, request, jsonify, json
from flask_restful import Api, Resource
import sqlite3

app = Flask(__name__)
api = Api(app)

def get_db_connection():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row
    return conn

class GetUser(Resource):
    def get(self, user_id):
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
    def get(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM Goal WHERE user_id = ?", (user_id,))
        rows = cur.fetchall()
        conn.close()
        results = [tuple(row) for row in rows]
        print(f"{type(results)} of type {type(results[0])}")
        goalsJSON = json.dumps(results)

        return goalsJSON
    
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
        

api.add_resource(CreateUser, '/create_user')
api.add_resource(GetUser, '/user/<string:user_id>')
api.add_resource(GetGoal, '/goals/<string:goal_id>')
api.add_resource(GoalList, '/goals')
api.add_resource(CreateGoal, '/create_goal')
api.add_resource(CompleteGoal, '/complete_goal')
api.add_resource(SetBreed, '/set_breed')


if __name__ == '__main__':
    app.run(debug=False)
