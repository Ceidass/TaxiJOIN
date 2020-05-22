//Submit button
let subBtn = document.getElementById("submit-button");

//Μεταβλητές για τον έλεγχο του Username
let usr = document.getElementById("usr");
let usr_ok = false; //Μεταβλητή ελέγχου για την ενεργοποίηση του Submit


//Μεταβλητές για τον έλεγχο του Password
let pwd = document.getElementById("pwd");
let pwd_ok = false; //Μεταβλητή ελέγχου για την ενεργοποίηση του Submit

	
//Μεταβλητές για τον έλεγχος του Validate Password
let pwd_rep = document.getElementById("pwd_rep");
let pwd_rep_ok = false;	//Μεταβλητή ελέγχου για την ενεργοποίηση του Submit

//Συνάρτηση για ενεργοποίηση η απενεργοποίηση του Submit
function sub_en_dis(){
	if(usr_ok && pwd_ok && pwd_rep_ok){
		subBtn.disabled = false;
		//console.log("Sign Up enable"); //debug
        //console.log(usr_ok +","+ pwd_ok +"," + pwd_rep_ok);//debug
        
	}else{
		subBtn.disabled = true;
		//console.log("Sign Up disable"); //debug
        //console.log(usr_ok +","+ pwd_ok +"," + pwd_rep_ok);//debug
	}
}

//Η συνάρτηση αυτή εκτελείται όταν ο χρήστης κάνει κλικ στο πεδίο Username
function usr_check(){
	usr.onkeyup = function(){
		
		let usr_ajax = new XMLHttpRequest();
		
		usr_ajax.onreadystatechange = function(){
			
			if (this.readyState == 4 && this.status == 200) {
				//console.log(this.responseText); //debug
                let check = JSON.parse(this.responseText);
				//console.log(check); //debug
				if(check.exists == true){
					document.getElementById("usr_val").style.display = "none";
					document.getElementById("usr_inval").style.display = "initial";
					usr_ok = false;
				}else{
					document.getElementById("usr_inval").style.display = "none";
					document.getElementById("usr_val").style.display = "initial";
					usr_ok = true;
				}
				
			}
		
            sub_en_dis();
		};
		usr_ajax.open("GET","php/username_check.php?usr=" + usr.value,true);
		usr_ajax.send();
	
    };
}

function pwd_check(){
	pwd.onkeyup = function() {
			
			
			if(pwd.value.length == 0 || pwd.value != pwd_rep.value){
				document.getElementById("pwd_rep_val").style.display = "none";
				document.getElementById("pwd_rep_inval").style.display = "initial";
				pwd_rep_ok = false;
			}else{
				
				document.getElementById("pwd_rep_inval").style.display = "none";
				document.getElementById("pwd_rep_val").style.display = "initial";
				pwd_rep_ok = true;
                pwd_ok = true;
			}
			
			sub_en_dis();
		
		};
}

//Η συνάρτηση αυτή εκτελείται όταν ο χρήστης κάνει κλικ στο πεδίο Validate Password
function pwd_rep_check(){
	
	pwd_rep.onkeyup = function(){
		
		if(pwd.value != pwd_rep.value){
			document.getElementById("pwd_rep_val").style.display = "none";
			document.getElementById("pwd_rep_inval").style.display = "initial";
			pwd_rep_ok = false;
		}else{
			
			document.getElementById("pwd_rep_inval").style.display = "none";
			document.getElementById("pwd_rep_val").style.display = "initial";
			pwd_rep_ok = true;
            pwd_ok = true;
		}
		
		sub_en_dis();
	};
}

//Κλικ στο πεδίο Username
usr.onclick = usr_check;

//Κλικ στο πεδίο Password
pwd.onclick = pwd_check;

//Κλικ στο πεδίο Validate Password 
pwd_rep.onclick = pwd_rep_check;
