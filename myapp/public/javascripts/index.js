


const root = document.documentElement;
//Make everything into a singular function later
function dark(sys =false){
    if(sys)
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', system());

        

    root.style.setProperty('--body-color', '#181818');
    root.style.setProperty('--text-color', 'white');
    root.style.setProperty('--opp-color', 'white');
    root.style.setProperty('--accent-color', '#AAAAAA');
    document.getElementById("mode").src = "./images/night-mode (1).png";
    toggs.style.backgroundColor = root.style.getPropertyValue('--body-color');
    //document.getElementById("mode").src = "./images/night-mode (1).png";
    // document.getElementById("logo").src = "./images/OnWhite.svg";
}
function light(sys = false){
    if(sys)
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', system());
    root.style.setProperty('--body-color', 'white');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--opp-color', 'black');
    root.style.setProperty('--accent-color', 'black');
    document.getElementById("mode").src = "./images/day-mode (1).png";
    toggs.style.backgroundColor = root.style.getPropertyValue('--body-color');
    //document.getElementById("mode").src = "./images/day-mode (1).png";
    // document.getElementById("logo").src = "./images/OnBlack.svg";
}
function system(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dark();
    }else{
        light();
    }
   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', system());
}
function toggle()
{
    console.log(getComputedStyle(root).getPropertyValue("--body-color"));
    if(getComputedStyle(root).getPropertyValue("--body-color") == "white"){

        root.style.setProperty('--body-color', '#181818');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--opp-color', 'white');
        root.style.setProperty('--accent-color', '#AAAAAA');
        toggs.style.backgroundColor = '#181818';
        document.getElementById("mode").src = "./images/night-mode (1).png";
        //document.getElementById("logo").src = "./images/OnWhite.svg";
    }else{
        root.style.setProperty('--body-color', 'white');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--opp-color', 'black');
        root.style.setProperty('--accent-color', 'black');
        toggs.style.backgroundColor = 'white';
        document.getElementById("mode").src = "./images/day-mode (1).png";
        // document.getElementById("logo").src = "./images/OnBlack.svg";
    }
}
const toggsDiv = document.createElement("div");
toggs = document.getElementById("mode");
toggsConatain = document.getElementsByClassName("options")[0];
console.log(toggsConatain);
var amount = 1;
var bound = toggs.getBoundingClientRect();
document.body.addEventListener('click',(e)=>{

    if (amount >= 2){

        if (document.getElementById("toggsDiv"))
            document.getElementById("toggsDiv").remove();

      amount = 0;  
    }
    amount++
})
toggs.addEventListener('click', (e) => {
    
    if (document.getElementById("toggsDiv")){
        document.getElementById("toggsDiv").remove();
    }else{

        var left = bound.left;
        var top =  bound.bottom;
        // var left = e.clientX;
        // var top = e.clientY;
        console.log(left,top);
        toggsDiv.id = "toggsDiv"
       
        toggsDiv.style.left = left; 
        toggsDiv.style.top = top; 
        toggsDiv.style.position = 'absolute'; 
        toggsDiv.innerHTML = ` 
                <h6 class="no-nothing" onclick="light()">Light</h6>
                
                <h6 class="no-nothing" onclick="dark()">Dark</h6>
               
                <h6 class="no-nothing" onclick="system()">System</h6>`
        toggsDiv.style =  ` 
        width: 5%; 
        border: 1px solid white; 
        border-radius: 8%; 
        position: absolute; 
        top:calc(${top}px); 
        left:calc(${left}px - 5%); 
        align-items: center;
        box-shadow:inset -1px 3px 4px 0px; `
        toggsConatain.parentNode.insertBefore(toggsDiv,toggsConatain);
        toggsDiv.style.left = left;    
        toggsDiv.style.top = top; 
        toggs.style.backgroundColor = 'lightblue';
    }
});

toggs.addEventListener('mouseleave', () => {
    //document.getElementById("toggsDiv").remove();
    toggs.style.backgroundColor = root.style.getPropertyValue('--body-color');
});
toggs.addEventListener('mouseover', () => {
    //document.getElementById("toggsDiv").remove();
    if(root.style.getPropertyValue('--body-color') == "#181818"){
        toggs.style.backgroundColor = '#363636ff';
    }else{
        console.log(root.style.getPropertyValue('--body-color'));
        toggs.style.backgroundColor = '#adadad5b';
        
    }
    
});


async function soks(e){
    
    console.log("jere");
    const form = document.querySelector('form'); 
    const formData = new FormData(form);
    console.log(formData.get('id'));
    console.log(formData.get('password'));
    const postData = {
      id: formData.get('id'),
      password: formData.get('password'),
    };
    
    
    try {
        var res =  await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json' 
            },
                body: JSON.stringify(postData) 
            });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        localStorage.setItem("session", data.session);
        window.location.href = "http://127.0.0.1:5500/myapp/public/coursePage.html";
        
    } catch (error) {
        console.error('Error:', error);
    }
    
    
    
}

var form = document.getElementById("subMain");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
