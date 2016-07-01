
$.animateJs.styleManipulation.applySimultaneousStyle = function (singleSimultaneousAction, $element, additionalDelay, isRemove) {
    var nowStyle = singleSimultaneousAction[0];
    var endOfMultipleStyle;
    var $newEle;
    this.applySingleStyle($element, singleSimultaneousAction[0], additionalDelay);
    if (!isRemove && nowStyle.remove === true) {
        isRemove = true;
    }
    singleSimultaneousAction.shift();//pop the first element of the array
    //if (!singleSimultaneousAction.length && additionalDelay)
    //    endOfMultipleStyle = true;
    //else {
    //    endOfMultipleStyle = false;
    //}
    //if (endOfMultipleStyle)
    //    this.wrapper($element, "multiple-animation=wrapper");

    if (singleSimultaneousAction.length) { //more style to apply
        //wrap the element with span
        //$newEle = $element.wrap("<span class='wrapping'></span>").parent();
        $newEle = this.wrapper($element, "element-animation-wrapper").parent();
        this.applySimultaneousStyle(singleSimultaneousAction, $newEle, isRemove);
    } else if (isRemove) {//no more style to apply and element needs to be removed.
        //
    }

}

$.animateJs.styleManipulation.wrapper = function ($element, className, idName) {
    if (idName === undefined)
        return $element.wrap("<span class='animation-js-" + className + "'></span>");
        //return $element;
    else {
        $element.wrap("<span class='" + className + "'" + "id='" + idName + "'></span>");
    }
    return $element;
}