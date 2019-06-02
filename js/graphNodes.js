class Node{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    //update the position of a node
    update(x, y){
        this.x = x;
        this.y = y;
    }

    //draw a node
    draw(size){
        ctx.fillRect(this.x-size/2, this.y-size/2, size, size);
    }
}