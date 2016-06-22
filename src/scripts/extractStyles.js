misc = function($functionName, $functionWithParameter) {
    var $start = $functionWithParameter.indexOf($functionName + "(") + $functionName.length+1;
    var $end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr($start, $end - $start);
    return $value;
};
getParameterValue = function ($step, $currentStyle) {
    //var $start = 0, $end = 0;
    //var $value = -1, $functionName="";
    if ($step.indexOf(this.options.animation_delay) > -1) {
        $currentStyle.delay=misc(this.options.animation_delay,$step);
        //$value = 
    }
    
    else if ($step.indexOf(this.options.animation_duration) > -1) {
        $currentStyle.duration = misc(this.options.animation_duration, $step);
        
    }

    else if ($step.indexOf(this.options.animation_iteration_count) > -1) {
        $currentStyle.iteration = misc(this.options.animation_iteration_count, $step);
        
    }
    return $currentStyle;
};

initiateCurrentStyle = function () {
    var $initialStyle = {
        selection: null,
        style: null,
        delay: 0,
        iteration: 1,
        duration: 1
    };
    return $initialStyle;

};
$.animateJs.extractStyles = function (workingAttr) {
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
            $currentStyle.selection = "" + $steps[i];
            $selectorStyle = true;
            $gotOne = true;

        }

        else if ($steps[i].indexOf("(") > -1) {//a normal function, will be concatenated with the current style
            $currentStyle = getParameterValue($steps[i], $currentStyle);
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