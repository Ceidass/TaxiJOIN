<?PHP

include 'main.php';

class User{
    
    
    private $session; //Variable which keeps logged in user's information
    
    function __construct(){
        
    }
    
    function __destruct(){
        
    }
    
    public function sesStart($username){
        //Create session
        session_start();
        
        //Set session username
        $_SESSION['username'] = $username;
        
        //Set session type
        $_SESSION['type'] = "USER";
    }
    
    public function sesStop(){
        
        //Unset elements of $_SESSION superglobal
        session_unset();
        
        //Destroy user's session
        session_destroy();
        
    }
    
    public function setSess(){
        
        //Set session attribute as the superglobal $_SESSION
        $this->session = $_SESSION;
        
    }
    
    public function userAdd(){
        
        //Add user to online list
        Main::action('AddUser');
        
    }
    
    public function userDelete(){
        
        //Delete user from online list
        Main::action('DelUser');
    }
}


?>
