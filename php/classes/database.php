<?php

include 'user.php';

class Database{
	
	//Attributes
	private const SERVERNAME = "localhost";
	private const USERNAME = "root";
	private const PASSWORD = "";
	private const DBNAME = "taxijoin";
	
	private $conn;
	private $query;

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
