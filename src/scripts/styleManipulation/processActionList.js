$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    var delayTillNow = 0;
    var nowDelay;
    var multipleOnMain = this.multipleAnimation(actionList);
    var multipleOnChildren;
    var $children;
    var $child;
    //sd
    //console.log("hello from processAction " + actionList.length);
    for (var i = 0; i < actionList.length; i++) {
        nowDelay = this.totalDuration(actionList[i]);
        if (actionList[i][0].selection !== null) {
            //console.log("yes selection :(" + actionList[i]);
            if (actionList[i].length > 1) {
                multipleOnChildren = true;
            } else {
                multipleOnChildren = false;
            }
            $children = $element.find(actionList[i][0].selection);
            //if (multipleOnChildren)
            //    this.wrapper($element, "mother-wrapper");
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
                for (var j = 0; j < $children.length; j++) {
                    $child = $($children[i]);//children[i] is not a DOM object. that's why we're type casting it by doing $(children[i])
                    if (multipleOnChildren) {
                        this.wrapper($child, "mother-wrapper");
                    }
                    this.applySimultaneousStyle(actionList[i], $child, delayTillNow, false);
                }
            }

        } else {
            //console.log(actionList[i]);
            //console.log(this.totalDuration(actionList[i]));
            if (multipleOnMain)
                this.wrapper($element, "mother-wrapper");
            this.applySimultaneousStyle(actionList[i], $element, delayTillNow, false);
        }

        delayTillNow += nowDelay;
    }
}



