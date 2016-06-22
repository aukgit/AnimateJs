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
    working_attr = working_attr.replace(/\(\./g, "*");//replace all "(." by *
    working_attr = working_attr.replace(/\./g, "+");// replace all "." by +
    working_attr = working_attr.replace(/\*/g, "(.");//replace all "*" by "(." 
    var $actions = working_attr.split("+");
    console.log($actions);
    return $actions;
};
///#source 1 1 /src/scripts/extractStyles.js
$.animateJs.extractStyles = function (workingAttr) {
    console.log("hello there!!");
    var $steps = this.extractActions(workingAttr);
    console.log($steps);
    console.log($steps.length);
    var $selectorStyle = false;
    var $style = [];
    var $currentStyle = "";
    //console.log(this.elem);
    for (var i = 0; i < $steps.length; i++) {
        if ($steps[i].indexOf("selector(")>-1) {
            if ($currentStyle.length)
                $style.push($currentStyle);
            $currentStyle = ""+$steps[i];
            $selectorStyle = true;
        }

        else if ($steps[i].indexOf("(") > -1) {
            $currentStyle = $currentStyle +"."+ $steps[i];
        }

        else if ($selectorStyle) {
            $currentStyle = $currentStyle +"."+ $steps[i];
            $selectorStyle = false;
        } else {
            if ($currentStyle.length)
                $style.push($currentStyle);
            $currentStyle = "" + $steps[i];
            $selectorStyle = false;
        }
    }
    if ($currentStyle.length)
        $style.push($currentStyle);
    console.log($style.length);
    for( i=0;i<$style.length; i++)
        console.log($style[i]);
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


