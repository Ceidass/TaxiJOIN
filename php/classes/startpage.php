<?php 

require_once('request.php');

class Startpage{

    private $startPoint;
    private $endPoint;

    function __construct(){
    }
    
    function __destruct(){
    }
    
    public function selectStartPoint($startLat,$startLong){
        
        //Setting startPoint attribute
        $this->startPoint[0] = $startLat;
        $this->startPoint[1] = $startLong;
        
        //Create Request object
        $rq = new Request();
        
        //Call Request method to search for available requests in area
        $rq->searchNearStart($this->startPoint);
        
        //Unset rq object
        unset($rq);
    }
    
    public function selectEndPoint(){
        
        //Setting endPoint attribute
        $this->endPoint = $endPoint;
        
        //Create Request object
        $rq = new Request();
        
        
        
    }
    
    public function displayPrompt($message){
        
        //Create new stdClass object to save result,encode it in JSON form and send in to client
        $result = new \stdClass();
        
        //Set message attribute
        $result->message = $message;
        //set check attribute
        $result->check = true;
        
        //Echo back to client in JSON form
        echo json_encode($result);
        
    }
    
    public function displayError($message){
        
        //Create new stdClass object to save result,encode it in JSON form and send in to client
        $result = new \stdClass();
        
        //Set message attribute
        $result->message = $message;
        //set check attribute
        $result->check = false;
        
        //Echo back to client in JSON form
        echo json_encode($result);
    }
    
    public function headerPage(){
        
        header('Location:../start.html');
        exit;
    }
}

?>
