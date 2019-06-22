function catchNode(x, y, r, nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
        distance = Math.max(Math.abs(nodeList[i].x - x), Math.abs(nodeList[i].y - y));
        if (distance < r) {
            return i;
        }
    }
    return undefined;
}