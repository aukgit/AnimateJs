$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    for (var i = 0; i < actionList.length; i++) {
        if (actionList[i][0].selection !== null) {
            $element = $element.find(actionList[i][0].selection);
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
            } 
            
        } else {
            this.applySimultaneousStyle(actionList[i], $element, false);
        }
    }
}