var container = document.getElementsByClassName("container");
var canvas = document.createElement("canvas");
var graph = new GraphArea();

//document.body.style.backgroundImage = "url(Map.jpg)";

container[0].appendChild(canvas);
canvas.style.position = "fixed";

var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var nodeList = [];

var mouseCoords = { x: 0, y: 0 }
var activeNode; //activated node
var selectNode; //node at the position of the mouse
var dragNode; //node for dragging
var startTime; //time record for click time

canvas.oncontextmenu = function(e) {
    e.preventDefault();
}

document.addEventListener('mousemove', moveMouse);
document.addEventListener('mousedown', init);
document.addEventListener('mouseup', end);
document.addEventListener('keydown', initKeyFuntions);

function init(e) {
    trackMouseCanvas(e);

    switch (e.buttons) {
        case 1: //left click
            //add new node
            if (selectNode === undefined) {
                addPointCanvas();
                dragNode = graph.nodeList.length - 1;
            }
            //select node for dragging
            else {
                startTime = new Date();
                dragNode = selectNode;
            }
            break;
        case 2: //right click
            //reset active Node
            activeNode = undefined;
            break;
        case 3: //mouse wheel click
            break;
    }

    updateCanvas();
}

function moveMouse(e) {
    trackMouseCanvas(e);

    switch (e.buttons) {
        case 1: //left click
            //catch node for merging
            if (selectNode !== undefined) {
                mouseCoords.x = graph.nodeList[selectNode].x;
                mouseCoords.y = graph.nodeList[selectNode].y;
            }
            graph.updateNode(dragNode, mouseCoords.x, mouseCoords.y);
            break;
        default:
            break;
    }

    updateCanvas();
}

function end(e) {
    let time = new Date() - startTime;

    //if click duration is <200ms click with new active node
    if (time < 200) {
        if (activeNode !== undefined) {
            graph.addEdge(activeNode, selectNode);
        }
        activeNode = selectNode;
    }

    //check if drag node has same coords as other node and merges them
    for (i = 0; i < graph.nodeList.length; i++) {
        if (dragNode != i && graph.nodeList[dragNode].x == graph.nodeList[i].x && graph.nodeList[dragNode].y == graph.nodeList[i].y) {
            graph.mergeNode(i, dragNode);
            if (activeNode == i || activeNode == dragNode) { //todo: delete first statement
                activeNode = i;
            }
            return;
        }
    }

    updateCanvas();
}

function initKeyFuntions(e) {
    switch (e.keyCode) {
        case 46: //delete Element
            if (activeNode !== undefined) {
                graph.removeNode(activeNode);
                activeNode = undefined;
            }
        default:
            break;
    }
    updateCanvas();
}

function updateCanvas() {
    drawElements();
    //todo:
    //calculate area for graphArea
    //calculate river length for graphRiver
    graph.findCycle();
}

function addPointCanvas() {
    graph.addNode(mouseCoords.x, mouseCoords.y);

    if (activeNode !== undefined) {
        graph.addEdge(activeNode, graph.nodeList.length - 1);
    }

    activeNode = graph.nodeList.length - 1;
}

function drawElements() {
    //reset canvas
    ctx.canvas.width = ctx.canvas.width;

    graph.drawNodes();
    graph.drawLines();
    //for(node in [selectNode, activeNode]) drawMarkedNode(node);
    drawMarkedNode(selectNode);
    drawMarkedNode(activeNode);
}

function drawMarkedNode(node) {
    if (node !== undefined) {
        graph.drawNode(node, 6);
        graph.drawNode(node, 4, "#DDDDDD");
    }
}

function trackMouseCanvas(e) {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchElement(mouseCoords.x, mouseCoords.y, 5, graph.nodeList);
}