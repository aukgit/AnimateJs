///#source 1 1 /src/Animation/animateJs.js
;
$.animateJs = {

};
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
                options, this));
            }
        });
    };
};

// Usage:
// With myObject, we could now essentially do this:
// $.plugin('myobj', myObject);

// and at this point we could do the following
// $('#elem').myobj({name: "John"});
// var inst = $('#elem').data('myobj');
// inst.myMethod('I am a method');
///#source 1 1 /src/Animation/Attributes.js
$.animateJs.options = {
    name: "no name"
};
///#source 1 1 /src/Animation/init.js
$.animateJs.init = function (options, elem) {
    // Mix in the passed-in options with the default options
    this.options = $.extend({}, this.options, options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem = elem;
    this.$elem = $(elem);

    // Build the DOM's initial structure
    //this._build();
    this.myMethod();
    // return this so that we can chain and use the bridge with less code.
    return this;
}
//console.log("inside inti");
///#source 1 1 /src/Animation/myMethod.js
$.animateJs.myMethod = function (msg) {
    // You have direct access to the associated and cached
    // jQuery element
    console.log("myMethod triggered");

    // this.$elem.append('<p>'+msg+'</p>');
}
