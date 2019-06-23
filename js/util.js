function catchElement(x, y, r, list) {
    for (var i = 0; i < list.length; i++) {
        distance = Math.max(Math.abs(list[i].x - x), Math.abs(list[i].y - y));
        if (distance < r) {
            return i;
        }
    }
    return undefined;
}