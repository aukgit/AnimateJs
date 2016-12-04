$.animateJs.stringManipulation.extractStyles = function (workingAttr) {
    /// <summary>
    /// extracts specific style operations to perform and returns the style summary in an array of json objects
    /// </summary>
    /// <param name="workingAttr" type="type"></param>
    /// <returns type="">array of json object with selection, delay, duration, iteration as value</returns>

    var tasks = this.extractActions(workingAttr);
    var nowAndSimutaneous;
    //console.log(tasks);
    var selectorStyle = false;
    var gotOne = false;
    var style = [];
    var simultaneousStyles = [];
    var nowStyle = "";
    var funcName;
    var funcValue;
    var isFunc;
    var splitStyle;
    var isJoin;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].indexOf("(") > -1)
            isFunc = true;
        else {
            isFunc = false;
        }
        if (isFunc) {
            funcName = this.getFuncName(tasks[i]);
            funcValue = this.getParameterValue(tasks[i]);
            if (funcName === this.options.reflections.selection.called) { // a selector,start of a new style
                if (gotOne) {
                    // push the previous style int simultaneousStyles and push simultaneousStyles to style
                    simultaneousStyles.push(nowStyle);
                    style.push(simultaneousStyles);
                }
                simultaneousStyles = [];
                //new simultaneousStyles
                gotOne = true;
                selectorStyle = true;
                nowStyle = this.initiateCurrentStyle();
                nowStyle.selection = "" + funcValue;
            } else if (funcName === this.options.reflections.remove.called) {
                nowStyle.remove = true;
            } else {
                //a normal function, might or mightn't have a "+" with it
                selectorStyle = false;
                splitStyle = tasks[i].split("+"); //if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
                if (splitStyle.length === 1)
                    isJoin = false;
                else
                    isJoin = true;

                nowStyle[funcName] = "" + funcValue;

                if (isJoin) {
                    // func()+s1+s2+....
                    nowAndSimutaneous = this.processJoinCommand(nowStyle, simultaneousStyles, splitStyle);
                    nowStyle = nowAndSimutaneous.nowStyle;
                    simultaneousStyles = nowAndSimutaneous.simultaneousStyles;
                }
            }

        } else {
            // got a style element, it might or mightn't be preceded by selector and might or mightn't have a "+" with it
            splitStyle = tasks[i].split("+");
            // if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
            if (splitStyle.length === 1) {
                isJoin = false;
            } else {
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
                gotOne = true;
                selectorStyle = false;
            }
            nowStyle.style = splitStyle[0];
            if (isJoin) {
                //style1+style2+.....
                nowAndSimutaneous = this.processJoinCommand(nowStyle, simultaneousStyles, splitStyle);
                nowStyle = nowAndSimutaneous.nowStyle;
                simultaneousStyles = nowAndSimutaneous.simultaneousStyles;
            }
        }

    }
    if (gotOne) {
        // push the last style (if any)
        simultaneousStyles.push(nowStyle);
        style.push(simultaneousStyles);
    }
    return style;
};


