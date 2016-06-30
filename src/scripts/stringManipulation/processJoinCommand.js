$.animateJs.stringManipulation.processJoinCommand = function (nowStyle, simultaneousStyles, splitStyle) {
    var nowAndSimutaneous = {};
    simultaneousStyles.push(nowStyle);

    for (var i = 1; i < splitStyle.length - 1; i++) {
        nowStyle = this.initiateCurrentStyle();
        nowStyle.selection = simultaneousStyles[0].selection;
        nowStyle.style = splitStyle[i];
        simultaneousStyles.push(nowStyle);

    }
    nowStyle = this.initiateCurrentStyle();
    nowStyle.style = splitStyle[splitStyle.length - 1];
    nowAndSimutaneous.simultaneousStyles = simultaneousStyles;
    nowAndSimutaneous.nowStyle = nowStyle;
    return nowAndSimutaneous;

}