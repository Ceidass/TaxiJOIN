<?php

include 'classes/database.php';

if(isset($_POST['action'])){
  
    Database::action($_POST['action']);

}


?>
