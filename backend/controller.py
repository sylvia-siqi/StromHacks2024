from flask import Flask, request
from flask_restful import Api, Resource
import sqlite3

app = Flask(__name__)
api = Api(app)

def get_db_connection():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row
    return conn

goals = {}

class GoalList(Resource):
    def get(self):
        return goals

class Goal(Resource):
    def get(self, goal_id):
        return {goal_id: goals[goal_id]}
    def put(self, goal_id):
        goals[goal_id] = request.form['data']
        return {goal_id: goals[goal_id]}

         
api.add_resource(Goal, '/<string:goal_id>')
api.add_resource(GoalList, '/goals')


if __name__ == '__main__':
    app.run(debug=False)
