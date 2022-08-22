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
			<td>
				<img style="width: 100%" src="img/testingimage.jpg"border=3/>
			</td>
			<td>
				<img style="width: 100%" src="img/testingimage.jpg"border=3/>
			</td>
			<td>
				<img style="width: 100%" src="img/testingimage.jpg"border=3/>
			</td>
		</tr>
	</table>
</div>

</body>
</html>