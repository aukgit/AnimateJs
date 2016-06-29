﻿///#source 1 1 /src/scripts/animateJs.js
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
    return $actions;
};
///#source 1 1 /src/scripts/stringmanipulation/getParameterValue.js
$.animateJs.stringManipulation.getParameterValue = function ($functionWithParameter) {

    var start = $functionWithParameter.indexOf("(") + 1;
    var end = $functionWithParameter.indexOf(")");
    if ($functionWithParameter[start] === '"'|| $functionWithParameter[start] ==="'")//to eliminate " or ' at the start
        start++;
    if ($functionWithParameter[end - 1] === '"' || $functionWithParameter[end - 1] === "'")//to eliminate " or ' at the end
        end--;
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
    var nowAndSimutaneous;
    console.log(tasks);
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

                if (isJoin) {//func()+s1+s2+....
                    nowAndSimutaneous = this.processJoinCommand(nowStyle, simultaneousStyles, splitStyle);
                    nowStyle = nowAndSimutaneous.nowStyle;
                    simultaneousStyles = nowAndSimutaneous.simultaneousStyles;
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
                gotOne = true;
                selectorStyle = false;
            }
            nowStyle.style = splitStyle[0];
            if (isJoin) {//style1+style2+.....
                nowAndSimutaneous = this.processJoinCommand(nowStyle, simultaneousStyles, splitStyle);
                nowStyle = nowAndSimutaneous.nowStyle;
                simultaneousStyles = nowAndSimutaneous.simultaneousStyles;
            }
        }

    }
    if (gotOne) {//push the last style (if any)
        simultaneousStyles.push(nowStyle);
        style.push(simultaneousStyles);
    }
    return style;
};


$.animateJs.stringManipulation.processJoinCommand=function (nowStyle, simultaneousStyles, splitStyle) {
    var nowAndSimutaneous = {};
    simultaneousStyles.push(nowStyle);
    nowStyle = this.initiateCurrentStyle();
    nowStyle.selection = simultaneousStyles[0].selection;
    for (var i = 1; i < splitStyle.length-1; i++) {
        nowStyle.style = splitStyle[i];
        simultaneousStyles.push(nowStyle);

    }
    nowStyle.style = splitStyle[splitStyle.length - 1];
    nowAndSimutaneous.simultaneousStyles = simultaneousStyles;
    nowAndSimutaneous.nowStyle = nowStyle;
    return nowAndSimutaneous;

}
///#source 1 1 /src/scripts/stylemanipulation/stylemanipulation.js
$.animateJs.styleManipulation = {};
///#source 1 1 /src/scripts/stylemanipulation/applysinglestyle.js
$.animateJs.styleManipulation.applySingleStyle = function ($element, styleJson) {
//    $element.css({
//        "animation-delay": styleJson.delay.toString(),
//        "animation-duration": styleJson.duration.toString(),
//        "animation-iteration-count":styleJson.iteration.toString()
//});
};
///#source 1 1 /src/scripts/stylemanipulation/applysimultaneousstyle.js

$.animateJs.styleManipulation.applySimultaneousStyle = function (singleSimultaneousAction, $element, isRemove) {
    var nowStyle = singleSimultaneousAction[0];
    var $newEle;
    this.applySingleStyle($element, singleSimultaneousAction[0]);
    if (!isRemove && nowStyle.remove === true) {
        isRemove = true;
    }
    singleSimultaneousAction.pop();
    if (singleSimultaneousAction.length) { //more style to apply
        //wrap the element with span
        $newEle = $element.wrap("<span></span>").parent();
        this.applySimultaneousStyle(singleSimultaneousAction, $newEle, isRemove);
    } else if(isRemove) {//no more style to apply and element needs to be removed.
        //
    }
}
///#source 1 1 /src/scripts/stylemanipulation/processactionlist.js
$.animateJs.styleManipulation.processActionList = function (actionList, $element) {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="actionList" type="[arrayOfJsonObjects][jsonObjects]">list of all styles to implement</param>
    /// <param name="$element" type="DOM element"></param>

    for (var i = 0; i < actionList.length; i++) {
        if (actionList[i][0].selection !== null) {
            console.log("yes selection :(" + actionList[i]);

            $element = $element.find(actionList[i][0].selection);
            if ($element.length) {
                //call all the nodes on the element with simulStyle method
            } 
            
        } else {
            console.log("no selection :D" + actionList[i]);
            this.applySimultaneousStyle(actionList[i], $element, false);
        }
    }
}
///#source 1 1 /src/scripts/init.js
$.animateJs.init = function (options, elem) {
    /// <summary>
    /// Helo
    /// </summary>
    /// <param name="options" type="type">wdwd</param>
    /// <param name="elem" type="type">wdwdwd</param>
    /// <returns type=""></returns>
    
    // Mix in the passed-in options with the default options
// ReSharper disable once NativeTypePrototypeExtending
    String.prototype.replaceAll = function (str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }
    this.elem = elem;
    this.$elem = $(elem);

    if (typeof options !== "string") {
        this.stringManipulation.options = $.extend({}, this.stringManipulation.options, options);
        this.attrValue = this.elem.attr(this.stringManipulation.options.workingAttr);
    }
    else {
        this.attrValue = options;
    }

    console.log(this.attrValue);
    var actionList = this.stringManipulation.extractStyles(this.attrValue);
    console.log(actionList);
    this.styleManipulation.processActionList(actionList,this.$elem);
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
    //console.log("not a function named create");
    Object.create = function (o) {
        function F() { }
        F.prototype = o;
        return new F();
    };
} else {
    //console.log("object.create is a function");
}

// Create a plugin based on a defined object
$.plugin = function (name, object) {
    //console.log("inside plugin script");
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


