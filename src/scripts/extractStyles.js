$.animateJs.extractStyles = function (workingAttr) {
    console.log("hello there!!");
    var $steps = this.extractActions(workingAttr);
    console.log($steps);
    console.log($steps.length);
    var $selectorStyle = false;
    var $style = [];
    var $currentStyle = "";
    //console.log(this.elem);
    for (var i = 0; i < $steps.length; i++) {
        if ($steps[i].indexOf("selector(")>-1) {
            if ($currentStyle.length)
                $style.push($currentStyle);
            $currentStyle = ""+$steps[i];
            $selectorStyle = true;
        }

        else if ($steps[i].indexOf("(") > -1) {
            $currentStyle = $currentStyle +"."+ $steps[i];
        }

        else if ($selectorStyle) {
            $currentStyle = $currentStyle +"."+ $steps[i];
            $selectorStyle = false;
        } else {
            if ($currentStyle.length)
                $style.push($currentStyle);
            $currentStyle = "" + $steps[i];
            $selectorStyle = false;
        }
    }
    if ($currentStyle.length)
        $style.push($currentStyle);
    //console.log($style.length);
    //for( i=0;i<$style.length; i++)
    //    console.log($style[i]);
    return $style;
};