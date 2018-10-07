import sqlite3 
from contextlib import closing
from flask import (
    Flask,
    request,
    jsonify,
)

from main import app


@app.route('/messages', methods=['GET'])
def get_messages():
    result = []

    with closing(sqlite3.connect(app.config['DB_PATH'])) as db:
        with closing(db.cursor()) as c:
            c.execute('SELECT timestamp, user_id, user_name, message FROM messages ORDER BY timestamp')

            row = c.fetchone()
            while row:
                result.append({
                    "timestamp": row[0],
                    "user_id": row[1],
                    "user_name": row[2],
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
                (message["timestamp"], message["user_id"], message["user_name"], message["text"]),
            )
        db.commit()
    
    return ""