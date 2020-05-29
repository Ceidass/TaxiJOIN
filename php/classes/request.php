<?php

require_once('database.php');
require_once('startpage.php');

class Request{

    function __construct(){
    }
    
    function __destruct(){
    }
    
    public function searchNearStart($startPoint){
        
        //Create new Database object
        $db = new Database("SELECT FROM requests WHERE startlat='".$startPoint[0]."' AND startlong='".$startPoint[1]."'");
        
        //Perform query and save result to $res
        $res = $db->performQuery();
        
        //Unset db object
        unset($db);
        
        return $res;
        
    }

}


?>
