<?php 

require_once('request.php');

class Startpage{

    private $startPoint;
    
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
    
    public function inputAttrs($startLat, $startLong, $endLat, $endLong, $participants, $time){
        
        //Create Request object
        $rq = new Request();
        
        //Set Request object attributes
        $rq->setAttrs($startLat, $startLong, $endLat, $endLong, $participants, $time);
        
        //Save Request to database
        $rq->saveReq();
        
        //Unset rq object
        unset($rq);
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
    
    public function cancel(){
        
        //Create new request object
        $rq = new Request();
        
        //Delete reqs with $_SESSION['username'] as a creator
        $result = $rq->deleteReq($_SESSION['username']);
        
        unset($rq);
        
        return $result;
    }
    
    public function initialPage($check){
        
        if($check)
            echo "ok";
        else
            echo "fail";
        
    }
    
    public function madDisplay($result){
        
        if($result == false){
            echo "false";
        }elseif($result->num_rows > 0){
            
            //Create an associative array for every request found
            while($req = $result->fetch_assoc)
            
            //Echo $req in json form
            echo json_encode($req);
        }
        
    }
    
    public function headerPage(){
        
        header('Location:../start.html');
        exit;
    }
}

?>
