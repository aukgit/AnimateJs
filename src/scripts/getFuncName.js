$.animateJs.getFuncName = function ($step) {
    //console.log(this.);
    var keys = Object.keys(this.options.reflections);
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < this.options.reflections[keys[i]].names.length; j++) {
            var paramStart = this.options.reflections[keys[i]].names[j] + "(";
            if ($step.indexOf(paramStart) > -1) {
                return this.options.reflections[keys[i]].called;
            }
        }
    }
};
