import flask
from flask.json import jsonify
import uuid
import warehouse
from warehouse import Robot, Warehouse, Box

games = {}

app = flask.Flask(__name__)

@app.route("/games", methods=["POST"])
def create():
    global games
    id = str(uuid.uuid4())
    games[id] = Warehouse()
    return "ok", 201, {'Location': f"/games/{id}"}

@app.route("/games/<id>", methods=["GET"])
def queryState(id):
    global model
    model = games[id]
    model.step()
    agents = model.schedule.agents

    arrayAgents = []
    #buscar todos los agentes del modelo y si son cajas o robots incluirlos en el arreglo de diccionarios a mandar al json
    for i in range(len(agents)):
        agent = model.schedule.agents[i]
        if agent.pos is not None:
            if type(agent) is warehouse.Robot:
                arrayAgents.append({"x": agent.pos[0], "y": agent.pos[1], "tipo" : "Robot", "foundBox" : agent.foundBox, "levelStack" : 0})
            elif type(agent) is warehouse.Box:
                arrayAgents.append({"x": agent.pos[0], "y": agent.pos[1], "tipo" : "Box", "foundBox" : agent.foundBox,  "levelStack" : agent.levelStack})
    return jsonify({"Items": arrayAgents})

app.run()