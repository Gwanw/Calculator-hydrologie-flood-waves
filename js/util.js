var clickTime;

function recordClickTime(){
    clickTime = 0;
    setInterval(function(){
        while(clickTime<1000){
            clickTime+=100;
        }
        return;
    }, 100);
}


function catchNode(x, y, r){
    for(var i=0; i<nodeList.length; i++){
        distance = Math.max(Math.abs(nodeList[i].x-x), Math.abs(nodeList[i].y-y));
        if(distance<r){
            return i;
        }
    }
    return undefined;
}