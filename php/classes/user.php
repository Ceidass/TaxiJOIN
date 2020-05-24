<?PHP

class User{
    
    
    private $session; //Variable which keeps logged in user's information
    
    public static $usersList; //Array which keeps logged in users
    
    function __construct($username){
        //Create session
        session_start();
        
        //Set session username
        $_SESSION['username'] = $username;
        
        //Set session attribute as the superglobal $_SESSION
        $this->session = $_SESSION;
        
        //Add this User object to $usersList array
        $this->userAdd();
        
    }
    
    function __destruct(){
        
        //Delete this user object from $usersList array
        $this->userDelete();
        
        //Unset elements of $_SESSION superglobal
        session_unset();
        
        //Destroy users session
        session_destroy();
        
    
    }
    
    public function userAdd(){
        
        //Add calling User object to $usersList array
        self::$usersList[$this->session['username']]=$this;
        
    }
    
    public function userDelete(){
        
        //Delete calling User object to $usersList array
        unset(self::$usersList[$this->session['username']]);
        
    }
}


?>
