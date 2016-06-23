getParameterValue = function ($functionName, $functionWithParameter) {
    /// <summary>
    /// Give the function with parameter string and the name of the function, this method will return whats inside the parameter, works only for functions with single parameter
    /// </summary>
    /// <param name="$functionName" type="type"></param>
    /// <param name="$functionWithParameter" type="type"></param>
    /// <returns type=""></returns>
    var $start = $functionWithParameter.indexOf($functionName + "(") + $functionName.length + 1;
    var $end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr($start, $end - $start);
    return $value;
};