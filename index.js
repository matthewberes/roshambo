//Matt Beres, August 2022
//simple rock paper scissors web app

//will work with a mysql database named "roshambo" and a table named "userdata"
//11 columns in the table so far: int usersId, varchar usersName, varchar usersEmail, varchar usersPwd, varchar usersDate, int wins, int winsRock, int winsPaper, int winsScissors, int wins23, int wins35, 

//play rock paper scissors against a cpu, single game or a match
//generates a random number with a range of 0-2 and determines who won with a switch statement
//will give rewards for wins and keep track of winnings/losses and achievements across matches and across sessions

$(document).ready(function(){
	//initialize variables
	let playingThree = 0;
	let playingFive = 0;
	let playerWins = 0;
	let oppWins = 0;
	let succGame = 0;
	let disableShoot = 0;
	let loggedIn = 0;
	var globalUsername = "";
	document.getElementById("selectMove").value = "";
	document.getElementById("selectGame").value = "";

	//change user selection img
	document.getElementById("selectMove").onchange = function() {displayPicP()};
	function displayPicP(){
		var thePic = "img/" + document.getElementById("selectMove").value + ".png";
		document.getElementById("playerChoice").src = thePic;
	}

	//change opp selection img back to ?
	document.getElementById("selectMove").onclick = function() {displayPicC()};
	function displayPicC(){
		document.getElementById("cpuChoice").src = "img/question.png";
	}

	//roshambo
	document.getElementById("shoot").onclick = function() { roll()};
	function roll(){
		//3 = win, 2 = draw, 1 = loss
		var playerScore;
		cpuChoice =  Math.floor(Math.random() * 3);
		playerChoice = document.getElementById("selectMove").value;

		if (playerChoice == ""){
			return
		}
		if(disableShoot == 1){
			return
		}
		//show computers choice
		switch(cpuChoice){
			case 0:
				document.getElementById("cpuChoice").src = "img/rockOpp.png";
			break
			case 1:
				document.getElementById("cpuChoice").src = "img/paperOpp.png";
			break;
			case 2:
				document.getElementById("cpuChoice").src = "img/scissorsOpp.png";
			break;
		}
		//calculate win
		switch(playerChoice){
			case "Rock":
				switch(cpuChoice){
					case 0:
						playerScore = 2;
					break;

					case 1:
						playerScore = 1;
					break;
					
					case 2:
						playerScore = 3;
						//if logged in update winsRock
						if(loggedIn == 1){
							updateDb("winsRock");
						}
					break;
				}
			break;

			case "Paper":
				switch(cpuChoice){
					case 0:
						playerScore = 3;
						//if logged in update winsPaper
						if(loggedIn == 1){
							updateDb("winsPaper");	
						}				
					break;
					case 1:
						playerScore = 2;
					break;
					case 2:
						playerScore = 1;
					break;
				}
			break;

			case "Scissors":
				switch(cpuChoice){
					case 0:
						playerScore = 1;
					break;
					case 1:
						playerScore = 3;
						//if logged in update winsScissors
						if(loggedIn == 1){
							updateDb("winsScissors");	
						}					
					break;
					case 2:
						playerScore = 2;
					break;
				}
			break;	
		}
		resultFunction(playerScore);
	}

	//account cell

	//already have an account click
	document.getElementById("aha").onclick = function() {AHA()};
	function AHA(){
		document.getElementById("accountTitle").innerHTML = "Log in";
		var l = document.getElementById("logIn");
		var s = document.getElementById("signUp");

		l.style.display = "block";
		s.style.display = "none";
		removeError();
	}

	//don't have account click
	document.getElementById("dha").onclick = function() {DHA()};
	function DHA(){
		document.getElementById("accountTitle").innerHTML = "Sign up";
		document.getElementById("username").value = "";
		document.getElementById("email").value = "";
		document.getElementById("password").value = "";
		document.getElementById("passwordR").value = "";		
		var l = document.getElementById("logIn");
		var s = document.getElementById("signUp");

		l.style.display = "none";
		s.style.display = "block";
		removeError();
	}

	//sign up submit
	document.getElementById("suBut").onclick = function() {SU()};
	function SU(){
		var userName = document.getElementById("username").value;
		var userEmail = document.getElementById("email").value;
		var passWord = document.getElementById("password").value;
		var passWordR = document.getElementById("passwordR").value;

		if (passWordR !== passWord){
			document.getElementById("error").innerHTML = "Passwords don't match";
			document.getElementById("error").style.display = "block";
			return;
		}

		$.ajax({
			url: "php/signupAJAX.php",
			method: "post",
			data:{usersName: userName, usersEmail: userEmail, usersPwd: passWord, usersPwdR: passWordR},
			dataType: "text",
			success: function(data){
				$('#error').html(data);
				document.getElementById("error").style.display = "block";
			}
		});
	}

	//log in submit
	document.getElementById("liBut").onclick = function() {LI()};
	function LI(){
		//makes sure displays are for log out
		const but = document.getElementById("loBut");
		but.value = "Log out";
		document.getElementById("userSince").style.display = "block";

		var userName = document.getElementById("usernameL").value;
		var passWord = document.getElementById("passwordL").value;
		
		if(disableShoot == 1){
			return
		}		
		//updates logInTitle
		$.ajax({
			url: "php/loginAJAX.php",
			method: "post",
			data:{usersName: userName, usersPwd: passWord},
			dataType: "text",
			success: function(data){
				//log in title changes
				$('#accountTitle').html(data);
				document.getElementById("logIn").style.display = "none";
				document.getElementById("loggedIn").style.display = "block";
				loggedIn = document.getElementById("passValue").innerHTML;
				globalUsername = document.getElementById("usernameL").value;
				
				if(document.getElementById("passValue").innerHTML == 1){
					setStats(document.getElementById("usernameL").value);
					$.ajax({
						url: "php/dateAJAX.php",
						method: "post",
						data:{usersName: document.getElementById("usernameL").value},
						dataType: "text",
						success: function(data){
							$('#userSince').html(data);
						}
					});
				}
			}
		});
		//stats
		document.getElementById("statDefault").style.display = "none";
		document.getElementById("statLogged").style.display = "block";	
	}

	//log out button
	document.getElementById("loBut").onclick = function() {LO()};
	function LO(){
		if(disableShoot == 1){
			return
		}		
		document.getElementById("logIn").style.display = "block";
		document.getElementById("statDefault").style.display = "block";
		document.getElementById("loggedIn").style.display = "none";
		document.getElementById("statLogged").style.display = "none";
		document.getElementById("userSince").style.display = "none";
		document.getElementById("accountTitle").innerHTML = "Log in";
		document.getElementById("statsTable").innerHTML = "";
		document.getElementById("userSince").innerHTML = "";
		document.getElementById("passwordL").value = "";
		
		loggedIn = 0;
		globalUsername = "";
	}

	//remove error msgs
	document.getElementById("username").onclick = function() {removeError()};
	function removeError(){
		var e = document.getElementById("error");
		e.style.display = "none";
	}

	document.getElementById("usernameL").onclick = function() {removeError()};
	document.getElementById("password").onclick = function() {removeError()};
	document.getElementById("passwordL").onclick = function() {removeError()};
	document.getElementById("passwordR").onclick = function() {removeError()};
	document.getElementById("email").onclick = function() {removeError()};
	
	//play cell

	//play match
	document.getElementById("playBut").onclick = function() {PLAY()};
	function PLAY(){
		if(document.getElementById("selectGame").value == "three"){
			var pThree = document.getElementById("playThree");
			var pMenu = document.getElementById("playSelect");

			pMenu.style.display = "none";
			pThree.style.display = "block";
			playingThree = 1;
		}
		else if(document.getElementById("selectGame").value == "five"){
			var pFive = document.getElementById("playFive");
			var pMenu = document.getElementById("playSelect");

			pMenu.style.display = "none";
			pFive.style.display = "block";
			playingFive = 1;
		}
	}

	//go back to play menu div
	document.getElementById("replay").onclick = function() {AGAIN()};
	function AGAIN(){
		//reset ball colours for next game
		if(playingThree == 1){
			resetBalls(3);
			playingThree = 0;
		}
		if(playingFive == 1){
			resetBalls(5);
			playingFive = 0;
		}
		//re-initialize variables, divs, and title
		document.getElementById("playTitle").innerHTML = "Play";
		var pResult = document.getElementById("playResult");
		var pMenu = document.getElementById("playSelect");
		var pThree = document.getElementById("playThree");
		var pFive = document.getElementById("playFive");
		pResult.style.display = "none";
		pMenu.style.display = "block";
		pThree.style.display = "none";
		pFive.style.display = "none";
		playerWins = 0;
		oppWins = 0;
		succGame = 0;
		disableShoot = 0;
	}

	//track match wins
	function resultFunction(num){
		if(playingThree == 1){
			tallyThree(num);
		}if(playingFive == 1){
			tallyFive(num);
		}
		//if logged in update wins
		if(num == 3 && loggedIn == 1){
			updateDb("wins");		
		}
	}

	//tallys wins for best 2 of 3
	function tallyThree(num){
		if(num == 1){
			oppWins++;
			succGame++;
			colourBall(num);
		}if(num == 3){
			playerWins++;
			succGame++;
			colourBall(num);
		}
		if(playerWins == 2){
			whoWon(1);
			//if logged in update wins23
			if(loggedIn == 1){
				updateDb("wins23");
			}		
		}if(oppWins == 2){
			whoWon(2);
		}			
	}

	//tallys wins for best 3 of 5
	function tallyFive(num){
		if(num == 1){
			oppWins++;
			succGame++;
			colourBall(num);
		}if(num == 3){
			playerWins++;
			succGame++;
			colourBall(num);
		}
		if(playerWins == 3){
			whoWon(1);
			//if logged in update wins35
			if(loggedIn == 1){
				updateDb("wins35");				
			}				
		}if(oppWins == 3){
			whoWon(2);
		}		
	}

	//colours the balls to indicate wins and losses for the proper match type
	function colourBall(score){
		//if best 2 of 3
		if(playingThree == 1){
			switch(succGame){
				case 1:
				if(score == 1){
					document.getElementById("dot13").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot13").style.backgroundColor = "green";
				}
				break;
				case 2:
				if(score == 1){
					document.getElementById("dot23").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot23").style.backgroundColor = "green";
				}
				break;
				case 3:
				if(score == 1){
					document.getElementById("dot33").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot33").style.backgroundColor = "green";
				}
				break;			
			}			
		}
		//if best 3 of 5
		if(playingFive == 1){
			switch(succGame){
				case 1:
				if(score == 1){
					document.getElementById("dot15").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot15").style.backgroundColor = "green";
				}
				break;
				case 2:
				if(score == 1){
					document.getElementById("dot25").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot25").style.backgroundColor = "green";
				}
				break;
				case 3:
				if(score == 1){
					document.getElementById("dot35").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot35").style.backgroundColor = "green";
				}
				break;	
				case 4:
				if(score == 1){
					document.getElementById("dot45").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot45").style.backgroundColor = "green";
				}
				break;
				case 5:
				if(score == 1){
					document.getElementById("dot55").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot55").style.backgroundColor = "green";
				}
				break;	
			}		
		}
	}

	//switch to result div and update database(in future)
	function whoWon(num){
		disableShoot = 1;
		
		if(num == 1){
			document.getElementById("playTitle").innerHTML = "You won!";
			var pResult = document.getElementById("playResult");
			pResult.style.display = "block";
		}
		if(num == 2){
			document.getElementById("playTitle").innerHTML = "You lost!";
			var pResult = document.getElementById("playResult");
			pResult.style.display = "block";
		}
	}

	//reset balls to grey for next game
	function resetBalls(num){
		if(num == 3){
			document.getElementById("dot13").style.backgroundColor = "#bbb";
			document.getElementById("dot23").style.backgroundColor = "#bbb";
			document.getElementById("dot33").style.backgroundColor = "#bbb";
		}else if(num == 5){
			document.getElementById("dot15").style.backgroundColor = "#bbb";
			document.getElementById("dot25").style.backgroundColor = "#bbb";
			document.getElementById("dot35").style.backgroundColor = "#bbb";
			document.getElementById("dot45").style.backgroundColor = "#bbb";
			document.getElementById("dot55").style.backgroundColor = "#bbb";
		}
	}

	//change values in database
	function updateDb(column){
		$.ajax({
			url: "php/updateAJAX.php",
			method: "post",
			data:{usersName: globalUsername, columnName: column},
			dataType: "text",
			success: function(data){
				//update stats
				setStats(globalUsername);									
			}
		});
	}

	//set up stats table for ui
	function setStats(username){
		$.ajax({
			url: "php/statsAJAX.php",
			method: "post",
			data:{usersName: username},
			dataType: "text",
			success: function(data){
				$("#statsTable").html(data);
			}
		});
	}
});