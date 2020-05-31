<?php

session_start();

require_once('database.php');
require_once('startpage.php');


class Request{

    private $creator;
    private $startlat;
    private $startlong;
    private $endlat;
    private $endlong;
    private $participants;
    private $time;

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
    
    public function setAttrs($startlat, $startlong, $endlat, $endlong, $participants, $time){
        
        $this->creator = $_SESSION['username'];
        $this->startlat = $startlat;
        $this->startlong = $startlong;
        $this->endlat = $endlat;
        $this->endlong = $endlong;
        $this->participants = $participants;
        $this->time = $time;
        
    }
    
    public function saveReq(){
        
        //Create new Database object
        $db = new Database("INSERT INTO requests(creator,startlat,startlong,endlat,endlong,participants) VALUES('".$this->creator."','".$this->startlat."','".$this->startlong."','".$this->endlat."','".$this->endlong."','".$this->participants."')");
        
        $res = $db->performQuery();

        unset($db);
    }

}


?>
