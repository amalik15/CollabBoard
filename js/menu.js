var modal;
var intAng;
var saturation;
var brightness;
var mouseDown;

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
  
function getColor(){
		var color = "hsl(" + intAng + ", "+ saturation+"%, "+ brightness+"%)";
		
		return "hsl(" + intAng + ", "+ saturation+"%, "+ brightness+"%)";
}	
	
function updateColor(){	
		var color = "hsl(" + intAng + ", "+ saturation+"%, "+ brightness+"%)";
		
		var b = document.getElementById("myBtn");
		b.style.backgroundColor = "hsl(" + intAng + ", "+ saturation+"%, "+ brightness+"%)";
		
		colorChanger(color);
		drawSat();
		drawSatArrow();
		drawBrightArrow();
}

function drawSat(){
		var satCanvas = document.getElementById("satBar");
		var ctx = satCanvas.getContext("2d");
		var b = document.getElementById("myBtn");
		var colorHolder = b.style.backgroundColor;
		
		for (var i=0; i<200; i++){
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, 12);
			ctx.lineTo(i+1, 12);
			ctx.lineTo(i+1, 0);
			ctx.closePath();
			b.style.backgroundColor = "hsl(" + intAng + ", "+ i/2+"%, "+ 50+"%)";
			ctx.strokeStyle = b.style.backgroundColor;
			ctx.stroke();
		}
		ctx.strokeStyle="#000000";
		
		b.style.backgroundColor = colorHolder;
}

function drawBright(){
		var brightCanvas = document.getElementById("brightBar");
		var ctx = brightCanvas.getContext("2d");
		var b = document.getElementById("myBtn");
		var colorHolder = b.style.backgroundColor;
		
		for (var i=0; i<200; i++){
			ctx.beginPath();
			ctx.moveTo(0,i);
			ctx.lineTo(12,i);
			ctx.lineTo(12, i+1);
			ctx.lineTo(0,i+1);
			ctx.closePath();
			b.style.backgroundColor = "hsl(" + intAng + ", "+ 0+"%, "+ (i/2)+"%)";
			ctx.strokeStyle = b.style.backgroundColor;
			ctx.stroke();
		}
		ctx.strokeStyle="#000000";
		
		b.style.backgroundColor = colorHolder;
}

function drawSatArrow(){
		var xOff = saturation * 2;
		var yOff = 18;
		var satCanvas = document.getElementById("satBar");
		var ctx = satCanvas.getContext("2d");
		
		ctx.clearRect(0,12, 200, 13);
		
		ctx.beginPath();
		ctx.moveTo(xOff - 6, yOff +6);
		ctx.lineTo(xOff + 6, yOff + 6);
		ctx.lineTo(xOff, yOff -6);

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
}

function drawBrightArrow(){
		var xOff = 18;
		var yOff = brightness*2;
		var brightCanvas = document.getElementById("brightBar");
		var ctx = brightCanvas.getContext("2d");
		
		ctx.clearRect(11,0, 14,200);
		
		ctx.beginPath();
		ctx.moveTo(xOff - 6, yOff);
		ctx.lineTo(xOff + 6, yOff + 6);
		ctx.lineTo(xOff + 6, yOff - 6);

		ctx.closePath();
		ctx.fill();
		ctx.stroke();	
}

// When the user clicks the button, open the modal 
function colorWheel() {
		if (typeof(intAng) === 'undefined')
			intAng = 0;
		if (typeof(saturation) === 'undefined')
			saturation = 100;
		if (typeof(brightness) === 'undefined')
			brightness = 50;
	
		mouseDown = false;

		modal = document.getElementById("myModal");
    modal.style.display = "block";
		var colorCanvas = document.getElementById("colorCanvas");
		var ctx = colorCanvas.getContext("2d");
		var img=document.getElementById("colorWheel");

    ctx.drawImage(img,0,0, 200, 200);
		
		drawBright();
		drawSat();
		drawBrightArrow();
		drawSatArrow();
}

$(document).on("mousemove", "#brightBar", function(evt){
		if (!mouseDown)
			return;
		var brightCanvas = document.getElementById("brightBar");
    var rect = brightCanvas.getBoundingClientRect();
		var y = evt.clientY - rect.left;
		
		brightness = y/2+75;
		updateColor();
});

$(document).on("mousedown", "#brightBar", function(evt){
		mouseDown = true;
});

$(document).on("mousemove", "#satBar", function(evt){
		if (!mouseDown)
			return;
		var satCanvas = document.getElementById("satBar");
    var rect = satCanvas.getBoundingClientRect();
		var x = evt.clientX - rect.left;
		
		saturation = x/2;
		updateColor();
});

$(document).on("mousedown", "#satBar", function(evt){
		mouseDown = true;
});

$(document).on("mouseup", "#myModal", function(evt){
		mouseDown = false;
});

$(document).on("mousemove", "#colorCanvas", function(evt){
		if (!mouseDown)
			return;
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
		
		intAng = Math.floor(ang);
		updateColor();
});

$(document).on("mousedown", "#colorCanvas", function(evt){
		mouseDown = true;
});

$(document).on("mouseup", "#colorCanvas", function(evt){
		mouseDown = false;
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
		
		intAng = Math.floor(ang);
		
		updateColor();
});


$(function(){
    $(".heading-compose").click(function() {
      $(".side-two").css({
        "left": "0"
      });
    });

    $(".newMessage-back").click(function() {
      $(".side-two").css({
        "left": "-100%"
      });
    });
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}	
