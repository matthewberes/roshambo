<?php

$mysqli = new mysqli("localhost","root","","roshambo");
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

if(isset($_POST["usersName"])){
	$username = $_POST["usersName"];
	$column = $_POST["columnName"];
	$output = '';
	$sql = 'UPDATE userdata SET '.$column.' = '.$column.' + 1 WHERE usersName = "'.$username.'" OR usersEmail = "'.$username.'"';
	$result = $mysqli -> query($sql);
	$mysqli -> close();
}