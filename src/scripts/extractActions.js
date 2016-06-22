$.animateJs.extractActions = function (working_attr) {
    working_attr = working_attr.replace(/\(\./g, "*");//replace all "(." by *
    working_attr = working_attr.replace(/\./g, "+");// replace all "." by +
    working_attr = working_attr.replace(/\*/g, "(.");//replace all "*" by "(." 
    var $actions = working_attr.split("+");
    return $actions;
};