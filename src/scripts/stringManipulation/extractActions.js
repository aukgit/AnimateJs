$.animateJs.stringManipulation.extractActions = function (workingAttr) {
    /// <summary>
    /// extracts the series of steps to be taken from a given string
    /// </summary>
    /// <param name="working_attr" type="type"></param>
    /// <returns type=""></returns>
   
    var $actions = workingAttr.split(this.options.seperator);
    console.log($actions);
    return $actions;
};