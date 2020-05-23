<?php

include 'classes/database.php';

if(isset($_GET['action'])){
  
    Database::action($_GET['action']);

}


?>
