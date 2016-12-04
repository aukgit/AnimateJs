$.animateJs.init = function (options, elem) {
    /// <summary>
    /// AnimateJs initial function.
    /// </summary>
    /// <param name="options" type="type">Pass options</param>
    /// <param name="elem" type="type">Element in which the animation will be applied.</param>
    /// <returns type=""></returns>

    // Mix in the passed-in options with the default options
    // ReSharper disable once NativeTypePrototypeExtending
    String.prototype.replaceAll = function (str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    this.elem = elem;
    this.$elem = $(elem);

    this.throwException = true;

    if (typeof options !== "string") {
        this.stringManipulation.options = $.extend({}, this.stringManipulation.options, options);
        this.attrValue = this.elem.attr(this.stringManipulation.options.workingAttr);
    } else {
        this.attrValue = options;
    }

    console.log(this.attrValue);
    var actionList = this.stringManipulation.extractStyles(this.attrValue);
    //console.log(actionList);
    //var valueCopyOfActionList = $.extend(true, {}, actionList);//valueCopyOfActionList becomes an object despite actionList being an array
    var valueCopyOfActionList = actionList.slice(0);//native cloning of actionList, not a deep clone. Effects should be evaluated
    var newObject = jQuery.extend(true, {}, actionList);//console.log(valueCopyOfActionList);
    var keys = Object.keys(newObject);
    console.log(newObject[keys[0]]);
    this.styleManipulation.processActionList(valueCopyOfActionList, this.$elem);
    //this.styleManipulation.processActionList(newObject[keys[0]], this.$elem);
    // return this so that we can chain and use the bridge with less code.
    return this;
}
