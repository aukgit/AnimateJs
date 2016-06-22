$.animateJs.extractStyles = function (workingAttr) {
    var $steps = this.extractActions(workingAttr);
    var $selectorStyle = false;
    var $gotOne = false;
    var $style = [];
    var $currentStyle = "";
    for (var i = 0; i < $steps.length; i++) {
        if ($steps[i].indexOf(""+this.options.selection+"(")>-1) {// a selector,start of a new style
            if ($gotOne) {
                $style.push($currentStyle);
            }
            $currentStyle = ""+$steps[i];
            $selectorStyle = true;
            $gotOne = true;

        }

        else if ($steps[i].indexOf("(") > -1) {//a normal function, will be concatenated with the current style
            $currentStyle = $currentStyle +"."+ $steps[i];
        }

        else if ($selectorStyle) {//a class after the selector, will be concatenated with the current style
            $currentStyle = $currentStyle +"."+ $steps[i];
            $selectorStyle = false;
        } else {//A class without any preceeding selector, start of a new style
            if ($gotOne) {
                $style.push($currentStyle);
                //$gotOne = true;
            }
            $currentStyle = "" + $steps[i];
            $selectorStyle = false;
            $gotOne = true;
        }
    }
    if ($gotOne)
        $style.push($currentStyle);
    return $style;
};