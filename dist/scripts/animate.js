///#source 1 1 /src/scripts/animateJs.js
;
/**
 * Animate js is a library : 1.0.
 */
$.animateJs = {}; //json , class or object.

///#source 1 1 /src/scripts/stringmanipulation/stringmanipulation.js
$.animateJs.stringManipulation = {};
///#source 1 1 /src/scripts/stringmanipulation/Attributes.js
$.animateJs.stringManipulation.options = {
        workingAttr: "data-animate",
        reflections: {
            iteration: {
                called: "repeat",
                names: ["repeat", "itr", "repeat", "Itr", "Repeat"]
            },
            duration: {
                called: "duration",
                names: ["duration", "dur", "Duration", "Dur"]
            },
            delay: {
                called: "delay",
                names: ["delay", "Delay"]
            },
            selection: {
                called: "select",
                names: ["selection", "select","selector", "Select", "Selection", "Selector"]
            },
            remove: {
                called: "remove",
                names:["remove", "delete", "Remove", "Delete"]
            }
        },
        seperator: "->",
        multi: "+"
};
///#source 1 1 /src/scripts/stringmanipulation/extractActions.js
$.animateJs.stringManipulation.extractActions = function (workingAttr) {
    /// <summary>
    /// extracts the series of steps to be taken from a given string
    /// </summary>
    /// <param name="working_attr" type="type"></param>
    /// <returns type=""></returns>
   
    var $actions = workingAttr.split(this.options.seperator);
    console.log($actions);
    return $actions;
};
///#source 1 1 /src/scripts/stringmanipulation/getParameterValue.js
$.animateJs.stringManipulation.getParameterValue = function ($functionWithParameter) {

    var start = $functionWithParameter.indexOf("(") + 1;
    var end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr(start, end - start);
    return $value;
};
///#source 1 1 /src/scripts/stringmanipulation/getFuncName.js
$.animateJs.stringManipulation.getFuncName = function ($step) {
    var reflections = this.options.reflections;
    var attrName,names;
    var keys = Object.keys(reflections);
    for (var i = 0; i < keys.length; i++) {
        attrName = reflections[keys[i]];
        names = attrName.names;
        for (var j = 0; j < names.length; j++) {
            var paramStart = names[j] + "(";
            if ($step.indexOf(paramStart) > -1) {
                return attrName.called;
            }
        }
    }
};

///#source 1 1 /src/scripts/stringmanipulation/initiateCurrentStyle.js
$.animateJs.stringManipulation.initiateCurrentStyle = function () {
    var $initialStyle = {
        selection: null,
        style: null,
        delay: "0",
        iteration: "1",
        duration: "1",
        remove:false
    };
    return $initialStyle;

};

///#source 1 1 /src/scripts/stringmanipulation/extractStyles.js
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
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].indexOf("(") > -1) {
            funcName = this.getFuncName(tasks[i]);
            funcValue = this.getParameterValue(tasks[i]);
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
            } else if (funcName === this.options.reflections.remove.called) {
                nowStyle.remove = true;
            } else { //a normal function, might or mightn't have a "+" with it
                selectorStyle = false;
                var styleFunc = "";
                plusPresent = false;
                var funcAndStyle;
                if (tasks[i].indexOf("+") < 0) { //no "+" symbol found
                    styleFunc = tasks[i];
                } else { //"+" symbol found
                    funcAndStyle = tasks[i].split("+");
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
            var splitStyle = tasks[i].split("+");//if it has a "+" with it splitStyle.length=2 otherwise splitStyle.length=1
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

///#source 1 1 /src/scripts/applySingleStyle.js
$.animateJs.applySingleStyle = function ($element,styleJson) {
    $element.css({
        "animation-delay": styleJson.delay.toString(),
        "animation-duration": styleJson.duration.toString(),
        "animation-iteration-count":styleJson.iteration.toString()
});
};
///#source 1 1 /src/scripts/init.js
$.animateJs.init = function (options, elem) {
    /// <summary>
    /// Helo
    /// </summary>
    /// <param name="options" type="type">wdwd</param>
    /// <param name="elem" type="type">wdwdwd</param>
    /// <returns type=""></returns>
    
    // Mix in the passed-in options with the default options
    String.prototype.replaceAll = function (str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }
    this.options = $.extend({}, this.stringManipulation.options, options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference


    this.elem = elem;
    this.$elem = $(elem);
    this.elem.text("hello world");
    this.attrValue = this.elem.attr(this.stringManipulation.options.workingAttr);
    console.log(this.attrValue);
    var $actionList = this.stringManipulation.extractStyles(this.attrValue);
    console.log($actionList);
    // return this so that we can chain and use the bridge with less code.
    return this;
}

///#source 1 1 /src/scripts/myMethod.js
//$.animateJs.task.Process.itr = function (msg) {
//    // You have direct access to the associated and cached
//    // jQuery element
//    console.log("myMethod triggered");

//    // this.$elem.append('<p>'+msg+'</p>');
//}
///#source 1 1 /src/scripts/inject.js
// Object.create support test, and fallback for browsers without it
if (typeof Object.create !== "function") {
    console.log("not a function named create");
    Object.create = function (o) {
        function F() { }
        F.prototype = o;
        return new F();
    };
} else {
    console.log("object.create is a function");
}

// Create a plugin based on a defined object
$.plugin = function (name, object) {
    console.log("inside plugin script");
    $.fn[name] = function (options) {
        return this.each(function () {
            if (!$.data(this, name)) {
                $.data(this, name, Object.create(object).init(
                options, $(this)));
            }
        });
    };
};

$.plugin('animateJs', $.animateJs);
// Usage:
// With myObject, we could now essentially do this:
// $.plugin('myobj', myObject);

// and at this point we could do the following
// $('#elem').myobj({name: "John"});
// var inst = $('#elem').data('myobj');
// inst.myMethod('I am a method');


