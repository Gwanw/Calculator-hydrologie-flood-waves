class Graph{
    constructor(nodeCount){
        this.nodeCount = nodeCount; //todo: remove
        this.adjacencyMatrix = [];
    }

    //add a node to the graph
    addNode(){
        this.nodeCount++;
        
        this.adjacencyMatrix.push(new Array(this.nodeCount));
        for(var i=0; i<this.nodeCount; ++i){
            this.adjacencyMatrix[this.nodeCount-1][i] = false
        }
    }

    //add a connection between 2 nodes
    addEdge(i, j){
        if(i<j) [i,j] = [j,i];
        this.adjacencyMatrix[i][j] = true;
    }

    //remove a connection
    removeEdge(i, j){
        if(i<j) [i,j] = [j,i];
        this.adjacencyMatrix[i][j] = false;
    }

    //draw the graph
    drawLines(){
        for(var i=0; i<this.adjacencyMatrix.length; i++){
            for(var j=0; j<=i; j++){
                if(this.adjacencyMatrix[i][j]===false) continue;
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