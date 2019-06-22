class Graph {
    constructor(nodeCount) {
        this.nodeCount = nodeCount;
        this.adjacencyMatrix = [];
    }

    //add a node to the graph
    addNode() {
        this.nodeCount++;

        this.adjacencyMatrix.push(new Array(this.nodeCount));
        for (var i = 0; i < this.nodeCount; ++i) {
            this.adjacencyMatrix[this.nodeCount - 1][i] = false
        }
    }

    //remove a node to the graph
    removeNode(n) {
        this.nodeCount--;

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
            if (this.adjacencyMatrix[mCol][mRow] === true) {
                this.adjacencyMatrix[nCol][nRow] = true;
            }
            i > nCol - 1 ? nCol++ : nRow++;
            i > mCol - 1 ? mCol++ : mRow++;
        }

        this.adjacencyMatrix[n][n] = false;

        this.removeNode(m);
    }

    //add a connection between 2 nodes
    addEdge(i, j) {
        if (i < j) [i, j] = [j, i];
        this.adjacencyMatrix[i][j] = true;
    }

    //remove a connection
    removeEdge(i, j) {
        if (i < j) [i, j] = [j, i];
        this.adjacencyMatrix[i][j] = false;
    }

    //draw the graph
    drawLines() {
        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            for (var j = 0; j <= i; j++) {
                if (this.adjacencyMatrix[i][j] === false) continue;
                ctx.beginPath();

                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000000';

                ctx.moveTo(nodeList[i].x, nodeList[i].y);
                ctx.lineTo(nodeList[j].x, nodeList[j].y);

                ctx.stroke();
            }
        }
    }

}