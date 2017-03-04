<?php 
if($_SERVER['REMOTE_ADDR'] == "localhost" || $_SERVER['REMOTE_ADDR'] == "::1" ){
    $password = "";
}else{
	$password = "Cpdvgs@2016";
}

$db = "4glive";
$host = "localhost"; 
$username = "root"; 
$conn = new PDO( "mysql:host=$host;dbname=$db", "$username", "$password");
$conn->exec("SET NAMES 'utf8'");
?>