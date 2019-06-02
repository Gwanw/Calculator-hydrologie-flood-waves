function Manager(gridSize){
    this.gridSize = gridSize;

    this.setup();
}

//reset all data
Manager.prototype.reset = function(){
    
}

//set up the application
Manager.prototype.setup = function(){
    this.grid = new Grid(this.gridSize);
    this.grid.clear();
    this.grid.create();
}