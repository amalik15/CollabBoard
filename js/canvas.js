//set up the canvas
var canvasContainer = document.querySelector('#canvasList');
var canvasList = canvasContainer.getElementsByClassName('canvas');
//var baseCanvas = document.querySelector('#baseCanvas');
var baseCanvas = canvasList[0];
baseCanvas.width = window.innerWidth;
baseCanvas.height = window.innerHeight;

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

showLayer();

//mouse events
/*
baseCanvas.addEventListener('mousemove', draw);
baseCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
baseCanvas.addEventListener('mouseup', () => isDrawing = false);
baseCanvas.addEventListener('mouseout', () => isDrawing = false);
*/
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

function layerNumber() {
    let num = Number(layerField.value);
    if(isNaN(num) || num < 0) {
        return;
    }
    layerNum = num;
    ctx = canvasList[layerNum].getContext('2d');
    lineTextField.value = ctx.lineWidth;
    showLayer();
}

function showLayer() {
    var div = document.getElementById('canvasIndicator');
    div.innerHTML = "";
    for(var i = 0; i < canvasList.length; i++)
    {
        if(i == layerField.value)
        {
            div.innerHTML += "*";
        }
        div.innerHTML += i.toString() + " ";
    }
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
    canvasContainer.appendChild(newCanvas);
    canvasList = canvasContainer.getElementsByClassName('canvas');
    addListener(canvasList[canvasList.length - 1]);
    showLayer(); 
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
