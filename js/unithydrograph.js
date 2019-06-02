
function calcUH(area, lenMainRiver, lenAllRiver, elevStation, elevPeak, deltaT){
    var deltaH, avgSlope, densRiver, fctrHyro;
    var k1, k2, beta;
    var h = [];
    var sumh = 0;

    deltaH = elevPeak - elevStation;
    avgSlope = deltaH/(lenMainRiver*1000);
    densRiver = lenAllRiver/area;
    fctrHyro = lenMainRiver/Math.sqrt(avgSlope);

    k1 = deltaT/(4.38 - 2.25*densRiver);
    k2 = deltaT/(0.0168*fctrHyro + 2.5);
    beta = 0.323*Math.exp(-0.00765*fctrHyro);

    var i = 1

    while(sumh<0.99){
        h.push(1-sumh-(beta*Math.exp(-k1*i)*(k1*i+1) + (1-beta)*Math.exp(-k2*i)*(k2*i+1)));
        sumh += h[i-1];
        i++
    }

    return h;
}