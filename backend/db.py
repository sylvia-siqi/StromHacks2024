import sqlite3
from flask import current_app, g

connection = sqlite3.connect('backend/database.db')

with open('backend/schema.sql') as f:
    connection.executescript(f.read())

cursor = connection.cursor()

cursor.execute("INSERT INTO Goal (goal_id, user_id, goal_text, category) VALUES (?, ?, ?, ?)",
            ('33', 'Test', "10k steps a day", "Steps"))

connection.commit()
connection.close()


# cursor.execute("INSERT INTO Goal (goal_text, category) VALUES (?,?).
            #    ")

# def get_db():
#     if 'db' not in g:
#         g.db = sqlite3.connect(
#             current_app.config['DATABASE'],
#             detect_types=sqlite3.PARSE_DECLTYPES
#         )
#         g.db.row_factory = sqlite3.Row

#     return g.db

# def close_db(e=None):
#     db = g.pop('db', None)

# def init_db():
#     db = get_db()

#     with current_app.open_resource('schema.sql') as f:
#         db.executescript(f.read().decode('utf8'))

# def teardown_appcontext(close_db):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()
