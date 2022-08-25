<?php

$connect = mysqli_connect("localhost", "root", "", "roshambo");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if (isset($_POST['usersName'])){
	$username = $_POST['usersName'];
	$email = $_POST['usersEmail'];
	$password = $_POST['usersPwd'];
	$passwordR = $_POST['usersPwdR'];
	$errorInput = false;
	$errorUsername = false;
	$errorEmail = false;
	$errorTakenU = false;
	$errorTakenE = false;
	$output = "";

	require_once 'functions.php';

	if (emptyInput($username, $email, $password, $passwordR) !== false) {
		$errorInput = true;
		$output .= '<p>Empty input</p>';
		echo $output;
		return;
	}

	if (invalidUsername($username) !== false) {
		$errorUsername = true;
		$output .= 'Username is invalid';
		echo $output;
		return;
	}

	if (invalidEmail($email) !== false) {
		$errorEmail = true;
		$output .= 'Email is invalid';
		echo $output;
		return;
	}

	if (usernameExists($connect, $username) !== false) {
		$errorTakenU = true;
		$output .= 'Username is taken';
		echo $output;
		return;
	}

	if (emailExists($connect, $email) !== false) {
		$errorTakenE = true;
		$output .= 'Email is taken';
		echo $output;
		return;
	}

	createUser($connect, $username, $email, $password);
	echo $output;
}
else {
	exit();
}
?>
<script>
	var errorInput = <?php echo $errorInput ? 'true' : 'false';?>;
	var errorUsername = <?php echo $errorUsername ? 'true' : 'false';?>;
	var errorEmail = <?php echo $errorEmail ? 'true' : 'false';?>;
	var errorTakenU = <?php echo $errorTakenU ? 'true' : 'false';?>;
	var errorTakenE = <?php echo $errorTakenE ? 'true' : 'false';?>;

	if (errorInput !== true && errorUsername !== true && errorEmail !== true && errorTakenU !== true && errorTakenE !== true) {
		document.getElementById("logIn").style.display = "block";
		document.getElementById("signUp").style.display = "none";
		document.getElementById("accountTitle").innerHTML = "Log in";
	}	
</script>