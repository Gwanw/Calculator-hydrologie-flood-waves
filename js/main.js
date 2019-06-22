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

var mouseCoords = { x: 0, y: 0 }
var activeNode; //activated node
var selectNode; //node at the position of the mouse
var dragNode; //node for dragging
var startTime; //time record for click time

canvas.oncontextmenu = function(e) {
    e.preventDefault();
}

document.addEventListener('mousemove', update);
document.addEventListener('mousedown', init);
document.addEventListener('mouseup', end);
document.addEventListener('keydown', initKeyFuntions);

function init(e) {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchNode(mouseCoords.x, mouseCoords.y, 5, nodeList);

    switch (e.buttons) {
        //left click
        case 1:
            //add new node
            if (selectNode === undefined) {
                addPointCanvas(mouseCoords.x, mouseCoords.y);
                dragNode = nodeList.length - 1;
            }
            //select node for dragging
            else {
                startTime = new Date();
                dragNode = selectNode;
            }
            break;
            //right click
        case 2:
            //reset active Node
            activeNode = undefined;
            break;
            //mouse wheel click
        case 3:
            break;
    }
    updateCanvas();
}

function update(e) {
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
    selectNode = catchNode(mouseCoords.x, mouseCoords.y, 5, nodeList);

    switch (e.buttons) {
        //left click
        case 1:
            if (selectNode !== undefined) {
                mouseCoords.x = nodeList[selectNode].x;
                mouseCoords.y = nodeList[selectNode].y;
            }
            nodeList[dragNode].update(mouseCoords.x, mouseCoords.y);
            break;
        default:
            drawMarkedNode(selectNode);
            break;
    }
    updateCanvas();
}

function end(e) {
    let time = new Date() - startTime;

    if (time < 200) {
        if (activeNode !== undefined) {
            graph.addEdge(activeNode, selectNode);
        }
        activeNode = selectNode;
    }
    for (i = 0; i < nodeList.length; i++) {
        if (dragNode != i && nodeList[dragNode].x == nodeList[i].x && nodeList[dragNode].y == nodeList[i].y) {
            graph.mergeNode(i, dragNode);
            nodeList.splice([dragNode], 1);
            if (activeNode == i || activeNode == dragNode) {
                activeNode = i;
            }
            return;
        }
    }
    updateCanvas();
}

function initKeyFuntions(e) {
    switch (e.keyCode) {
        //delete Element
        case 46:
            if (activeNode !== undefined) {
                deleteNodeCanvas(activeNode);
                activeNode = undefined;
            }
        default:
            break;
    }
}

function updateCanvas() {
    drawElements();
    drawMarkedNode(activeNode);
}

function deleteNodeCanvas(node) {
    nodeList.splice([node], 1);
    graph.removeNode(node);
    drawElements();
}

function addPointCanvas(x, y) {
    selectNode = catchNode(x, y, 5, nodeList);

    if (selectNode === undefined) {
        nodeList.push(new Node(x, y));
        graph.addNode();
        if (activeNode !== undefined) {
            graph.addEdge(activeNode, nodeList.length - 1);
        }
        activeNode = nodeList.length - 1;
    }
}

function drawElements() {
    ctx.canvas.width = ctx.canvas.width;
    ctx.fillStyle = "#000000";
    for (let node of nodeList) node.draw(4);
    graph.drawLines();
    drawMarkedNode(selectNode);
}

function drawMarkedNode(node) {
    if (node !== undefined) {
        ctx.fillStyle = "#000000";
        nodeList[node].draw(6);
        ctx.fillStyle = "#DDDDDD";
        nodeList[node].draw(4);
    }
}