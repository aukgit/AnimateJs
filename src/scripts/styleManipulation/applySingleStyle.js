$.animateJs.styleManipulation.applySingleStyle = function ($element, styleJson) {
    $element.css({
        "animation-delay": styleJson.delay.toString(),
        "animation-duration": styleJson.duration.toString(),
        "animation-iteration-count":styleJson.iteration.toString()
});
};