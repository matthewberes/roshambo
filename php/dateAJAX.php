<?php

$connect = mysqli_connect("localhost", "root", "", "roshambo");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if(isset($_POST["usersName"])){
	$username = $_POST["usersName"];
	$output = '';
	$sql = "SELECT * FROM userdata WHERE usersName = ? or usersEmail = ?";
	$stmt = mysqli_stmt_init($connect);

	if (!mysqli_stmt_prepare($stmt, $sql)) {
		//prepare failed
	}

	mysqli_stmt_bind_param($stmt, "ss", $username, $username);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			$output .= '<p>User since: '.$row['usersDate'].'</p>';
		}
		echo $output;
	}
	else{
		$output .= '';
		echo $output;
	}
	mysqli_stmt_close($stmt);
}