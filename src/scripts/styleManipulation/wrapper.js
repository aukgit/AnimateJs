/// <reference path="../lib/underscoreLight.js" />


$.animateJs.styleManipulation.wrapper = function ($element, wrapperClass, wrapperId) {
    /// <summary>
    /// Creates a span wrapper around the jQuery element given,
    /// </summary>
    /// <param name="$element" type="type">jQuery Element given.</param>
    /// <param name="wrapperClass" type="type">class name for the wrapper.</param>
    /// <param name="wrapperId" type="type">wrapper id.</param>
    /// <returns type=""></returns>
    if (_.isEmpty(wrapperClass)) {
        wrapperClass = "element-animation-wrapper";
    }

    if (_.isEmpty(wrapperId)) {
        return $element.wrap("<span class='animation-js-" + wrapperClass + "'></span>");
        //return $element;
    } else {
        $element.wrap("<span class='" + wrapperClass + "'" + "id='" + wrapperId + "'></span>");
    }
    return $element;
}