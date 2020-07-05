const weather = document.querySelector(".js-weather");

const API_KEY = "5a28c55c15eb38f7e21b7512cb712482";
const COORDS = 'coords';

/* get data without refresh */
function getWeather(lat, lng){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
	).then(function(response){
	return response.json()
	}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature} @ ${place}`;
	})
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
} 	

function handleGeoError(){
	console.log("Can't find geolocation");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	}else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
		console.log(parsedCoords);
	}
}
function init(){
	loadCoords();
}

init();