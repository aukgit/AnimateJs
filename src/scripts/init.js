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