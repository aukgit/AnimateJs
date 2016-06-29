$.animateJs.stringManipulation.getParameterValue = function ($functionWithParameter) {

    var start = $functionWithParameter.indexOf("(") + 1;
    var end = $functionWithParameter.indexOf(")");
    if ($functionWithParameter[start] === '"'|| $functionWithParameter[start] ==="'")//to eliminate " or ' at the start
        start++;
    if ($functionWithParameter[end - 1] === '"' || $functionWithParameter[end - 1] === "'")//to eliminate " or ' at the end
        end--;
    var $value = $functionWithParameter.substr(start, end - start);
    return $value;
};