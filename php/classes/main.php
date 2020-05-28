<?php

include 'database.php';
include 'user.php';

class Main{
    
    public static function action($act){
        
        switch($act){
            
            case "usernameCheck":
                
                $callername = strtolower($_POST['usr']);
                
                $db = new Database("SELECT username FROM users");
                
                $result = $db->performQuery();
                
                while($row = $result->fetch_assoc())
                    $temp[] = $row;
                
                $name = new \stdClass();
                
                foreach($temp as $value){
                    if($value['username'] != $callername){
                        $name->exists = false;
                    }else{
                        $name->exists = true;
                        break;
                    }
                }
                
                $check = json_encode($name);
                
                
                unset($callername);
                
                echo $check;
                
                break;
                
            case "SignUp":
                
                $callername = strtolower($_POST['username']);
                
                $password = $_POST['password'];
                
                //Create new Database object and set query
                $db = new Database("INSERT INTO users(username, password) VALUES('".$callername."','".$password."')");
                
                //Perform query for inserting new record in users table
                $db->performQuery();
                
                //Set query to create new table for storing user's friends
                $db->setQuery("CREATE TABLE ".$callername."(friend VARCHAR(100))");
                
                //Perform query to create new table for storing user's friends
                $result = $db->performQuery();
                
                //Check if query performed succesfully
                if(!$result){
                    
                    //If not, then set query for deleting last user insertion
                    $db->setQuery("DELETE FROM users WHERE 'username'='".$callername."'");
                    
                    //Perform query for deleting last user insertion
                    $db->performQuery();
                }else{//If query performed succesfully
                    
                    //Unset Database object
                    unset($db);
                    
                    //Go to login page
                    header('Location: ../login.html');
                    
                    //Exit script
                    exit;
                }
                
                unset($db);
                
                break;
            
            case "SignIn":
            
            $callername = strtolower($_POST['username']);
                
            $password = $_POST['password'];
            
            //Create Database object and set query
            $db = new Database("SELECT * FROM users WHERE username='".$callername."' AND password='".$password."'");
            
            //Perfom query and save results
            $result = $db->performQuery();
            
            //Create array from query results
            while ($row = $result->fetch_assoc())
                $temp[] = $row;
            
            //Access associative array from every row of result
            foreach($temp as $value){
                $type['isDriver'] = $value['isDriver'];
                $type['isAdmin'] = $value['isAdmin'];
                
            }
            
            //Destroy Database object
            unset($db);
            
            //If there is no user with this username and/or this password
            if($result->num_rows == 0){
                header("Location: ../login.html");
                exit;
            }else{
                
                if($type['isDriver'] == 0 && $type['isAdmin'] == 0){ //If is simple user
                    //Create new User object 
                    $online = new User();
                    
                }elseif($type['isDriver'] == 1 && $type['isAdmin'] == 0){ //If is driver
                    //Create new Driver object
                    $online = new Driver($callername);
                    
                }elseif($type['isDriver'] == 0 && $type['isAdmin'] == 1){ //If is admin
                    //Create new Admin object
                    $online = new Admin($callername);
                    
                }
                
            }
            
            //Create and init $_SESSION
            $online->sesStart($callername);
            
            //Set session attribute as the superglobal $_SESSION
            $online->setSess();
            
            ////Add user to online list
            $online->userAdd();
            
            break;
            
            case "AddUser":
            
            $callername = $_SESSION['username'];
            
            //Check the type of user trying to connect
            if($_SESSION['type'] == "USER"){
                $isDriver = 0;
                $isAdmin = 0;
            }elseif($_SESSION['type'] == "DRIVER"){
                $isDriver = 1;
                $isAdmin = 0;
            }elseif($_SESSION['type'] == "ADMIN"){
                $isDriver = 0;
                $isAdmin = 1;
            }
            
            //Create new Database object and set query for inserting new record to online list table
            $db = new Database("INSERT INTO connected(username, isDriver, isAdmin) VALUES('".$callername."' , '".$isDriver."' , '".$isAdmin."')");
            
            //Perform query for inserting new record to online list table
            $db->performQuery();
            
            //Unset Database object
            unset($db);
            
            break;
            
            case "DelUser":
            
            $callername = $_SESSION['username'];
            
            $db = new Database("DELETE FROM connected WHERE username = '".$callername."'");
            
            $result=$db->performQuery();
            
            unset($db);
            
            break;
            
        }
        
	}

}

?>
