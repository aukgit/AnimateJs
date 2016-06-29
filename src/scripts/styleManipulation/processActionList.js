$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    for (var i = 0; i < actionList.length; i++) {
        if (actionList[i][0].selection !== null) {
            console.log("yes selection :(" + actionList[i]);

            $element = $element.find(actionList[i][0].selection);
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
            } 
            
        } else {
            console.log("no selection :D" + actionList[i]);
            this.applySimultaneousStyle(actionList[i], $element, false);
        }
    }
}