import sqlite3 
from contextlib import closing
from flask import (
    Flask,
)


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    
    with closing(sqlite3.connect(app.config['DB_PATH'])) as db:
        with closing(db.cursor()) as c:
            try:
                c.execute('CREATE TABLE messages (timestamp INTEGER, user_id TEXT, user_name TEXT, message TEXT)')
            except:
                pass

    return app


app = create_app()