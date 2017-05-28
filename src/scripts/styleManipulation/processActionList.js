$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// Process every action found in the list.
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element">Pass a DOM </param>

    var delayTillNow = 0,
        nowDelay,
        multipleOnMain = this.multipleAnimation(actionList),
        multipleOnChildren,
        $children,
        $child,
        wrapperName = "wrapper-start",
        selectorText;

    //console.log("hello from processAction " + actionList.length);

    for (var i = 0; i < actionList.length; i++) {
        selectorText = actionList[i][0].selection;

        nowDelay = this.totalDuration(actionList[i]);
        if (selectorText !== null) {
            //console.log("yes selection :(" + actionList[i]);
            if (actionList[i].length > 1) {
                multipleOnChildren = true;
            } else {
                multipleOnChildren = false;
            }

            $children = $(selectorText); // selector should search in whole document.\

            if ($children.length === 0) {
                if (this.throwException) {
                    throw new Error("\"" + selectorText + "\" cannot be found in the page.");
                }
            }

            //if (multipleOnChildren)
            //    this.wrapper($element, wrapperName);
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
                for (var j = 0; j < $children.length; j++) {
                    $child = $($children[i]);//children[i] is not a DOM object. that's why we're type casting it by doing $(children[i])
                    if (multipleOnChildren) {
                        this.wrapper($child, wrapperName);
                    }

                    this.applySimultaneousStyle(actionList[i], $child, delayTillNow, false);
                }
            }

        } else {
          
            if (multipleOnMain) {
                multipleOnMain = false;
                this.wrapper($element, wrapperName);
            } else {
                $element = this.wrapper($element, "element-animation-wrapper").parent();
            }

            $element=this.applySimultaneousStyle(actionList[i], $element, delayTillNow, false);
            console.log($element);
        }

        delayTillNow += nowDelay;
    }
}