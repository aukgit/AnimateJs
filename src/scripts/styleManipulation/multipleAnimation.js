$.animateJs.styleManipulation.multipleAnimation = function (actionList) {
    //if (actionList.length > 1 || actionList[0].length > 1)
    //    return true;
    var styleOnMain = 0;
    for (var i = 0; i < actionList.length; i++) {
        if (actionList[i][0].selection === null) {
            styleOnMain++;
        }
        if (styleOnMain >= 2) {
            return true;
        }
    }
    return false;
}