/// <reference path="bootstrap.js" />
/// <reference path="jquery-2.2.4.intellisense.js" />
/// <reference path="../../dist/scripts/animate.js" />
$(function () {
    //var $options = {
    //    workingAttr: "data-animate",
    //    reflections: {
    //        animation_iteration_count: {
    //            called: "repeat",
    //            names: ["repeat", "itr", "repeat", "Itr", "Repeat"]
    //        },
    //        animation_duration: {
    //            called: "duration",
    //            names: ["duration", "dur", "Duration", "Dur"]
    //        },
    //        animation_delay: {
    //            called: "delay",
    //            names: ["delay", "Delay"]
    //        },
    //        selection: {
    //            called: "select",
    //            names: ["selection", "select", "Select", "Selection"]
    //        }

    //    },

    //    seperator: "->",
    //    multi: "+"
    //};
    //var $check = "delay";
    //console.log("before");
    ////console.log(funcName($options, $check));
    //var s = funcName($options, $check);
    //console.log(s);
    //console.log("after");
    $(".a-js").animateJs();
});
//funcName = function ($options, $check) {
//    var keys = Object.keys($options.reflections);
//    for (var i = 0; i < keys.length; i++) {
//        for (var j = 0; j < $options.reflections[keys[i]].names.length; j++) {
//            if ($options.reflections[keys[i]].names[j] === $check) {
//                return $options.reflections[keys[i]].called;
//            }
//        }
//    }
//};