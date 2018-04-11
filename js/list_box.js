


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
    
    var value1=box.options[index].value;
    var text1=box.options[index].text;
    box.options[index].value=box.options[index+increment].value;
    
    box.options[index].text=box.options[index+increment].text;
    
    box.options[index+increment].value=value1;
    
    box.options[index+increment].text=text1;
    
    box.selectedIndex=index+increment;
    
    
    
}