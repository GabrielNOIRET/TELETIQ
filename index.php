<!DOCTYPE html>
<html>


	<head>
		<title>Carte OL Fait</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
	    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
	    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
	    <script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
	    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
	</head>



	<body>
		<header>
			<img id="logo" src="IMG/logo.png">
			<h1>Carte des conditions favorables à <br>l'abondance de la tique Ixodes richinus</h1>
		</header>
		


		<div id="main">
			<div id="map"></div>


			<div id="controle">
						<p>Query:</p>
						<p>ip/</p><strong><div id="info"></div></strong><br>

						<input type="checkbox" name="fond" id="regions">Régions</input><br>
						<input type="checkbox" name="fond" id="departements" >Départements</input>
						<br>
						<input type="checkbox" name="fond" id="PNR" >PNR</input>
						<br>
						<br>
						<input type="checkbox" name="fond" id="bbox" >Bounding box</input>
						<br>
						<br>

						<button id="pagewiki_button">Chercher page WIKI </button>


				


			</div>
		</div>

		<footer>
			<p></p>
		</footer>

			    <script type="text/javascript" src="map.js"></script>
	</body>









</html>