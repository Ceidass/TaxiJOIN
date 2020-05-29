<?php 

class Startpage{


    function __construct(){
    }
    
    function __destruct(){
    }
    
    public function headerPage(){
        
        header('Location:../start.html');
        exit;
    }
}

?>
