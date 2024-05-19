from flask import Flask, request, jsonify, json
from flask_restful import Api, Resource
import sqlite3

app = Flask(__name__)
api = Api(app)

def get_db_connection():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row
    return conn

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
        
         
api.add_resource(GetGoal, '/goals/<string:goal_id>')
api.add_resource(GoalList, '/goals')
api.add_resource(CreateGoal, '/create_goal')


if __name__ == '__main__':
    app.run(debug=False)
