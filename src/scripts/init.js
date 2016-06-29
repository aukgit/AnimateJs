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
