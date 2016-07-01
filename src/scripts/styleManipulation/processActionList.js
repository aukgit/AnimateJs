﻿$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
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



