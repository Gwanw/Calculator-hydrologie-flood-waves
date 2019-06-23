class Graph {
    constructor(nodeCount) {
        this.nodeList = [];
        this.nodeCount = 0;
        this.adjacencyMatrix = [];
    }

    //add a node to the graph
    addNode(x, y) {
        this.nodeCount++;
        this.nodeList.push(new Node(x, y));
        console.log(this.nodeList);

        this.adjacencyMatrix.push(new Array(this.nodeCount));
        for (var i = 0; i < this.nodeCount; ++i) {
            this.adjacencyMatrix[this.nodeCount - 1][i] = false
        }
    }

    //remove a node to the graph
    removeNode(n) {
        this.nodeCount--;
        this.nodeList.splice([n], 1);

        this.adjacencyMatrix.splice(n, 1);
        for (var i = n; i < this.nodeCount; ++i) {
            this.adjacencyMatrix[i].splice(n, 1);
        }
    }

    //merge 2 nodes into one
    mergeNode(n, m) {
        if (n == m) return;
        let nCol = n;
        let mCol = m;
        let nRow, mRow;
        nRow = mRow = 0;

        for (var i = 0; i < this.nodeCount; i++) {
            if (this.adjacencyMatrix[mCol][mRow]) {
                this.adjacencyMatrix[nCol][nRow] = true;
            }
            i > nCol - 1 ? nCol++ : nRow++;
            i > mCol - 1 ? mCol++ : mRow++;
        }

        this.adjacencyMatrix[n][n] = false;

        this.removeNode(m);
    }

    //update position of node
    updateNode(n, x, y) {
        this.nodeList[n].update(x, y);
    }

    //add a connection between 2 nodes
    addEdge(i, j) {
        if (i < j)[i, j] = [j, i];
        this.adjacencyMatrix[i][j] = true;
    }

    //remove a connection
    removeEdge(i, j) {
        if (i < j)[i, j] = [j, i];
        this.adjacencyMatrix[i][j] = false;
    }

    //find line intersection
    findIntersection() {
        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            for (var j = 0; j <= i; j++) {
                if (adjacencyMatrix[i][j]) {

                }
            }
        }
    }

    //find cycle in graph
    findCycle() {
        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            for (var j = 0; j <= i; j++) {

            }
        }
    }

    //draw the graph
    drawLines(color) {
        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            for (var j = 0; j <= i; j++) {
                if (this.adjacencyMatrix[i][j] === false) continue;
                this.drawLine(i, j, color);
            }
        }
    }

    //draw specific line of graph between 2 nodes
    drawLine(n, m, color) {
        if (color === undefined) { color = "#000000" };
        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        ctx.moveTo(this.nodeList[n].x, this.nodeList[n].y);
        ctx.lineTo(this.nodeList[m].x, this.nodeList[m].y);

        ctx.stroke();
    }

    //draw all nodes
    drawNodes(size, color) {
        for (let node of this.nodeList) node.draw(size, color);
    }

    //draw specific node
    drawNode(n, size, color) {
        console.log(n)
        this.nodeList[n].draw(size, color);
    }
}