$.animateJs.styleManipulation.applySingleStyle = function ($element, styleJson, additionalDelay) {
    var styleName = styleJson.style;
    var totalDelay = (parseInt(styleJson.delay) + parseInt(additionalDelay)).toString();
    console.log("time " + totalDelay);
    $element.addClass(styleName + ' animated');

    $element.css({
        "animation-delay": totalDelay,
        "animation-duration": styleJson.duration.toString(),
        "animation-iteration-count":styleJson.iteration.toString()
});
};