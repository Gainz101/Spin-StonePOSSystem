# __main__.py - entry point for backend
#
# How to install flask:
#   pip3 install flask
#
# How to run this:
#   cd Project3_Zeta/backend
#   python3 -m flask --app main run -p 5001

from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


# // const baseItems = [{item: 'Cheese Pizza', id: 1}, 
# //                     {item:'1 Topping Pizza', id: 2}, 
# //                     {item:'2-4 Topping Pizza', id: 3},
# //                     {item:'Drink', id: 4}
# //                   ];
@app.route("/baseItems")
def get_baseitems():
    baseItems = [
        {'item_display_name': 'Cheeze Pizza', 'itemtype_id': 1},
        {'item_display_name': '1 Topping Pizza', 'itemtype_id': 2},
        {'item_display_name': '2-4 Topping Pizza', 'itemtype_id': 3},
        {'item_display_name': 'Drink', 'itemtype_id': 4},
    ]
    response = jsonify(baseItems)

    response.status_code = 200
    response.headers.add('Access-Control-Allow-Origin', '*')

    response.headers['Content-Type'] = 'application/json'
    return response

