from math import nan
from mesa import Agent, Model
from mesa.space import MultiGrid as GridMesa
from mesa.time import RandomActivation
from pathfinding.core.diagonal_movement import DiagonalMovement
from pathfinding.core.grid import Grid
from pathfinding.finder.a_star import AStarFinder
from mesa.visualization.modules import CanvasGrid
from mesa.visualization.ModularVisualization import ModularServer
import random

#Array for the platforms
boxDelivery = [(4, 5), (5, 5), (4, 4), (5, 4)]
#Array of the delivery zone
deliveryZone = [(3,5), (6,5), (3,4), (6,4),   (3, 3), (3, 6), (4, 3), (4, 6), (5, 3), (5, 6), (6, 3), (6,6)]

#Creation of the agent Cell
class Celda(Agent):
    def __init__(self, model, pos):
        super().__init__(model.next_id(), model)
        self.pos = pos

#Creation of the agent deliver (platforms where boxes will be stacked)
class Delivery(Agent):
    def __init__(self, model, pos, numberBoxes, count):
        super().__init__(model.next_id(), model)
        self.pos = pos
        self.numberBoxes = numberBoxes
        self.count = count

#Creating the agent box
class Box(Agent):
    def __init__(self, model, pos, foundBox, levelStack=0):
        super().__init__(model.next_id(), model)
        self.pos = pos
        self.foundBox = foundBox
        self.levelStack = levelStack


#Agent robot which will have the task of taking the boxes to the platforms
class Robot(Agent):
    def __init__(self, model, pos, foundBox):
        super().__init__(model.next_id(), model)
        self.pos = pos
        self.foundBox = foundBox
        self.pathToDelivery = []
    def step(self):
        #In case the robot has found a box but has no path yet for the delivery
        if self.foundBox == True and len(self.pathToDelivery)== 0:
            for i in range(0, 4):
                deliver = self.model.grid.get_cell_list_contents(boxDelivery[i])[0]
                if deliver.count < 5:
                    #It will find the best path from its position to the correspondent deliveryZone
                    self.pathToDelivery = findPath(self.pos, deliveryZone[i])
                    self.pathToDelivery.append(self.pathToDelivery[len(self.pathToDelivery)-1])
                    self.pathToDelivery.pop(0)
                    deliver.count += 1
                    break
        
        #In case the robot has found a box and has already a path to follow
        if self.foundBox == True and len(self.pathToDelivery) > 0 :
            foundRobot = False
            path = self.model.grid.get_cell_list_contents(self.pathToDelivery[0])
            for i in path:
                if type(i) is Robot:
                    foundRobot = True
            #In case the robot has finished the path, the box must be delivered in its correspondent plaform and set its method "foundBox" to false
            if len(self.pathToDelivery) == 1:
                self.pathToDelivery.pop(0)
                content = self.model.grid.get_cell_list_contents(self.pos)
                index = deliveryZone.index(self.pos)
                deliver = self.model.grid.get_cell_list_contents(boxDelivery[index])[0]
                deliver.numberBoxes += 1
                for i in content :
                    if type(i) is Box:
                        self.model.grid.move_agent(i, boxDelivery[index])
                        i.levelStack = deliver.numberBoxes
                        print(i.levelStack)
                        i.foundBox = False

                self.foundBox = False
                #We increase by 1 the number of released boxes
                self.model.cajasLiberadas += 1
            #In case the robot hasn't finihsed the path it must keep moving to the next coordinate
            elif (len(path) == 0) or foundRobot == True:
                self.model.movimientosRealizados += 1
                content = self.model.grid.get_cell_list_contents(self.pos)
                for i in content :
                    if type(i) is Box:
                        self.model.grid.move_agent(i, self.pathToDelivery[0])
                self.model.grid.move_agent(self, self.pathToDelivery[0])
                
                self.pathToDelivery.pop(0)
            
        #In case the robot has no box
        if self.foundBox == False :
            #We create our array of neighbours
            next_moves = self.model.grid.get_neighborhood(self.pos, moore=True)
            next_move = self.random.choice(next_moves)
            #If a box is the Robot's neighbour then the Robot picks it up and changes its status to "foundBox"
            for i in next_moves:
                next_casilla = self.model.grid.get_cell_list_contents(i)
                if (len(next_casilla)==1) and (type(next_casilla[0]) is Box) and i not in boxDelivery and next_casilla[0].foundBox == False:
                    next_move = i
                    self.foundBox = True
                    break
            #When founding the box, we move our robot to that position
            if self.foundBox == True :
                next_casilla[0].foundBox = True
                self.model.grid.move_agent(self, next_move)
                self.model.movimientosRealizados += 1
            #If no box was found nearby it will move randomly to another neighbour
            else:
                #The robot must insure the cell is free
                while(self.model.matrix[next_move[1]][next_move[0]]!= 1) :
                    next_moves = self.model.grid.get_neighborhood(self.pos, moore=True)
                    next_move = self.random.choice(next_moves)
                self.model.movimientosRealizados += 1
                self.model.grid.move_agent(self, next_move)



#Creating the model of our Warehouse
class Warehouse(Model):
    matrix = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,0,0,1,1,0,0],
        [0,0,1,1,0,0,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    def __init__(self, nBoxes= 15, maxTime=50):
        super().__init__()
        self.maxTime = maxTime
        self.nBoxes = nBoxes
        self.cajasLiberadas = 0
        self.movimientosRealizados = 0

    
        self.schedule = RandomActivation(self)
        self.grid = GridMesa(10, 10, torus=True)
        #We define the coordinates of our agents Robot
        origenes = [(1,1), (1, 8), (2, 4), (8, 1), (8, 8)] 

        #We place the cells, the platfrorms for delivery and the robots in the model
        for _,x,y in self.grid.coord_iter():
            if (x,y) in boxDelivery:
                cell = Delivery(self, (x, y), 0, 0)
                self.grid.place_agent(cell, cell.pos)
            elif Warehouse.matrix[y][x] == 0:
                cell = Celda(self, (x, y))
                self.grid.place_agent(cell, cell.pos)
            elif (x,y) in origenes:
                robot = Robot(self, (x,y), 0)
                self.grid.place_agent(robot, robot.pos)
                self.schedule.add(robot)
        
        #We will then randomly place the boxes in the left cells
        for i in range(nBoxes):
            foundPosition= False
            while(foundPosition == False):
                x = random.randint(1, 9)
                y= random.randint(1, 9)
                if len(self.grid.get_cell_list_contents((x,y))) == 0 and (x, y) not in deliveryZone:
                    box= Box(self, (x,y), False, 0)
                    self.grid.place_agent(box, box.pos)
                    self.schedule.add(box)
                    foundPosition = True


    def step(self):
        #In case the robots finished before time is up
        if(self.cajasLiberadas == self.nBoxes):
            print("El tiempo necesario para apilar las cajas fue de " + str(self.schedule.steps) + " steps")
            print("Los movimientos realizados por los robots fueron en total " + str(self.movimientosRealizados))
            self.running = False
        #In case time is up eralier
        if(self.schedule.steps == self.maxTime - 2 ):
            print("Faltaron un total de " + str(self.nBoxes-self.cajasLiberadas) + " caja(s) de ser apiladas")
            print("Los movimientos realizados por los robots fueron en total " + str(self.movimientosRealizados))
            self.running = False
        self.schedule.step()

#Function that given 2 points, determines the best path
def findPath(inicio, fin):
    gridPathFinder=Grid(matrix=Warehouse.matrix)
    #Defining the start and end point
    start = gridPathFinder.node(inicio[0], inicio[1])
    end = gridPathFinder.node(fin[0], fin[1])
    finder = AStarFinder(diagonal_movement=DiagonalMovement.never)
    #We store the path in an array
    path, runs = finder.find_path(start, end, gridPathFinder)
    return path

#We set the visual shape of each agent
def agent_portrayal(agent):
    if (type(agent) is Celda):
        return {"Shape": "rect", "w": 1, "h": 1, "Filled": "true", "Color": "Gray", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 0):
        return {"Shape": "platform.svg", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 1):
        return {"Shape": "platform1.svg", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 2):
        return {"Shape": "platform2.svg", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 3):
        return {"Shape": "platform3.svg", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 4):
        return {"Shape": "platform4.svg", "Layer": 0}
    elif (type(agent) is Delivery and agent.numberBoxes == 5):
        return {"Shape": "platform5.svg", "Layer": 0}
    elif (type(agent) is Robot and agent.foundBox == False):
        return {"Shape": "robot.png", "Layer": 1}
    elif (type(agent) is Robot and agent.foundBox == True):
        return {"Shape": "robotBox.png", "Layer": 1}
    elif (type(agent) is Box and agent.foundBox== False):
        return {"Shape": "box.svg", "Layer": 0}
        
     
# grid = CanvasGrid(agent_portrayal, 10, 10, 600, 600)


# server = ModularServer(Warehouse, [grid], "Actividad integradora", {})
# server.port = 5000
# server.launch()