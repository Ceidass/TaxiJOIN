<?php

//Checks Username Availability

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "taxijoin";

//Create database
$conn = mysqli_connect($servername, $username, $password, $dbname);

//Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//Select database
//mysqli_select_db($conn, "taxijoin");
$usr = strtolower($_GET['usr']);
$quest = "SELECT username FROM users";
$result = mysqli_query($conn, $quest);


while($row = mysqli_fetch_assoc($result))
    $temp[] = $row;

$user = new \stdClass();

foreach($temp as $value){
    if($value['username'] != $usr){
        $user->exists = false;
    }else{
        $user->exists = true;
        break;
    }
}

$check = json_encode($user);

echo $check;

mysqli_close($conn);

?>
