<?php

class Database{
	
	//Attributes
	private const SERVERNAME = "localhost";
	private const USERNAME = "root";
	private const PASSWORD = "";
	private const DBNAME = "taxijoin";
	
	private $conn;
	private $query;
	
	public static function action($act){
        
        $callername = strtolower($_GET['usr']);
        
        switch($act){
            
            case "usernameCheck":
            
                $$callername = new Database("SELECT username FROM users");
                $result = $$callername->performQuery();
                
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
                
                echo $check;
                
                unset($$callername)
                break;
            
        }
        
	}

	function __construct($query){
    
        $this->conn = new mysqli(SERVERNAME , USERNAME , PASSWORD , DBNAME);;
        $this->query = $query;
        
	}
	
	
	function __destruct(){
		
		($this->conn)->close();
		
	}
	
	public function performQuery(){
        
        $res = ($this->conn)->query($query);
        
        return res;
	}
	
	
}

>
