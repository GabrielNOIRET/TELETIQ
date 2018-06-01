var styleFeatures = new ol.style.Style({
	fill: new ol.style.Fill({
	color: 'rgbA(255, 135, 15, 0.2)',
	}),
	stroke: new ol.style.Stroke({
		color: 'rgba(255, 255, 255, 1)',
		width: 1
	})
})

var styleFeaturesHover = new ol.style.Style({
	fill: new ol.style.Fill({
	color: 'rgbA(255, 135, 15, 0.4)',
	}),
	stroke: new ol.style.Stroke({
		color: 'rgba(255, 255, 255, 0.5)',
		width: 2
	})
})

var styleFeaturesSelected = new ol.style.Style({
	fill: new ol.style.Fill({
	color: 'rgbA(255, 135, 15, 0.5)',
	}),
	stroke: new ol.style.Stroke({
		color: 'rgba(255, 255, 255, 0)',
		width: 1
	})
})


var PNR = new ol.layer.Vector({
	source: new ol.source.Vector({
		url:'couches/PNR.geojson',
		format: new ol.format.GeoJSON()
	}),
	style: styleFeatures})
var regions = new ol.layer.Vector({
	source: new ol.source.Vector({
		url:'couches/regions.geojson',
		format: new ol.format.GeoJSON()
	}),
	style: styleFeatures})
var departements = new ol.layer.Vector({
	source: new ol.source.Vector({
	url:'couches/departements.geojson',
	format: new ol.format.GeoJSON()
	}),
	style: styleFeatures });



var bingMapsAerial = new ol.layer.Tile({
	preload: Infinity,
	source: new ol.source.BingMaps({
	  key: 'AgszpA_SgN7fc7AoY6ULVmZ88kcA1BTsI_OaocFssZ4aYh2ZF9Gw2bmAKwMGLJ0y',
	  imagerySet: 'Aerial',
	})});





//Couches de la cartes
var layers = [bingMapsAerial];

//Paramètre de la carte 
var view = new ol.View({
		    center: ol.proj.fromLonLat([4.761058, 45.465969]),
		    zoom: 7.5
		    });

//1 La carte
var map = new ol.Map({
	layers: layers, 
	target: 'map',
	view: view
});






//---------------------------------------
//controle 

$("#regions").change(function(){
    if(this.checked){
	map.addLayer(regions)
	changeInteraction();

    } else {
	map.removeLayer(regions)
    }
    });

$("#departements").change(function(){
    if(this.checked){
	map.addLayer(departements)
	changeInteraction();

    } else {
	map.removeLayer(departements)
    }
    });
$("#PNR").change(function(){
    if(this.checked){
	map.addLayer(PNR)
	changeInteraction();

    } else {
	map.removeLayer(PNR)
    }
    });


var selectFeatures = []
function constructionQuery(){
	elementSeleted = []
	document.getElementById('info').innerHTML = '';
	QUERY = ''
	for (var i = selectFeatures.length - 1; i >= 0; i--) {
		//Type De Géometry
		console.log(selectFeatures)
		if (selectFeatures[i].get('CODE_DEPT')){
			var CODE = 'CODE_DEPT'
		}
		else if (selectFeatures[i].get('CODE_REG')){
			var CODE = 'CODE_REG'
		}
		else if (selectFeatures[i].get('ID_MNHN')){
			var CODE = 'ID_MNHN'
		}
		else {
			console.log("autre");
		}


		document.getElementById('info').innerHTML += CODE + ': ' + selectFeatures[i].get(CODE) + '<br>';


		var ol3Geom = selectFeatures[i].getGeometry();
		var format = new ol.format.WKT();
		var wktRepresenation  = format.writeGeometry(ol3Geom);
		// console.log(wktRepresenation)

			
		elementSeleted.push(selectFeatures[i].get(CODE))



	}	

	elementSeleted.sort();
	for (var i = 0; i < elementSeleted.length; i++) {
		QUERY += CODE + elementSeleted[i] +'_';

		}
};
function removeDeselected(arr) {
		var what, a = arguments, L = a.length, ax;
		while (L > 1 && arr.length) {
			what = a[--L];
			while ((ax= arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
			}
		}
		return arr;}


var changeInteraction = function() {
	var select =  new ol.interaction.Select({
		style : styleFeaturesSelected
		});
	var selectPointerMove = new ol.interaction.Select({
		condition: ol.events.condition.pointerMove,
		style : styleFeaturesHover,});


	map.addInteraction(select);
	map.addInteraction(selectPointerMove);


	select.on('select', function(select) {
		for (var i = select.selected.length - 1; i >= 0; i--) {
			selectFeatures.push(select.selected[i])
		}
		
		for (var i = select.deselected.length - 1; i >= 0; i--) {
			removeDeselected(selectFeatures, select.deselected[i])
		}


		
	removeDeselected();
	constructionQuery();

	});






	$("#pagewiki_button").click(function(){
			$.ajax({
				url: 'sendquery.php',
				data: 'QUERY='+ QUERY,
				success: function(reponse) {
					alert(reponse); // reponse contient l'affichage du fichier PHP (soit echo)
			  	}
			});})

}





