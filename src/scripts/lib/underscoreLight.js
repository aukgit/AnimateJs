(function () {
    var _ = _ || {};
    if (typeof Object.create !== "function") {
        //console.log("not a function named create");
        Object.create = function (o) {
            function F() { }
            F.prototype = o;
            return new F();
        };
    }
    

    _.isEmptyObject = function(element) {
        /// <summary>
        /// Check if is empty
        /// </summary>
        /// <param name="element" type="type"></param>
        return element === undefined || element === null || element === "" || element.length === 0;
    }


   

    console.log(_);

});
