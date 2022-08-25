<?php

$conn = mysqli_connect("localhost", "root", "", "roshambo");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

//signup functions
function emptyInput($username, $email, $password, $passwordR){
	$result;
	if (empty($username) || empty($email) || empty($password) || empty($passwordR)){
		$result = true;
	}
	else{
		$result = false;
	}
	return $result;
}

function invalidUsername($username){
	$result;
	if (!preg_match("/^[a-zA-Z0-9]*$/", $username)){
		$result = true;
	}
	else{
		$result = false;
	}
	return $result;
}

function invalidEmail($email){
	$result;
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$result = true;
	}
	else{
		$result = false;
	}
	return $result;
}

function usernameExists($conn, $username){
	$sql = "SELECT * FROM userdata WHERE usersName = ?";
	$stmt = mysqli_stmt_init($conn);

	if (!mysqli_stmt_prepare($stmt, $sql)) {
		//prepare failed
	}

	mysqli_stmt_bind_param($stmt, "s", $username);
	mysqli_stmt_execute($stmt);

	$resultData = mysqli_stmt_get_result($stmt);

	if ($row = mysqli_fetch_assoc($resultData)){
		return $row;
	}
	else{
		$result = false;
		return $result;
	}
	mysqli_stmt_close($stmt);
}

function emailExists($conn, $email){
	$sql = "SELECT * FROM userdata WHERE usersEmail = ?";
	$stmt = mysqli_stmt_init($conn);

	if (!mysqli_stmt_prepare($stmt, $sql)) {
		//prepare failed
	}

	mysqli_stmt_bind_param($stmt, "s", $email);
	mysqli_stmt_execute($stmt);

	$resultData = mysqli_stmt_get_result($stmt);

	if ($row = mysqli_fetch_assoc($resultData)){
		return $row;
	}
	else{
		$result = false;
		return $result;
	}
	mysqli_stmt_close($stmt);
}

function createUser($conn, $username, $email, $password){
	$sql = "INSERT INTO userdata (usersName, usersEmail, usersPwd, usersDate) VALUES (?, ?, ?, ?);";
	$stmt = mysqli_stmt_init($conn);
	$hashedPwd = password_hash($password, PASSWORD_DEFAULT);

	date_default_timezone_set('America/Toronto');
	$date = date("F j, Y, g:i a");

	if (!mysqli_stmt_prepare($stmt, $sql)) {
		//prepare failed
	}
	mysqli_stmt_bind_param($stmt, "ssss", $username, $email, $hashedPwd, $date);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
}