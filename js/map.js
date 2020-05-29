var map = L.map('map').setView([38.246251346735775,21.735041021911652],13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onFirstMapClick(e){
    //Get click point coords
    let startCoords = e.latlng;
    console.log(startCoords);//debug
    
    //Add marker in click point inside map
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
                
                
            }
            
		};
    strtPntSrch.open("POST","php/handler.php",true);
    strtPntSrch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    strtPntSrch.send("action=StartSearch&startLat="+startCoords[0]+"&startLong="+startCoords[1]);
    
}

//Clicking on map for the first time
map.on('click', onFirstMapClick);

