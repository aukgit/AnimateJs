$.animateJs.styleManipulation.multipleAnimation = function (actionList) {
    if (actionList.length > 1 || actionList[0].length > 1)
        return true;
    return false;
}