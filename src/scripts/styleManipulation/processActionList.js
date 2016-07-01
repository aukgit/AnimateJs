$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    var delayTillNow = 0;
    var nowDelay;
    var isMultipleAnimation;
    isMultipleAnimation = this.multipleAnimation(actionList);
    if (isMultipleAnimation)
        this.wrapper($element, "mother-wrapper");
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


$.animateJs.styleManipulation.multipleAnimation = function (actionList) {
    if (actionList.length > 1 || actionList[0].length > 1)
        return true;
    return false;
}
