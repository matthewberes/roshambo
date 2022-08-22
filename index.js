$(document).ready(function(){

	document.getElementById("selectMove").onchange = function() {displayPicP()};
	function displayPicP(){
		var thePic = "img/" + document.getElementById("selectMove").value + ".png";
		document.getElementById("playerChoice").src = thePic;
	}

	document.getElementById("selectMove").onclick = function() {displayPicC()};
	function displayPicC(){
		document.getElementById("cpuChoice").src = "img/question.png";
		console.log("IM RUNINNNN")
	}


	document.getElementById("shoot").onclick = function() { roll()};
	function roll(){
		//3 = win, 2 = draw, 1 = loss
		var playerScore;

		cpuChoice =  Math.floor(Math.random() * 3);
		playerChoice = document.getElementById("selectMove").value;

		if (playerChoice == ""){
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

		switch(playerScore){
			case 1:
				alert("you lost");
			break;
			case 2:
				alert("draw");
			break;
			case 3:
				alert("you won");
			break;	
		}
	}
});