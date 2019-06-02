//initialize application
//new Manager([40,40]);

var container = document.getElementsByClassName("container");
var canvas = document.createElement("canvas");
var graph = new Graph(0);

//document.body.style.backgroundImage = "url(Map.jpg)";

container[0].appendChild(canvas);
canvas.style.position = "fixed";

var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var nodeList = [];
var previousPoint;
var nodeNr;

var mouseCoords = {x: 0, y: 0}
var activeNode;
var selectNode;

canvas.oncontextmenu = function(e){
    e.preventDefault();
}

document.addEventListener('mousemove', update);
document.addEventListener('mousedown', init);
document.addEventListener('mouseup', end);

function init(e){
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;

    switch(e.buttons){
        case 1:
            addPointEvent(mouseCoords.x, mouseCoords.y);
            break;
        case 2:
            if(catchNode(mouseCoords.x, mouseCoords.y, 5) !== activeNode){
                drawElements();
            }
            activeNode = undefined;
            return;
        case 3:
            break;
    }

    setPosition();    
    //set new point
    //reposition exisiting point
    //activate existing point
    //connect to existing point
}

function update(e) {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchNode(mouseCoords.x, mouseCoords.y, 5);

    switch(e.buttons){
        case 1:
            if(selectNode !== undefined){
                mouseCoords.x = nodeList[selectNode].x;
                mouseCoords.y = nodeList[selectNode].y;
            }
            setPosition();
            break;
        default:
            drawElements();
            
            drawMarkedNode(activeNode);
            drawMarkedNode(selectNode);
    }   
}


function end(e) {
    if(e.which !== 1){
        return;
    }
    previousPoint = nodeList.length;
}

function setPosition() {
    nodeList[nodeList.length-1].update(mouseCoords.x, mouseCoords.y);
    drawElements();
    drawMarkedNode(activeNode);
  }

function addPointEvent(x, y){
    selectNode = catchNode(x, y, 5);

    if(selectNode === undefined){
        nodeList.push(new Node(x, y));
        graph.addNode();
        if(activeNode !== undefined){
            graph.addEdge(activeNode, nodeList.length - 1);
        }
        activeNode = nodeList.length - 1;
    }else{
        recordClickTime();
    }
}

function drawElements(){
    ctx.canvas.width = ctx.canvas.width;
    ctx.fillStyle = "#000000";
    for(let node of nodeList) node.draw(4);
    graph.drawLines();
}

function drawMarkedNode(node){
    if(node !== undefined){
        ctx.fillStyle = "#000000";
        nodeList[node].draw(6);
        ctx.fillStyle = "#DDDDDD";
        nodeList[node].draw(4);
    }
}