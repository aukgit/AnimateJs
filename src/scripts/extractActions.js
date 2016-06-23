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