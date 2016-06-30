$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    var delayTillNow = 0;
    var nowDelay;
    //console.log("hello from processAction " + actionList.length);
    for (var i = 0; i < actionList.length; i++) {
        nowDelay = this.totalDuration(actionList[i]);
        if (actionList[i][0].selection !== null) {
            //console.log("yes selection :(" + actionList[i]);

            $element = $element.find(actionList[i][0].selection);
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
                for (var j = 0; j < $element.length; j++) {
                    applySimultaneousStyle(actionList[i], $element[i], delayTillNow, false);
                }
            }

        } else {
            //console.log(actionList[i]);
            //console.log(this.totalDuration(actionList[i]));

            this.applySimultaneousStyle(actionList[i], $element, delayTillNow, false);
        }

        delayTillNow += nowDelay;
    }
}

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

$.animateJs.styleManipulation.trimSecond = function(text) {
    var number = parseInt(text, 10);
    return number;
}
