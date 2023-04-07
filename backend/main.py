# __main__.py - entry point for backend
#
# How to install flask:
#   pip3 install flask
#
# How to run this:
#   cd Project3_Zeta/backend
#   python3 -m flask --app main run

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
