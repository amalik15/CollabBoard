//set up the canvas
var canvasContainer = document.querySelector('#canvasList');
var canvasList = canvasContainer.getElementsByClassName('canvas');
var baseCanvas = canvasList[0];
baseCanvas.width = window.innerWidth * 0.998;
baseCanvas.height = window.innerHeight * 0.84;

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var ctx = baseCanvas.getContext('2d');
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

//set pen length
ctx.lineWidth = 1;

//temp varables
var isDrawing = false;
var lastX = 0;
var lastY = 0;

var layerNum = 0;

var layerField = document.getElementById("canvasLayerNumber");
layerField.value = 0;

document.getElementById("items").selectedIndex = 0;

//mouse events
addListener(baseCanvas);

function addListener(myCanvas){
    myCanvas.addEventListener('mousemove', draw);
    myCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    myCanvas.addEventListener('mouseup', () => isDrawing = false);
    myCanvas.addEventListener('mouseout', () => isDrawing = false);
}

function handleImage(e){
	  var ctx = baseCanvas.getContext('2d');
		
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
				
        img.onload = function(){
						if (img.width < baseCanvas.width && img.height < baseCanvas.height){
							ctx.drawImage(img,0,0);
						}
						else{
							var hor = img.width / baseCanvas.width;
							var vert = img.height / baseCanvas.height;
							
							if (hor > vert){
									ctx.drawImage(img,0,0, img.width, img.height,
																								0,0, baseCanvas.width, img.height/hor);
							}
							else{
									ctx.drawImage(img,0,0, img.width, img.height,
																	0,0, img.width/vert, baseCanvas.height);
							}
						}
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

//get refrance to textfild
var lineTextField = document.getElementById("penSizeTextField");
lineTextField.value = ctx.lineWidth;

//increase the width of the pen
function plus() {
    ctx.lineWidth++;
    lineTextField.value = ctx.lineWidth;
    console.log(ctx.lineWidth);
}

//decrease the width of the pen
function minus() {
    if (ctx.lineWidth >= 2) {
        ctx.lineWidth--;
        lineTextField.value = ctx.lineWidth;
        console.log(ctx.lineWidth);
    }
}

//called when text field is updated. if the number inputed is valed it will update the pen lingth
function lineTextFieldEditor() {
    let num = Number(lineTextField.value);
    if (isNaN(num) || num < 1) {
        lineTextField.value = ctx.lineWidth;
        return;
    }
    ctx.lineWidth = num;
}

function layerNumberFromBox() {
    let num = Number(layerField.value);
    if(isNaN(num) || num < 0) {
        return;
    }
    document.getElementById("items").selectedIndex = num;
    layerNum = num;
    ctx = canvasList[layerNum].getContext('2d');
    lineTextField.value = ctx.lineWidth;
}

function layerNumberFromList() {
    let num = Number(document.getElementById("items").selectedIndex);
    if(isNaN(num) || num < 0) {
        return;
    }
    layerField.value = num;
    layerNum = num;
    ctx = canvasList[layerNum].getContext('2d');
    lineTextField.value = ctx.lineWidth;
}

function addLayer() {
    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute("class", "canvas");
    newCanvas.id = "layer" + canvasList.length.toString();
    newCanvas.width = baseCanvas.width;
    newCanvas.height = baseCanvas.height;
    newCanvas.style = "border:1px solid #000000; position: absolute"
    newCanvas.style.zIndex = canvasList.length;
    var newCtx  = newCanvas.getContext('2d');
    newCtx.strokeStyle = '#000000';
    newCtx.lineJoin = 'round';
    newCtx.lineCap = 'round';
    var listBox = document.getElementById("items");
    var newLayerListBoxItem = document.createElement("option");
    newLayerListBoxItem.text = newCanvas.id;
    console.log(newCanvas.id);
    newLayerListBoxItem.value = canvasList.length.toString();
    listBox.add(newLayerListBoxItem);
    canvasContainer.appendChild(newCanvas);
    canvasList = canvasContainer.getElementsByClassName('canvas');
    addListener(canvasList[canvasList.length - 1]);
    moveCanvases(document.getElementById("items").options);

}
//function to draw on canvas
function draw(e) {

    //returns if user is not clicking
    if (!isDrawing) {
        return;
    }

    //draw on canvas
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

//clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
}

//change painting color
function colorChanger(color) {
    ctx.strokeStyle = color;
}

function moveCanvases(orderList){
    var len = orderList.length;
    for(var i = 0; i < len; i++){
        canvasList[Number(orderList[i].value)].style.zIndex = i; 
    }
}
