$.animateJs.styleManipulation.applySingleStyle = function ($element, styleJson) {
    var styleName = styleJson.style;
    $element.addClass(styleName + ' animated');

//    $element.css({
//        "animation-delay": styleJson.delay.toString(),
//        "animation-duration": styleJson.duration.toString(),
//        "animation-iteration-count":styleJson.iteration.toString()
//});
};