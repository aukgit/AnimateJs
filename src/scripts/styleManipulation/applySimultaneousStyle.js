$.animateJs.styleManipulation.applySimultaneousStyle = function (singleSimultaneousAction, $element, isRemove) {
    var nowStyle = singleSimultaneousAction[0];
    this.applySingleStyle($element, singleSimultaneousAction[0]);
    if (nowStyle.remove === true) {
        isRemove = true;
    }
    singleSimultaneousAction.pop();
    if (singleSimultaneousAction.length) { //more style to apply
        //wrap the element with span
        //$newEle=wrapper span
        //this.applySimultaneousStyle(singleSimultaneousAction, $newEle, isRemove)
    } else if(isRemove) {//no more style to apply and element needs to be removed.
        //
    }
}