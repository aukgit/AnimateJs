$.animateJs.extractStyles = function (workingAttr) {
    /// <summary>
    /// extracts specific style operations to perform and returns the style summary in an array of json objects
    /// </summary>
    /// <param name="workingAttr" type="type"></param>
    /// <returns type="">array of json object with selection, delay, duration, iteration as value</returns>

    var $steps = this.extractActions(workingAttr);
    var $selectorStyle = false;
    var $gotOne = false;
    var $style = [];
    var $currentStyle = "";
    for (var i = 0; i < $steps.length; i++) {
        if ($steps[i].indexOf("" + this.options.selection + "(") > -1) {// a selector,start of a new style
            if ($gotOne) {
                $style.push($currentStyle);
            }
            $currentStyle = initiateCurrentStyle();
            $currentStyle.selection = "" + getParameterValue(this.options.selection, $steps[i]);
            $selectorStyle = true;
            $gotOne = true;

        }

        else if ($steps[i].indexOf("(") > -1) {//a normal function, will be concatenated with the current style
            $currentStyle = this._getParameterNameAndValue($steps[i], $currentStyle);
        }

        else if ($selectorStyle) {//a class after the selector, will be concatenated with the current style
            $currentStyle.style = $steps[i];
            $selectorStyle = false;
        } else {//A class without any preceding selector, start of a new style
            if ($gotOne) {
                $style.push($currentStyle);
            }
            $currentStyle = initiateCurrentStyle();
            $currentStyle.style = "" + $steps[i];
            $selectorStyle = false;
            $gotOne = true;
        }
    }
    if ($gotOne)
        $style.push($currentStyle);
    return $style;
};

$.animateJs._getParameterNameAndValue = function ($step, $currentStyle) {
    if ($step.indexOf(this.options.animation_delay) > -1) {
        $currentStyle.delay = getParameterValue(this.options.animation_delay, $step).toString();
        //$value = 
    }

    else if ($step.indexOf(this.options.animation_duration) > -1) {
        $currentStyle.duration = getParameterValue(this.options.animation_duration, $step).toString();

    }

    else if ($step.indexOf(this.options.animation_iteration_count) > -1) {
        $currentStyle.iteration = getParameterValue(this.options.animation_iteration_count, $step).toString();
    }
    return $currentStyle;
};

initiateCurrentStyle = function () {
    var $initialStyle = {
        selection: null,
        style: null,
        delay: "0",
        iteration: "1",
        duration: "1"
    };
    return $initialStyle;

};
