/// <reference path="bootstrap.js" />
/// <reference path="jquery-2.2.4.intellisense.js" />
/// <reference path="../../dist/scripts/animate.js" />
$(function () {
    var $options = {
        workingAttr: "data-animate",
        reflections: {
            animation_iteration_count: {
                called: "repeat",
                names: ["repeat", "itr", "repeat", "Itr"]
            },
            animation_duration: {
                called: "duration",
                names: ["duration", "dur", "Delay", "Dur"]
            },
            animation_delay: {
                called: "delay",
                names: ["delay", "Delay"]
            },
            selection: {
                called: "select",
                names: ["selection", "select", "Select"]
            }

        },

        seperator: "->",
        multi: "+"
    };
    var $check = "delay";
    console.log("before");
    //console.log(funcName($options, $check));
    var s = funcName($options, $check);
    console.log(s);
    console.log("after");
    //$(".a-js").animateJs();
    //console.log(misc("dur", "dur(23)"));
});
funcName = function ($options, $check) {
    console.log("inside fn " + $check+" "+typeof $check);
    $.each($options.reflections, function (key, value) {
        //console.log($options.reflections[key].names.length);

        for (var i = 0; i < $options.reflections[key].names.length; i++) {
            //console.log("key: "+key+" name: "+$options.reflections[key].names[i]);
            //console.log(typeof $options.reflections[key].names[i]);
            if ($options.reflections[key].names[i] == $check) {
                //return $options.reflections[key].called;
                console.log($options.reflections[key].called + " dhukse");
                return $options.reflections[key].called;
                console.log("after Return");

            }
        }
    });
};