function Grid(size) {
    this.size = size;  //[number of rows, number of columns]
    this.classContainer = document.getElementsByClassName("grid-container");
    this.classRow = document.getElementsByClassName("grid-row");
    this.classCell = document.getElementsByClassName("grid-cell");

}

//deletes all grid elements
Grid.prototype.clear = function () {
    while (this.classRow.length > 0) {
        this.classContainer[0].removeChild(this.classRow[0]);
    }

}

//create new grid using the defined size
Grid.prototype.create = function () {
    for (var i = 0; i < this.size[0]; i++) {
        var new_row = document.createElement("div");  //new row
        new_row.className = "grid-row";
        for (var j = 0; j < this.size[1]; j++) {
            var new_cell = document.createElement("div");  //new cell
            new_cell.className = "grid-cell";
            new_row.appendChild(new_cell);
        }
        this.classContainer[0].appendChild(new_row);  //adds row with cells to document
    }
}

