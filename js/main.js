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

var mouseCoords = {x: 0, y: 0}
var activeNode;
var selectNode;
var dragNode;
var startTime;

canvas.oncontextmenu = function(e){
    e.preventDefault();
}

document.addEventListener('mousemove', update);
document.addEventListener('mousedown', init);
document.addEventListener('mouseup', end);
document.addEventListener('keydown', initKeyFuntions);

function init(e){
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchNode(mouseCoords.x, mouseCoords.y, 5);

    switch(e.buttons){
        case 1:         //left click
            //if theres 
            if(selectNode === undefined){
                addPointEvent(mouseCoords.x, mouseCoords.y);
                dragNode = nodeList.length-1;
            }else{
                startTime = new Date();
                dragNode = selectNode;
            }
            break;
        case 2:         //right click
            drawElements();
            activeNode = undefined;
            return;
        case 3:         //mouse wheel click
            break;
    }

    setPosition();
}

function update(e) {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchNode(mouseCoords.x, mouseCoords.y, 5);

    switch(e.buttons){
        case 1:         //left click
            if(selectNode !== undefined){
                mouseCoords.x = nodeList[selectNode].x;
                mouseCoords.y = nodeList[selectNode].y;
            }
            nodeList[dragNode].update(mouseCoords.x, mouseCoords.y);
            break;
        default:
            drawNodeMarked(selectNode);
            break;
    }
    setPosition();
}

function end(e) {
    var time = new Date()-startTime;

    if(time<200){
        if(activeNode !== undefined){
            graph.addEdge(activeNode, selectNode);
        }
        activeNode = selectNode;
    }
    if(dragNode != selectNode){
        graph.mergeNode(selectNode, dragNode);
        nodeList.splice([dragNode], 1);
    }   
    setPosition();
}

function initKeyFuntions(e) {
    switch(e.keyCode){
        case 46:
            if(activeNode !== undefined){
                nodeList.splice([activeNode], 1);
                graph.removeNode(activeNode);
                activeNode = undefined;
                drawElements();
            }
        default:
            break;
    }
}

function setPosition() {
    drawElements();
    drawNodeMarked(activeNode);
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
    }
}

function drawElements(){
    ctx.canvas.width = ctx.canvas.width;
    ctx.fillStyle = "#000000";
    for(let node of nodeList) node.draw(4);
    graph.drawLines();
    drawNodeMarked(selectNode);
}

function drawNodeMarked(node){
    if(node !== undefined){
        ctx.fillStyle = "#000000";
        nodeList[node].draw(6);
        ctx.fillStyle = "#DDDDDD";
        nodeList[node].draw(4);
    }
}
