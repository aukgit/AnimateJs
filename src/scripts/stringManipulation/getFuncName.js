$.animateJs.stringManipulation.getFuncName = function ($step) {
    /// <summary>
    /// return only the name before the parenthesis.
    /// </summary>
    /// <param name="$step" type="type"></param>
    /// <returns type=""></returns>
    var reflections = this.options.reflections;
    var attrName,names;
    var keys = Object.keys(reflections);
    for (var i = 0; i < keys.length; i++) {
        attrName = reflections[keys[i]];
        names = attrName.names;
        for (var j = 0; j < names.length; j++) {
            var paramStart = names[j] + "(";
            if ($step.indexOf(paramStart) > -1) {
                return attrName.called;
            }
        }
    }
    return null;
};
