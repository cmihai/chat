import sqlite3 
from contextlib import closing
from flask import (
    Flask,
    request,
    make_response,
    jsonify,
)

from .main import app


@app.route('/register/<user_id>', methods=['POST'])
def register(user_id):
    r = make_response()
    r.set_cookie('userId', user_id)
    return r


@app.route('/messages', methods=['GET'])
def get_messages():
    result = []
    user_id = request.cookies.get('userId')

    with closing(sqlite3.connect(app.config['DB_PATH'])) as db:
        with closing(db.cursor()) as c:
            c.execute('SELECT timestamp, user_id, user_name, message FROM messages ORDER BY timestamp')
            row = c.fetchone()
            while row:
                result.append({
                    "timestamp": row[0],
                    "userId": row[1] if row[1] == user_id else None,
                    "userName": row[2],
                    "text": row[3],
                })
                row = c.fetchone()
    
    return jsonify(result)


@app.route('/messages', methods=['PUT'])
def add_message():
    message = request.json

    with closing(sqlite3.connect(app.config['DB_PATH'])) as db:
        with closing(db.cursor()) as c:
            c.execute(
                "INSERT INTO messages (timestamp, user_id, user_name, message) VALUES (?, ?, ?, ?)",
                (message["timestamp"], message["userId"], message["userName"], message["text"]),
            )
        db.commit()
    
    return ""
