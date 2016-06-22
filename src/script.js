$(document).ready(function(){
    console.log("calling the plug-in");

  $.plugin('myobj', animateAnimation);
    $('#animationSandbox').myobj({ name: "John" });
  $('.js--triggerAnimation').click(function(e){
    e.preventDefault();
    var anim = $('.js--animations').val();
    testAnim(anim);
  });

  $('.js--animations').change(function () {
      console.log("SDS");
      var anim = $(this).val();
      var iteration = $('#data-iteration').val();
      var duration=$('#data-duration').val();
      testAnim(anim,iteration,duration);
  });
    //$('#animationSandbox').style.animationDelay(2);
});
//console.log("SDS dfd");

function testAnim(x, iterationCount, animationDuration) {
    console.log(animationDuration);
    console.log(iterationCount.toString());
    console.log(iterationCount);
    
    var $v = $('#animationSandbox').removeClass().addClass(x + ' animated');
    //$v.css("animation-iteration-count", "3");

    //$v.css("animation-iteration-count", iterationCount.toString());
    //$v.css("animation-duration", animationDuration.toString());

    //$v.css("animation-duration", animationDuration.toString());
    //$var.css("animation-iteration-count", "20");
    //$v.
    $v.css({
        "animation-iteration-count": iterationCount.toString(),
        "animation-duration": animationDuration.toString()+"s"
    });

};
