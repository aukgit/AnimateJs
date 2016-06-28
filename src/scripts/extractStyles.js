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
    var funcName;
    var funcValue;
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].indexOf("(") > -1) {
            funcName = this.getFuncName(steps[i]);
            funcValue = this.getParameterValue(steps[i]);
            if (funcName === this.options.reflections.selection.called) {// a selector,start of a new style
                if (gotOne) {
                    simultaneousStyles.push(nowStyle);
                    style.push(simultaneousStyles);
                }
                simultaneousStyles = [];
                gotOne = true;
                selectorStyle = true;
                nowStyle = this.initiateCurrentStyle();
                nowStyle.selection = "" + funcValue;
            }

            else if (funcName === this.options.reflections.remove.called) {
                nowStyle.remove = true;
            }

            else { //a normal function, might or mightn't have a "+" with it
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
                nowStyle[funcName] = "" + funcValue;

                if (plusPresent) {
                    //if plus symbol found, push the current syle in simultaneous array, initiate a new nowStyle
                    simultaneousStyles.push(nowStyle);
                    nowStyle = this.initiateCurrentStyle();
                    // ReSharper disable once UsageOfPossiblyUnassignedValue
                    nowStyle.style = funcAndStyle[1];
                    nowStyle.selection = simultaneousStyles[0].selection; //current style's selector would be the same as simultaneous selectors

                }
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
                if (gotOne) { //if this is the very first style, this condition will be false
                    simultaneousStyles.push(nowStyle);
                    style.push(simultaneousStyles);
                }
                simultaneousStyles = [];
                gotOne = true;
                nowStyle = this.initiateCurrentStyle();
            } else {
                selectorStyle = false;
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
