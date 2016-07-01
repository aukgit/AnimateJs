$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    var delayTillNow = 0;
    var nowDelay;
    var isMultipleAnimation = this.multipleAnimation(actionList);
    //sd
    //console.log("hello from processAction " + actionList.length);
    for (var i = 0; i < actionList.length; i++) {
        nowDelay = this.totalDuration(actionList[i]);
        if (actionList[i][0].selection !== null) {
            //console.log("yes selection :(" + actionList[i]);

            $element = $element.find(actionList[i][0].selection);
            if (isMultipleAnimation)
                this.wrapper($element, "mother-wrapper");
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
                for (var j = 0; j < $element.length; j++) {
                    this.applySimultaneousStyle(actionList[i], $($element[i]), delayTillNow, false);//$element[i] is not a DOM object. that's why we're type casting it by doing $($element)
                }
            }

        } else {
            //console.log(actionList[i]);
            //console.log(this.totalDuration(actionList[i]));
            if (isMultipleAnimation)
                this.wrapper($element, "mother-wrapper");
            this.applySimultaneousStyle(actionList[i], $element, delayTillNow, false);
        }

        delayTillNow += nowDelay;
    }
}



