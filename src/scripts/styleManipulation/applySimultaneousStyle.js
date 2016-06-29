﻿$.animateJs.styleManipulation.applySimultaneousStyle = function (singleSimultaneousAction, $element, isRemove) {
    var nowStyle = singleSimultaneousAction[0];
    var $newEle;
    this.applySingleStyle($element, singleSimultaneousAction[0]);
    if (!remove && nowStyle.remove === true) {
        isRemove = true;
    }
    singleSimultaneousAction.pop();
    if (singleSimultaneousAction.length) { //more style to apply
        //wrap the element with span
        $newEle = $element.wrap("<span></span>").parent();
        this.applySimultaneousStyle(singleSimultaneousAction, $newEle, isRemove);
    } else if(isRemove) {//no more style to apply and element needs to be removed.
        //
    }
}