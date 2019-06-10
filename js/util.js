var clickTime;

function recordClickTime(){
    clickTime = new Date();
}


function catchNode(x, y, r){
    for(var i=0; i<nodeList.length; i++){
        distance = Math.max(Math.abs(nodeList[i].x-x), Math.abs(nodeList[i].y-y));
        if(distance<r && i!=dragNode){
            return i;
        }
    }
    return undefined;
}