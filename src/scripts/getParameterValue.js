$.animateJs.getParameterValue = function ($functionWithParameter) {

    var start = $functionWithParameter.indexOf("(") + 1;
    var end = $functionWithParameter.indexOf(")");
    var $value = $functionWithParameter.substr(start, end - start);
    return $value;
};