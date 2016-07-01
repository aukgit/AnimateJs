$.animateJs.styleManipulation.wrapper = function ($element, className, idName) {
    if (idName === undefined)
        return $element.wrap("<span class='animation-js-" + className + "'></span>");
        //return $element;
    else {
        $element.wrap("<span class='" + className + "'" + "id='" + idName + "'></span>");
    }
    return $element;
}