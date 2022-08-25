<?php

$connect = mysqli_connect("localhost", "root", "", "roshambo");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
require_once 'functions.php';

if(isset($_POST["usersName"])){
	$username = $_POST["usersName"];
	$password = $_POST['usersPwd'];
	$output = '';
	$errorLogin = false;
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
			$hashedPwd = $row['usersPwd'];
			$checkPwd = password_verify($password, $hashedPwd);

			if($checkPwd == true){
				$output .= '<h2>'.$row['usersName'].'</h2>';
			}
			elseif ($checkPwd == false){
				$output .= '<h2>Log in FAILED</h2>';
				$errorLogin = true;
			}
		}
		echo $output;
	}
	else{
		$output .= '<h2>Log in FAILED</h2>';
		$errorLogin = true;
		echo $output;
	}
	mysqli_stmt_close($stmt);
}
?>
<script>
	var errorLogin = <?php echo $errorLogin ? 'true' : 'false';?>;
	if (errorLogin == true){
		document.getElementById("userSince").style.display = "none";
		document.getElementById('loBut').value = "Try again";
		document.getElementById("passValue").innerHTML = "0";
	}
	else{
		document.getElementById("passValue").innerHTML = "1";
	}
</script>