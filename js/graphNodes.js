class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //update the position of a node
    update(x, y) {
        this.x = x;
        this.y = y;
    }

    //draw a node
    draw(size, color) {
        if (size === undefined) { size = 4 };
        if (color === undefined) { color = "#000000" };
        ctx.fillStyle = color;
        ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    }
}