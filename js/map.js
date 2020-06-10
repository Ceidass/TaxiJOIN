var map = L.map('map').setView([38.246251346735775,21.735041021911652],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var imap = L.map('imap');
    
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(imap);

//Variable counts times allReqs has been called to prevent remReq been called on page load 
let itter = 0;
//Array of variables to set the markers on map
let markers = new Array();
//Variable to save the requests loading from server in JSON form
let reqs;
//Array of points (start/end) of the clicked (selected) request
let selectedreq = new Array();
//Variable for checking if you are now inspecting a request
let inspectcheck = false;

function inspect(req){
    
    if(!inspectcheck){
        //Setting variable inspectcheck as true
        inspectcheck = true;
        
        document.getElementById("inspect").style.display = "initial";
        
        selectedreq[0] = L.marker([Number(req.startlat),Number(req.startlong)]);
        selectedreq[1] = L.marker([Number(req.endlat),Number(req.endlong)]);
        
        var group = L.featureGroup(selectedreq).addTo(imap);
        
        imap.fitBounds(group.getBounds());
    }else{
        
        //Call function closeimap to delete previous inpecting request from imap 
        closeimap();
        //Set inspectcheck to false
        inspectcheck = false;
        //Call self again to execute if statement
        inspect(req);
        
        
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Check if there is any active request with creator name as user's name
//AJAX request searching for active requests with user's name
let checkrq = new XMLHttpRequest();

checkrq.onreadystatechange = function(){
  
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText); //debug
        //If there is any active request
        if(this.responseText == "yes"){
            
            //Set Prompt
            document.getElementById("prompt").innerHTML = "Your request has been activated.Please wait for other users to connect...";
            
            //Disable Errors and enable prompts
            document.getElementById("error").style.display = "none";
            document.getElementById("prompt").style.display = "initial";
            
            //Enable CANCEL button
            document.getElementById("cancel").style.display = "initial";
            
            //Setting first and second click to true so the user cannot set point to the map
            firstClick = true;
            secondClick = true;
        }
        
    }
    
};

checkrq.open("POST","php/handler.php",true);
checkrq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
checkrq.send("action=CheckRequest");


//Function to remove requests on map before loading new
function remReqs(){
    
    //If is not the first time after loading the page
    if(itter>0){
        
        for(let j=0; j<markers.length; j++)
            markers[j].remove();
        
    }
    
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Searching for every request and display it to map

let allreqs = new XMLHttpRequest();

function allReqs(){

    allreqs.onreadystatechange = function(){
        
        if (this.readyState == 4 && this.status == 200) {
            
            //console.log(this.responseText);//debug
            //Removes all requests from map to load the new one
            remReqs();
            if(this.responseText != false && this.responseText != "none"){
                
                //Save all the requests in JSON form
                reqs = JSON.parse(this.responseText);
                //Access every reqs element
                for(let i = 0; i<reqs.length; i++){
                    
                    //Add req marker to map
                    markers[i] = L.marker([Number(reqs[i].startlat),Number(reqs[i].startlong)]).addTo(map).on("click",function (){inspect(reqs[i]);});
                    markers[i].bindPopup("<b>"+reqs[i].creator+"</b><br>"+reqs[i].participants+" persons");
                    
                }//for end
                
            }
            
        }
        
    };
    allreqs.open("POST","php/handler.php",true);
    allreqs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    allreqs.send("action=AllReqs");
    
    //Increase itter every time allReqs been called
    itter++;
};

//Variable for checking if first map click has occurred
let firstClick = false;
//Variable for checking if second map click has occured
let secondClick = false;
//Variable for checking if first click had matches
let firstSearch = false;

//Function to be called onclick of cancel button
function cancel(){
    
    //AJAX request searching for canceling request search or creation
    let cncl = new XMLHttpRequest();
    cncl.onreadystatechange = function(){
                    
        if (this.readyState == 4 && this.status == 200) {
            
            //console.log(this.responseText); //debug
            if(this.responseText == "ok"){
                //Set Cancel message
                document.getElementById("error").innerHTML = "Canceled";
                //Stop displaying CANCEL button
                document.getElementById("cancel").style.display = "none";
                
                //Stop displaying request's attributes form
                document.getElementById("req").style.display = "none";
                
                //Disable prompts and enable errors
                document.getElementById("prompt").style.display = "none";
                document.getElementById("error").style.display = "initial";
                
            }
            //Refresh page
            window.location.reload(false);
            
        }
        
    };
    cncl.open("POST","php/handler.php",true);
    cncl.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    cncl.send("action=Cancel");
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function to be called on every map click
function onMapClick(e){
    
    //Variable for button CANCEL to display it and use it to create an onclick event
    let cancel = document.getElementById("cancel");
    
    //Display button to be visible to user
    cancel.style.display = "initial";
    
    //If first click has not occured
    if(firstClick === false && secondClick === false){
        //Get click point (start point) coords
        let startCoords = e.latlng;
        //console.log(startCoords);//debug
        
        //Change firstClick value
        firstClick = startCoords;
        
        //Add marker in click point (start point) inside map
        let startPoint = L.marker(startCoords).addTo(map);
        
        //AJAX request searching for available request in area
        let strtPntSrch = new XMLHttpRequest();
        
        strtPntSrch.onreadystatechange = function(){
            
            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText); //debug
                let result = JSON.parse(this.responseText);
                //console.log(result); //debug
                
                //If displayPrompt echoes
                if(result.check){
                    
                    //Set Prompt
                    document.getElementById("prompt").innerHTML = result.message;
                    
                    //Disable Errors and enable prompts
                    document.getElementById("error").style.display = "none";
                    document.getElementById("prompt").style.display = "initial";
                    
                }else{//If displayError echoes
                    
                    //Set Error
                    document.getElementById("error").innerHTML = result.message;
                    
                    //Disable prompts and enable errors
                    document.getElementById("prompt").style.display = "none";
                    document.getElementById("error").style.display = "initial";
                }
                
                //Assign value true or false to variable firstSearch to know if it has to keep searching or create new request
                firstSearch = result.check;
                
            }
            
        };//strtPntSrch.onreadystatechange end
            
        strtPntSrch.open("POST","php/handler.php",true);
        strtPntSrch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        strtPntSrch.send("action=StartSearch&startLat="+firstClick[0]+"&startLong="+firstClick[1]);
        
    //if(firstClick === false) end
    }else if(secondClick === false){//If first click has already occurred but the second not
        
        //If first search had matches (Continue searching for requests)
        if(firstSearch){
            
        }else{//If first search was unsuccesfull (Create your own request)
            
            //Variables for persons and time attributes to send values to server
            let persons =  document.getElementById("persons");
            let time =  document.getElementById("time");
            
            //Variable for create button to create an onclick event
            let create = document.getElementById("create");
            
            //Get click point (end point) coords
            let endCoords = e.latlng;
            //console.log(endCoords);//debug
            
            //Change secondClick value
            secondClick = endCoords;
            
            //Add marker in click point (end point) inside map
            let endPoint = L.marker(endCoords).addTo(map);
            
            //Set Prompt
            document.getElementById("prompt").innerHTML = "Select total number of persons you are with and time you wish your request to live or CANCEL...";
                        
            //Disable Errors and enable prompts
            document.getElementById("error").style.display = "none";
            document.getElementById("prompt").style.display = "initial";
            
            //Display request attributes inputs
            document.getElementById("req").style.display = "initial";
            
            create.onclick = function(){
                
                //Set Prompt
                document.getElementById("prompt").innerHTML = "Your request has been activated.Please wait for other users to connect...";
                            
                //Disable Errors and enable prompts
                document.getElementById("error").style.display = "none";
                document.getElementById("prompt").style.display = "initial"; 
                
                //Disable request's attributes inputs
                document.getElementById("req").style.display = "none";
                
                //AJAX request searching for matching requests
                let createRq = new XMLHttpRequest();
                
                createRq.onreadystatechange = function(){
                    
                    if (this.readyState == 4 && this.status == 200) {
                        
                        //console.log(this.responseText); //debug
                        //let result = JSON.parse(this.responseText);
                        //console.log(result); //debug
                        
                        
                    }
                    
                };
                
                createRq.open("POST","php/handler.php",true);
                createRq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                createRq.send("action=CreateRequest&startLat="+Number(firstClick['lat'])+"&startLong="+Number(firstClick['lng'])+"&endLat="+Number(secondClick['lat'])+"&endLong="+Number(secondClick['lng'])+"&persons="+Number(persons.value)+"&time="+Number(time.value));
                
            };//create.onclick end
            
        }//else end
        
    }//else end
    
}//function onMapClick(e) end

let close = document.getElementById("close");

function closeimap(){
    
    //Remove last clicked request points from imap
    selectedreq[0].remove();
    selectedreq[1].remove();
    
    //Disable second map and Connect button
    document.getElementById("inspect").style.display = "none";
    
}

//Call method allReqs on load 
allReqs();

//Clicking on map for the first time
map.on('click', onMapClick);

//Call allReqs every 5 sec
setInterval(allReqs, 5000);

close.onclick = closeimap;
