$.animateJs.styleManipulation.totalDuration = function (simultaneousStyle) {
    var totalTime = 0;
    var i;
    var currentStyle;
    var nowTime;
    var delay;
    var iteration;
    var duration;
    for (i = 0; i < simultaneousStyle.length; i++) {
        currentStyle = simultaneousStyle[i];
        delay = this.trimSecond(currentStyle.delay);
        //console.log("delay= "+delay);
        iteration = currentStyle.iteration;
        //console.log(iteration);
        duration = this.trimSecond(currentStyle.duration);
        //console.log("duration= " + duration);
        nowTime = delay + duration * iteration;
        totalTime += nowTime;
    }
    return totalTime;
}