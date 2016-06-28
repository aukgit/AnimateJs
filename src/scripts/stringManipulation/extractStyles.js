$.animateJs.stringManipulation.extractStyles = function (workingAttr) {
    /// <summary>
    /// extracts specific style operations to perform and returns the style summary in an array of json objects
    /// </summary>
    /// <param name="workingAttr" type="type"></param>
    /// <returns type="">array of json object with selection, delay, duration, iteration as value</returns>

    var tasks = this.extractActions(workingAttr);
    var selectorStyle = false;
    var gotOne = false;
    var style = [];
    var simultaneousStyles = [];
    var plusPresent;
    var nowStyle = "";
    var funcName;
    var funcValue;
    var hasPlus;
    var splitStyle;
    var isJoin;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].indexOf("(") > -1)
            hasPlus = true;
        else {
            hasPlus = false;
        }
        if (hasPlus) {
            funcName = this.getFuncName(tasks[i]);
            funcValue = this.getParameterValue(tasks[i]);
            if (funcName === this.options.reflections.selection.called) {// a selector,start of a new style
                if (gotOne) {//push the previous style int simultaneousStyles and push simultaneousStyles to style
                    simultaneousStyles.push(nowStyle);
                    style.push(simultaneousStyles);
                }
                simultaneousStyles = [];//new simultaneousStyles
                gotOne = true;
                selectorStyle = true;
                nowStyle = this.initiateCurrentStyle();
                nowStyle.selection = "" + funcValue;
            } else if (funcName === this.options.reflections.remove.called) {
                nowStyle.remove = true;
            }

            else { //a normal function, might or mightn't have a "+" with it
                selectorStyle = false;
                splitStyle = tasks[i].split("+");//if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
                if (splitStyle.length === 1)
                    isJoin = false;
                else
                    isJoin = true;

        
                nowStyle[funcName] = "" + funcValue;

                if (isJoin) {
                    //if plus symbol found, push the current syle in simultaneous array, initiate a new nowStyle
                    simultaneousStyles.push(nowStyle);
                    nowStyle = this.initiateCurrentStyle();
                    // ReSharper disable once UsageOfPossiblyUnassignedValue
                    nowStyle.style = splitStyle[1];
                    nowStyle.selection = simultaneousStyles[0].selection; //current style's selector would be the same as simultaneous selectors

                }
            }
        }

        else {//got a style element, it might or mightn't be preceded by selector and might or mightn't have a "+" with it
            splitStyle = tasks[i].split("+");//if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
            if (splitStyle.length === 1)
                isJoin = false;
            else {
                isJoin = true;
            }
            if (!selectorStyle) { //style element, not preceded by selector, start of a new simultaneousStyles
                if (gotOne) { //push the previous style int simultaneousStyles and push simultaneousStyles to style
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
            if (isJoin) {//style1+style2
                simultaneousStyles.push(nowStyle);
                nowStyle = this.initiateCurrentStyle();
                nowStyle.style = "" + splitStyle[1];
                nowStyle.selection = simultaneousStyles[0].selection;
            }
        }

    }
    if (gotOne) {//push the last style (if any)
        simultaneousStyles.push(nowStyle);
        style.push(simultaneousStyles);
    }
    return style;
};
