//SignOut button
let sout  = document.getElementById("SignOut");

//Sign Out on click function
function signOut(){
    
    window.location.replace("login.html");
    
    let sout_ajax = new XMLHttpRequest();
    
    sout_ajax.open("POST","php/handler.php",true);
    sout_ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    sout_ajax.send("action=SignOut");
    
}

//Clicking Sign Out button
sout.onclick = signOut;
