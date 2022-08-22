//Matt Beres, August 2022
//simple rock paper scissors web app

//will work with a mysql database named "roshambo" and a table named "userdata"
//6 columns in the table so far: int usersId, varchar usersName, varchar usersEmail, varchar usersPwd, int usersBal, varchar usersDate

//play rock paper scissors against a cpu
//generates a random number with a range of 0-2 and determines who won with a switch statement
//will give rewards for wins and keep track of winnings/losses and achievements

$(document).ready(function(){
	//initialize variables
	let playingThree = 0;
	let playingFive = 0;
	let playerWins = 0;
	let oppWins = 0;
	let succGame = 0;
	let disableShoot = 0;
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
					break;
				}
			break;

			case "Paper":
				switch(cpuChoice){
					case 0:
						playerScore = 3;
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
	}

	//don't have account click
	document.getElementById("dha").onclick = function() {DHA()};
	function DHA(){
		document.getElementById("accountTitle").innerHTML = "Sign up";
		var l = document.getElementById("logIn");
		var s = document.getElementById("signUp");

		l.style.display = "none";
		s.style.display = "block";
	}

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
		if (playingThree == 1){
			resetBalls(3);
			playingThree = 0;
		}
		if (playingFive == 1){
			resetBalls(5);
			playingFive = 0;
		}

		//re-initialize variables, divs, and title
		playerWins = 0;
		oppWins = 0;
		succGame = 0;
		disableShoot = 0;
		var pResult = document.getElementById("playResult");
		var pMenu = document.getElementById("playSelect");
		var pThree = document.getElementById("playThree");
		var pFive = document.getElementById("playFive");

		pResult.style.display = "none";
		pMenu.style.display = "block";
		pThree.style.display = "none";
		pFive.style.display = "none";
		document.getElementById("playTitle").innerHTML = "Play";
	}

	//track match wins
	function resultFunction(num){
		if(playingThree == 1){
			tallyThree(num);
		}
		else if (playingFive == 1){
			tallyFive(num);
		}
	}

	//tallys wins for best 2 of 3
	function tallyThree(num){
		if(num == 1){
			oppWins++;
			succGame++;
			colourBall(num);
		}
		else if(num == 3){
			playerWins++;
			succGame++;
			colourBall(num);
		}
	}

	//tallys wins for best 3 of 5
	function tallyFive(num){
		if(num == 1){
			oppWins++;
			succGame++;
			colourBall(num);
		}
		else if(num == 3){
			playerWins++;
			succGame++;
			colourBall(num);
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
				if(playerWins == 2){
					whoWon(1,3);
				}else if(oppWins == 2){
					whoWon(2,3);
				}
				break;
				case 3:
				if(score == 1){
					document.getElementById("dot33").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot33").style.backgroundColor = "green";
				}
				if(playerWins == 2,3){
					whoWon(1,3);
				}else if(oppWins == 2){
					whoWon(2,3);
				}
				break;			
			}			
		}
		//if best 3 of 5
		else if(playingFive == 1){
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
				if(playerWins == 3){
					whoWon(1,5);
				}else if(oppWins == 3){
					whoWon(2,5);
				}
				break;	
				case 4:
				if(score == 1){
					document.getElementById("dot45").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot45").style.backgroundColor = "green";
				}
				if(playerWins == 3){
					whoWon(1,5);
				}else if(oppWins == 3){
					whoWon(2,5);
				}
				break;
				case 5:
				if(score == 1){
					document.getElementById("dot55").style.backgroundColor = "red";
				}else if(score == 3){
					document.getElementById("dot55").style.backgroundColor = "green";
				}
				if(playerWins == 3){
					whoWon(1,5);
				}else if(oppWins == 3){
					whoWon(2,5);
				}
				break;	
			}		
		}
	}

	//switch to result div and update database(in future)
	function whoWon(num, mode){
		disableShoot = 1;
		
		if(num == 1){
			document.getElementById("playTitle").innerHTML = "You won!";
			var pResult = document.getElementById("playResult");
			pResult.style.display = "block";
		}
		else if(num == 2){
			document.getElementById("playTitle").innerHTML = "You lost!";
			var pResult = document.getElementById("playResult");
			pResult.style.display = "block";
		}

		if(mode == 3){//if win three
		}else if(mode == 5){//if win five
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
});