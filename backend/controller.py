from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

goals = {}

class Goal(Resource):
    def get(self, goal_id):
        return {goal_id: goals[goal_id]}
    def put(self, goal_id):
        goals[goal_id] = request.form['data']
        return {goal_id: goals[goal_id]}

         
api.add_resource(Goal, '/<string:goal_id>')


if __name__ == '__main__':
    app.run(debug=False)
