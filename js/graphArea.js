class GraphArea extends Graph {
    constructor() {
        super();
        this.calculationCheck = false;
        this.nodesOfCycle = [];
    }

    //find cycle in graph
    findCycle() {
        let nRow = nCol = 0;
        //new and more efficient idea: every node must have 2 connections for the area graph, so one or more cycles are guaranteed
        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            let nodeCount = 0;
            for (var j = 0; j < this.adjacencyMatrix.length; j++) {
                j > nCol - 1 ? nCol++ : nRow++;
                nodeCount += this.adjacencyMatrix[nCol][nRow + i]
                    //todo: add array with nodes of cycles, replace nodeCount with Array length
            }

            if (nodeCount !== 2) return;
        }

        //area calculable
        this.calculationCheck = true;
    }

    sumArea() {
        //todo: area of cycles

        //check if area is calculable
        if (!this.calculationCheck) return;
        this.createArrayOfCycle(0);


    }

    //find cycle in graph
    createArrayOfCycle(n) {
        let nRow = nCol = 0;

        if (!this.nodesOfCycle.indexOf(n)) return;
        this.nodesOfCycle.push(n)

        for (var i = 0; i < this.adjacencyMatrix.length; i++) {
            i > nCol - 1 ? nCol++ : nRow++;

            if (this.adjacencyMatrix[nCol][nRow + 3]) {
                this.createArrayOfCycle(nCol + nRow);
                return;
            }

        }
    }
}