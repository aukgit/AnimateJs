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
    this.options = $.extend({}, this.options, options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem = elem;
    this.$elem = $(elem);
    this.elem.text("hello world");
    this.attrValue = this.elem.attr(this.options.workingAttr);
    console.log(this.attrValue);
    var $actionList = this.extractStyles(this.attrValue);
    console.log($actionList);
    //this.myMethod();
    // return this so that we can chain and use the bridge with less code.
    return this;
}
