<?php

include 'classes/main.php';

if(isset($_POST['action'])){
   Main::action($_POST['action']);
}


?>
