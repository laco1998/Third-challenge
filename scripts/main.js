/*----------------------------------------------------------------------------------------*/



var button1 = document.getElementById("showWeather");

button1.onclick = function getAPIdata() {
	var cityName = document.getElementById('name').value;
	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='707e15f2155a04f513d38a1808e40b43';

	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + cityName;
	
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onAPISucces(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	/*var des = response.weather[0].description;*/
	var wind = response.wind.speed;
	var cloud = response.clouds.all;
	var press = response.main.pressure;

	var iconCode = response.weather[0].icon;
	var iconurl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
	var icon = document.getElementById('weatherIcon');
	icon.src = iconurl; 

	var deg = Math.floor(response.main.temp - 273.15);
	/*var degFeel = Math.floor(response.main.feels_like - 273.15);*/
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = "Temperature: " + deg + '&#176;C <br>' + 'Wind speed: ' + wind + ' m/s <br>' + "Pressure: " + press + 'hPa';
	weatherBox.style.lineHeight = "2";
}


function onAPIError(error) {
	alert('Invalid location', error);
}

/*getAPIdata();*/



/*--------------------------------------------------------------------------------------------------------*/




function getAPIdata2() {
	var url = 'http://api.open-notify.org/iss-now.json';

	var request = url;
	
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onAPI2Succes(response);	
	})
	
	.catch(function (error) {
		onAPI2Error(error);
	});
}

function onAPI2Succes(response) {
	var lat = response.iss_position.latitude; 
	var long = response.iss_position.longitude; 

	var issBox = document.getElementById('issPosition');
	issBox.innerHTML = "LAT: " + lat + "<br><br>" + "LONG: " + long 

}


function onAPI2Error(error) {
	
}

getAPIdata2();
setInterval(getAPIdata2, 5000);



/*-----------------------------------------------------------------------------------------*/



mapboxgl.accessToken = "pk.eyJ1IjoibGFjbzE5OTgiLCJhIjoiY2tiZjZuaG9xMHNtNDJ0cDhuczNvaWpvZiJ9.Oy-HB2guTixJNrQbRoO10w";

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-25, 37.8],
  zoom: 1
});

map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
);


map.addControl(new mapboxgl.FullscreenControl());

map.addControl(new mapboxgl.NavigationControl());


/*------------------------------------------------------------------------------------------------------*/

var button2 = document.getElementById("drinkButton");

button2.onclick = function getAPIdata3() {
	var drinkName = document.getElementById("drinkInput").value;
	var url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

	var request = url + drinkName;
	
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onAPI3Succes(response);	
	})
	
	.catch(function (error) {
		onAPI3Error(error);
	});
}

function onAPI3Succes(response) {
	var drinkDes = response.drinks[0].strInstructions;
	var ingredient1 = response.drinks[0].strIngredient1;
	var ingredient2 = response.drinks[0].strIngredient2;
	var ingredient3 = response.drinks[0].strIngredient3;
	var ingredient4 = response.drinks[0].strIngredient4;		

	var drinkBox = document.getElementById('drinkInfo');
	drinkBox.innerHTML = "Ingredients: " + ingredient1 + ", " + ingredient2 + ", " + ingredient3 + ", " + ingredient4 + "<br><br>" + "Recipe: " + drinkDes;

	if (ingredient4 == null) {
		drinkBox.innerHTML = "Ingredients: " + ingredient1 + ", " + ingredient2 + ", " + ingredient3 + "<br><br>" + "Recipe: " + drinkDes;	
	}

	if (ingredient3 == null) {
		drinkBox.innerHTML = "Ingredients: " + ingredient1 + ", " + ingredient2 + "<br><br>" + "Recipe: " + drinkDes;	
	}	
}


function onAPI3Error(error) {
	
}

/*getAPIdata3();*/
