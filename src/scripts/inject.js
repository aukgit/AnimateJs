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

