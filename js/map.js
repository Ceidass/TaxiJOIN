var map = L.map('map').setView([38.246251346735775,21.735041021911652],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Variable for checking if first map click has occurred
let firstClick = false;
//Variable for checking if second map click has occured
let secondClick = false;
//Variable for checking if first click had matches
let firstSearch = false;

function onMapClick(e){
    
    //Variable for button CANCEL to display it and use it to create an onclick event
    let cancel = document.getElementById("cancel");
    
    //Display button to be visible to user
    cancel.style.display = "initial";
    
    //If first click has not occured
    if(firstClick === false && secondClick === false){
        //Get click point (start point) coords
        let startCoords = e.latlng;
        console.log(startCoords);//debug
        
        //Change firstClick value
        firstClick = startCoords;
        
        //Add marker in click point (start point) inside map
        let startPoint = L.marker(startCoords).addTo(map);
        
        //AJAX request searching for available request in area
        let strtPntSrch = new XMLHttpRequest();
        
        strtPntSrch.onreadystatechange = function(){
            
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText); //debug
                let result = JSON.parse(this.responseText);
                console.log(result); //debug
                
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
            console.log(endCoords);//debug
            
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
                        
                        console.log(this.responseText); //debug
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



//Clicking on map for the first time
map.on('click', onMapClick);

