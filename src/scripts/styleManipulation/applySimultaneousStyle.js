
$.animateJs.styleManipulation.applySimultaneousStyle = function (singleSimultaneousAction, $element, additionalDelay, isRemove) {
    var nowStyle = singleSimultaneousAction[0];
    var $newEle;
    this.applySingleStyle($element, singleSimultaneousAction[0], additionalDelay);
    if (!isRemove && nowStyle.remove === true) {
        isRemove = true;
    }
    singleSimultaneousAction.shift();//pop the first element of the array

    if (singleSimultaneousAction.length) { //more style to apply
        //wrap the element with span
        $newEle = this.wrapper($element, "element-animation-wrapper").parent();
        return this.applySimultaneousStyle(singleSimultaneousAction, $newEle, isRemove);
    } else  {//no more style to apply and element needs to be removed.
        console.log("hi ");
        console.log($element);
        return $element;
    }
}

