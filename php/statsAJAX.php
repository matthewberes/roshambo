<?php

$connect = mysqli_connect("localhost", "root", "", "roshambo");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if(isset($_POST["usersName"])){
	$username = $_POST["usersName"];
	$output = '';
	$sql = "SELECT * FROM userdata WHERE usersName = ? OR usersEmail = ?";
	$stmt = mysqli_stmt_init($connect);

	if (!mysqli_stmt_prepare($stmt, $sql)) {
		//prepare failed
	}

	mysqli_stmt_bind_param($stmt, "ss", $username, $username);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			$output .= '<p>Wins: '.$row['wins'].'<br>R wins: '.$row['winsRock'].'<br>P wins: '.$row['winsPaper'].'<br>S wins: '.$row['winsScissors'].'<br>2/3 wins: '.$row['wins23'].'<br>3/5 wins: '.$row['wins35'].'</p>';
		}
		echo $output;
	}
	else{
		$errorLogin = true;
		$output .= '';
		echo $output;
	}
	mysqli_stmt_close($stmt);
}