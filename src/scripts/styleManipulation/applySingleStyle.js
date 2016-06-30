$.animateJs.styleManipulation.applySingleStyle = function ($element, styleJson, additionalDelay) {
    var styleName = styleJson.style;
    $element.addClass(styleName + ' animated');

    $element.css({
        "animation-delay": (parseInt(styleJson.delay)+parseInt(additionalDelay)).toString(),
        "animation-duration": styleJson.duration.toString(),
        "animation-iteration-count":styleJson.iteration.toString()
});
};