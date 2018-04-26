function boxMove(listItem,direction){
    var box=document.getElementById(listItem);
    
    var index=box.selectedIndex;
    
    if(index==-1){
        alert("Select to move up");
        
        return;
    }
    
    var increment=-1;
    if(direction =='up'){
        increment=-1;
    }
    else{
        increment=1;
    }
    
    
    if((index+increment) < 0 || (index+increment)>(box.options.length-1)){
        
        return;
    }
    
    //TODO: get this working
    var value1=box.options[index].value;
    var text1=box.options[index].text;

    var canvasIndex = Number(value1);

    var canvas = canvasList[canvasIndex];
    var canvasPlusIncrement = canvasList[canvasIndex+increment];

    canvas.style.zIndex = canvasIndex+increment;
    canvasPlusIncrement.style.zIndex = canvasIndex;

    box.options[index].value=box.options[index+increment].value;
    box.options[index].text=box.options[index+increment].text;

    box.options[index+increment].value=value1;
    box.options[index+increment].text=text1;

    box.selectedIndex=index+increment;   
}