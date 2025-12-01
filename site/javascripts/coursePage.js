console.log(localStorage.getItem("session"))


var divFact  = document.getElementById("facts");
var fact  = document.getElementById("fact");
function remove(){
   if ( divFact.classList.contains('new-fact') )
        divFact.classList.toggle('new-fact');
    
    fact.class = "";
}

function newFact(){
    console.log("here");
    
    divFact.classList.remove('new-fact');
    fact.classList.remove('fact');
    setTimeout(function(){ divFact.classList.add('new-fact'); fact.classList.add('fact')}, 100);
    
   
    
}

setTimeout(newFact,5000)
setInterval(newFact,10000);