// toggle drop down
$(document).ready(function(){
    $("li:has(ul)").click(function(){
      if ($(this).find(".is-open").is(":visible")) {
        $(".is-open").hide();
      } else {
        $(".is-open").hide();
        $(this).find(".is-open").toggle();
      }
    });
  });


  // close menu when clicked outside of drop down menu
  $(document).on("click", function(event){
    var $triggerOn = $(".dropdown");
    if($triggerOn !== event.target && !$triggerOn.has(event.target).length){
      $(".is-open").hide();
    }            
  });
  