///#source 1 1 /src/scripts/animateJs.js
;
/**
 * Animate js is a library : 1.0.
 */
$.animateJs = {}; //json , class or object.

///#source 1 1 /src/scripts/Attributes.js
$.animateJs.options = {
    workingAttr: "data-animate",
    animation_iteration_count: "itr",
    animation_duration: "dur",
    animation_delay: "delay",
    selection: "selector"
};
///#source 1 1 /src/scripts/extractActions.js
$.animateJs.extractActions = function (working_attr) {
    /// <summary>
    /// extracts the series of steps to be taken from a given string
    /// </summary>
    /// <param name="working_attr" type="type"></param>
    /// <returns type=""></returns>
    working_attr = working_attr.replace(/\(\./g, "*");//replace all "(." by *
    working_attr = working_attr.replace(/\./g, "+");// replace all "." by +
    working_attr = working_attr.replace(/\*/g, "(.");//replace all "*" by "(." 
    var $actions = working_attr.split("+");
    return $actions;
};
///#source 1 1 /src/scripts/global_getParameterValue.js
getParameterValue = function ($functionName, $functionWithParameter) {
    /// <summary>
    /// Give the function with parameter string and the name of the function, this method will return whats inside the parameter, works only for functions with single parameter
    /// </summary>
    /// <param name="$functionName" type="type"></param>
    /// <param name="$functionWithParameter" type="type"></param>
    /// <returns type=""></returns>
    var $start = $functionWithParameter.indexOf($functionName + "(") + $functionName.length + 1;
    var $end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr($start, $end - $start);
    return $value;
};
///#source 1 1 /src/scripts/extractStyles.js
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

///#source 1 1 /src/scripts/init.js
$.animateJs.init = function (options, elem) {
    /// <summary>
    /// Helo
    /// </summary>
    /// <param name="options" type="type">wdwd</param>
    /// <param name="elem" type="type">wdwdwd</param>
    /// <returns type=""></returns>
    
    // Mix in the passed-in options with the default options
    this.options = $.extend({}, this.options, options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem = elem;
    this.$elem = $(elem);
    this.elem.text("hello world");
    this.attrValue = this.elem.attr(this.options.workingAttr);
    var $actionList = this.extractStyles(this.attrValue);
    console.log($actionList);
    this.myMethod();
    // return this so that we can chain and use the bridge with less code.
    return this;
}

///#source 1 1 /src/scripts/myMethod.js
$.animateJs.myMethod = function (msg) {
    // You have direct access to the associated and cached
    // jQuery element
    console.log("myMethod triggered");

    // this.$elem.append('<p>'+msg+'</p>');
}
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


