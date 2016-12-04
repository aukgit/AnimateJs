$.animateJs.styleManipulation.totalDuration = function (simultaneousStyle) {
    var maxTime = 0, i, currentStyle,
        nowTime, delay, iteration, duration;

    for (i = 0; i < simultaneousStyle.length; i++) {
        currentStyle = simultaneousStyle[i];
        delay = this.trimSecond(currentStyle.delay);
        //console.log("delay= "+delay);
        iteration = currentStyle.iteration;
        //console.log(iteration);
        duration = this.trimSecond(currentStyle.duration);
        //console.log("duration= " + duration);
        nowTime = delay + duration * iteration;
        maxTime = Math.max(nowTime, maxTime);
    }
    return maxTime;
}