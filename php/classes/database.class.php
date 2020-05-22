<?php

class Database{
	
	
	//Δημιουργία σύνδεσης
	public static function openConn(){
		
		$conn = new mysqli("localhost" , "root" , "" , "taxijoin");
		
		
	}
	
	public static function closeConn(){
		
		$conn->close();
		
	}
	
	
}

>