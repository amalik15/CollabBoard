var intAng = 0;
var modal;

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
  
	
function updateColor(){
		var hor = document.getElementById("horScroll");
		var vert = document.getElementById("vertScroll");
		var sat = Math.floor(hor.scrollLeft/10);
		var bright = Math.floor(vert.scrollTop/10);
		if (typeof intAngle === 'undefined')
			intAngle = 0;
		
		var color = "hsl(" + intAngle + ", "+ sat+"%, "+ bright+"%)";
		
		var b = document.getElementById("myBtn");
		b.style.backgroundColor = color;
		
		colorChanger(color);
}

function vertScroll(){
		updateColor();
}

function horScroll(){
		updateColor();
}

// When the user clicks the button, open the modal 
function colorWheel() {
		modal = document.getElementById("myModal");
    modal.style.display = "block";
		var colorCanvas = document.getElementById("colorCanvas");
		var ctx = colorCanvas.getContext("2d");
		var img=document.getElementById("colorWheel");

    ctx.drawImage(img,0,0, 200, 200);
}

$(document).on("mousemove", "#colorCanvas", function(evt){
		var colorCanvas = document.getElementById("colorCanvas");
    var rect = colorCanvas.getBoundingClientRect();
		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;	

		var xx = 100-x;
		var yy = 100-y;
		
		var dist = Math.sqrt(xx*xx + yy*yy);
		
		if (dist >94)
			return;
		
});

$(document).on("mousedown", "#colorCanvas", function(evt){
		var colorCanvas = document.getElementById("colorCanvas");
    var rect = colorCanvas.getBoundingClientRect();
		var x = evt.clientX - rect.left;
		var y = evt.clientY - rect.top;		
		
		var xx = 100-x;
		var yy = 100-y;
		
		var dist = Math.sqrt(xx*xx + yy*yy);
		if (dist >94)
			return;
		
		
		var AB = 100;
    var BC = Math.sqrt(Math.pow(100-x,2)+ Math.pow(100-y,2)); 
    var AC = Math.sqrt(Math.pow(x-100,2)+ Math.pow(y-0,2));
    var ang = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
		
		ang = ang * 180/Math.PI;
	
		if (x < 100)
			ang = 360-ang;
		
		intAngle = Math.floor(ang);
		
		updateColor();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}	