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
    var $simultaneousStyles = [];
    var $nowStyle = "";
    for (var i = 0; i < $steps.length; i++) {

        if ($steps[i].indexOf("" + this.options.selection + "(") > -1) {// a selector,start of a new style
            if ($gotOne) {
                $simultaneousStyles.push($nowStyle);
                $style.push($simultaneousStyles);
            }
            $nowStyle = initiateCurrentStyle();
            $simultaneousStyles = [];
            $nowStyle.selection = "" + getParameterValue(this.options.selection, $steps[i]);
            $selectorStyle = true;
            $gotOne = true;

        }

        else if ($steps[i].indexOf("(") > -1) {//a normal function, will be concatenated with the current style
            $nowStyle = this._getParameterNameAndValue($steps[i], $nowStyle);
        }

        else if ($selectorStyle) {//a class after the selector, will be concatenated with the current style
            $nowStyle.style = $steps[i];
            $selectorStyle = false;
        } else {//A class without any preceding selector, start of a new style
            if ($gotOne) {
                $simultaneousStyles.push($nowStyle);
                $style.push($simultaneousStyles);
            }
            $nowStyle = initiateCurrentStyle();
            $simultaneousStyles = [];
            $nowStyle.style = "" + $steps[i];
            $selectorStyle = false;
            $gotOne = true;
        }
    }
    if ($gotOne) {
        $simultaneousStyles.push($nowStyle);
        $style.push($simultaneousStyles);
    }
    return $style;
};

$.animateJs._getParameterNameAndValue = function ($step, $nowStyle) {
    if ($step.indexOf("(") < 0) {
        $nowStyle.style = $step;
    }
    if ($step.indexOf(this.options.animation_delay) > -1) {
        $nowStyle.delay = getParameterValue(this.options.animation_delay, $step).toString();
        //$value = 
    }

    else if ($step.indexOf(this.options.animation_duration) > -1) {
        $nowStyle.duration = getParameterValue(this.options.animation_duration, $step).toString();

    }

    else if ($step.indexOf(this.options.animation_iteration_count) > -1) {
        $nowStyle.iteration = getParameterValue(this.options.animation_iteration_count, $step).toString();
    }
    return $nowStyle;
};

