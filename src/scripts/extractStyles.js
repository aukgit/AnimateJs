$.animateJs.extractStyles = function (workingAttr) {
    /// <summary>
    /// extracts specific style operations to perform and returns the style summary in an array of json objects
    /// </summary>
    /// <param name="workingAttr" type="type"></param>
    /// <returns type="">array of json object with selection, delay, duration, iteration as value</returns>

    var steps = this.extractActions(workingAttr);
    var selectorStyle = false;
    var gotOne = false;
    var style = [];
    var simultaneousStyles = [];
    var plusPresent;
    var nowStyle = "";
    for (var i = 0; i < steps.length; i++) {
        //console.log("Step name is " + steps[i]);

        var paramStart = this.options.reflections.selection + "(";
        if (steps[i].indexOf(paramStart) > -1) {// a selector,start of a new style
            if (gotOne) {
                simultaneousStyles.push(nowStyle);
                style.push(simultaneousStyles);
            }
            simultaneousStyles = [];
            gotOne = true;
            selectorStyle = true;
            nowStyle = this.initiateCurrentStyle();
            nowStyle.selection = "" + this.getParameterValue(steps[i]);
        }

        else if (steps[i].indexOf("(") > -1) { //a normal function, might or mightn't have a "+" with it
            selectorStyle = false;
            var styleFunc = "";
            plusPresent = false;
            var funcAndStyle;
            if (steps[i].indexOf("+") < 0) { //no "+" symbol found
                styleFunc = steps[i];
            } else { //"+" symbol found
                funcAndStyle = steps[i].split("+");
                styleFunc = funcAndStyle[0];
                plusPresent = true;
            }
            //console.log("hi");
            var funcName = this.getParameterName(styleFunc);
            //console.log("bye");
            var funcValue = this.getParameterValue(styleFunc);
            nowStyle[funcName] = "" + funcValue;

            if (plusPresent) {
                //if plus symbol found, push the current syle in simultaneous array, initiate a new nowStyle
                //console.log("plus start");
                simultaneousStyles.push(nowStyle);
                //console.log("plus end");
                nowStyle = this.initiateCurrentStyle();
                // ReSharper disable once UsageOfPossiblyUnassignedValue
                nowStyle.style = funcAndStyle[1];
                nowStyle.selection = "" + simultaneousStyles[0].selection; //current style's selector would be the same as simultaneous selectors

            }
        }
        else {//got a style element, it might or mightn't be preceded by selector and might or mightn't have a "+" with it
            var splitStyle = steps[i].split("+");//if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
            if (splitStyle.length === 1)
                plusPresent = false;
            else {
                plusPresent = true;
            }
            if (!selectorStyle) { //style element, not preceded by selector, start of a new simultaneousStyles
                if (gotOne) {//if this is the very first style, this condition will be false
                    simultaneousStyles.push(nowStyle);
                    style.push(simultaneousStyles);
                }
                simultaneousStyles = [];
                gotOne = true;
                nowStyle = this.initiateCurrentStyle();
            }
            nowStyle.style = splitStyle[0];
            if (plusPresent) {//style1+style2
                simultaneousStyles.push(nowStyle);
                nowStyle = this.initiateCurrentStyle();
                nowStyle.style = "" + splitStyle[1];
                nowStyle.selection = simultaneousStyles[0].selection;
            }
        }

    }
    if (gotOne) {
        simultaneousStyles.push(nowStyle);
        style.push(simultaneousStyles);
    }
    return style;
};

//$.animateJs.plusStyle=function (simultaneousStyles)

$.animateJs.getParameterName = function ($step) {
    //console.log(this.);
    var keys = Object.keys(this.options.reflections);
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < this.options.reflections[keys[i]].names.length; j++) {
            var paramStart = this.options.reflections[keys[i]].names[j] + "(";
            if ($step.indexOf(paramStart) > -1) {
                return this.options.reflections[keys[i]].called;
            }
        }
    }
};

$.animateJs.getParameterValue = function ($functionWithParameter) {

    var start = $functionWithParameter.indexOf("(") + 1;
    var end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr(start, end - start);
    return $value;
};