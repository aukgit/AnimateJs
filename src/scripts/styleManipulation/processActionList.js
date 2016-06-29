$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    for (var i = 0; i < actionList.length; i++) {
        if (actionList[i][0].selection === null) {
            this.applySimultaneousStyle(actionList[i], $element, false);
        }


    }
}