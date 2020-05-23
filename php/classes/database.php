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
        
        switch($act){
            
            case "usernameCheck":
                
                $callername = strtolower($_POST['usr']);
                
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
                
                
                unset($callername);
                
                echo $check;
                
                break;
                
            case "SignUp":
                
                $callername = strtolower($_POST['username']);
                
                $password = $_POST['password'];
                
                $$callername = new Database("INSERT INTO users(username, password) VALUES('".$callername."','".$password."')");
                
                $result = $$callername->performQuery();
                
                if(!$result){
                    echo "Failed creating account 1";
                    break;
                }
                
                $$callername->setQuery("CREATE TABLE ".$callername."(friend VARCHAR(100))");
                
                $result = $$callername->performQuery();
                
                if(!$result){
                    echo "Failed creating account 2";
                    $$callername->setQuery("DELETE FROM users WHERE 'username'='".$callername."'");
                    
                }
                
                unset($callername);
                
                break;
            
        }
        
	}

	function __construct($query){
    
        $this->conn = new mysqli(self::SERVERNAME , self::USERNAME , self::PASSWORD , self::DBNAME);
        ($this->conn)->select_db("taxijoin");
        $this->query = $query;
        
	}
	
	
	function __destruct(){
		
		($this->conn)->close();
		
	}
	
	public function setQuery($query){
        
        $this->query = $query;
        
	}
	
	public function performQuery(){
        
        $res = ($this->conn)->query($this->query);
        
        return $res;
	}
	
}

?>
