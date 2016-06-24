$.animateJs.extractActions = function (working_attr) {
    /// <summary>
    /// extracts the series of steps to be taken from a given string
    /// </summary>
    /// <param name="working_attr" type="type"></param>
    /// <returns type=""></returns>
   
    var $actions = working_attr.split(this.options.seperator);
    console.log($actions);
    return $actions;
};