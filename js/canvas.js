//set up the canvas
var canvas = document.querySelector('#drawingCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

//set pen length
var lineWidth = 1;
ctx.lineWidth = lineWidth;

//temp varables
var isDrawing = false;
var lastX = 0;
var lastY = 0;

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

//mouse events
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

//get refrance to textfild
var lineTextField = document.getElementById("penSizeTextField");
lineTextField.value = lineWidth;

//increase the width of the pen
function plus() {
    lineWidth++;
    lineTextField.value = lineWidth;
    console.log(lineWidth);
    ctx.lineWidth = lineWidth;
}

//decrease the width of the pen
function minus() {
    if (lineWidth >= 2) {
        lineWidth--;
        lineTextField.value = lineWidth;
        console.log(lineWidth);
        ctx.lineWidth = lineWidth;
    }
}

//called when text field is updated. if the number inputed is valed it will update the pen lingth
function lineTextFieldEditor() {
    let num = Number(lineTextField.value);
    if (isNaN(num) || num < 1) {
        lineTextField.value = lineWidth;
        return;
    }
    lineWidth = num;
    ctx.lineWidth = lineWidth;
}

//clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//change painting color
function colorChanger(color) {
    ctx.strokeStyle = color;
}

