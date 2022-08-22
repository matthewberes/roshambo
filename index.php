<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" type="text/css" href="index.css" media="screen"/>
<script src="js/jquery-3.1.1.js"></script>
<script src="index.js"></script>
<title>Rock, Paper, Scissors</title>

<body>
<div id="title">
	<h1>Rock Paper Scissors</h1>
</div>

<div id="tableShit">
	<table width="100%" border = 2>
		<tr>
			<td>
				<img style="width: 100%" id="playerChoice"src="img/question.png"/>
			</td>
			<td>
				<p>Make your pick.</p>
				<select class="selectList" id="selectMove" style="width: 75px; margin-bottom: 12px;">
					<option value="" disabled selected>Select...</option>
				    <option value="Rock">Rock</option>
				    <option value="Paper">Paper</option>
				    <option value="Scissors">Scissors</option>
			    </select>
			    <br>
			    <input type="button" id="shoot" value="Shoot!"/>
			</td>
			<td>
				<img style="width: 100%" id="cpuChoice" src="img/question.png"/>
			</td>
		</tr>
		<tr>
			<td id="account" valign = top>
				<h2 id="accountTitle" style="margin-top: 8px; margin-bottom: 8px">Sign up</h2>
				<div id ="signUp" style="display: block">
					<form>
						<input type="text" placeholder="username..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="text" placeholder="email..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="password" placeholder="password..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="password" placeholder="repeat password..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="button" value="Submit"/>
					</form>
					<p id="aha" style="text-decoration: underline; margin-top: 4px; margin-bottom: 8px">Already have an account? Log in.</p>
				</div>
				<div id="logIn" style="display: none">
					<form>
						<input type="text" placeholder="username/email..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="password" placeholder="password..." style="width: 115px;  margin-bottom: 8px"/><br>
						<input type="button" value="Log in"/>
					</form>
					<p id="dha" style="text-decoration: underline; margin-top: 4px; color: blue">Don't have an account? Sign up.</p>
				</div>
				<div id="loggedIn" style="display: none">
					<form>
						<input type="button" value="hello"/>
					</form>
				</div>
			</td>
			<td id ="playCell" valign="top">
				<h2 id="playTitle" style="margin-top: 8px; margin-bottom: 8px">Play</h2>
				<div id="playSelect" style="display: block">
					<label>Game type:</label><br>
					<select class="gameList" id="selectGame" style="width: 75px; margin-bottom: 8px;">
					<option value="" disabled selected>Select...</option>
				    <option value="three">2/3</option>
				    <option value="five">3/5</option>
			    </select><br>
			    <input type="button" id="playBut" name="playBut" value="Play!"/>
				</div>
				<div id="playThree" style="display: none">
					<span id="dot13" class="dot"></span>
					<span id="dot23" class="dot"></span>
					<span id="dot33" class="dot"></span>
				</div>
				<div id="playFive" style="display: none">
					<span id="dot15" class="dot"></span>
					<span id="dot25" class="dot"></span>
					<span id="dot35" class="dot"></span>
					<span id="dot45" class="dot"></span>
					<span id="dot55" class="dot"></span>
				</div>
				<div id="playResult" style="display: none">
					<input type="button" id="replay" name="replay" value="Play again">
				</div>
			</td>
			<td id="stats" valign="top">
				<h2 style="margin-top: 8px; margin-bottom: 8px">Statistics</h2>
				<div id="statDefault" style="display: block">
					<p>Log in to track your wins and achievements across sessions!</p>
				</div>
				<div id="statLogged" style="display: none">
					<p></p>
				</div>
			</td>
		</tr>
	</table>
</div>

</body>
</html>