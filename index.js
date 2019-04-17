
function getLocation(){
	function locationSuccess(position){
 	getWeather(position);
 	getTaxon(position);
	}
	
	function locationFailure(err){
  $('.jsError').text(`ERROR(${err.code}): ${err.message} Try entering a city.`);
	}
 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(locationSuccess,locationFailure);
 	}else{
		$('.jsError').text(`Could not find location, try entering a city.`);
  };
}

function handleCityInput() {
	$('.inputBar').submit( event => {
		event.preventDefault();
		$('.jsError').replaceWith(`<div class="jsError" aria-live="polite"></div>`);
		var city = $('.cityInput').val();
		getCityWeather(city);
		});
	}

function getWeather(position){
	const APIKey = `6f1db6bbcce144b73f9217c2d91174c7`;
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${APIKey}`)
		.then(response => {
      if (response.ok){
      	return response.json();
   }else {
     throw new Error (response.statusText);}
   })
   .then(responseJson => {
			displayWeather(responseJson);
		})
		.catch(err => { $('.jsError').text(`Something went wrong getting weather data: ${err.message}`);
    });
}

function getCityWeather(city){
	const APIKey = `6f1db6bbcce144b73f9217c2d91174c7`;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${APIKey}`)
	  .then(response => {
      if (response.ok){
      	return response.json();
    		}else {
					throw new Error (response.statusText);}
				})
   .then(responseJson => {
				displayWeather(responseJson);
				getCityTaxon(responseJson);
			})
   .catch(err => { $('.jsError').text(`Something went wrong getting weather for this city: ${err.message}`);
   });
}
    
function getTaxon(position){
	
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	fetch(`https://api.inaturalist.org/v1/observations?geo=true&identified=true&photos=true&lat=${latitude}&lng=${longitude}&radius=5&per_page=13&order=desc&order_by=created_at`)
	.then(response => {
  	if (response.ok){
     return response.json();
   }else {
     throw new Error (response.statusText);}
    })
  .then(responseJson => {
  		displayTaxon(responseJson);
  	})
  .catch(err => { $('.jsError').text(`Something went wrong getting sightings: ${err.message}`);
    });
}
	
function getCityTaxon(responseJson){
	
	const latitude = responseJson.coord.lat;
	const longitude = responseJson.coord.lon;
	
	fetch(`https://api.inaturalist.org/v1/observations?geo=true&identified=true&photos=true&lat=${latitude}&lng=${longitude}&radius=5&per_page=13&order=desc&order_by=created_at`)
		.then(response => {
    if (response.ok){
      return response.json();
    }else {
     throw new Error (response.statusText);}
    })
		.then(responseJson => {
  		displayTaxon(responseJson);
  	})
		.catch(err => { $('.jsError').text(`Something went wrong getting sightings: ${err.message}`);
    });
	}
	
function handleStart(){
	$('.start').click( event => {
		event.preventDefault();
		getLocation();
		$('.welcome').toggleClass("hidden");
		$('.inputBar').toggleClass("hidden");
	})
}

function displayWeather(responseJson){
//this if statement is made to filter out some holes in the icon library provided by AccuWeather, although frequently the icon number received does not match any icons in their library
	if(28<responseJson.weather[0].icon.slice(0,2)<45 && 10<responseJson.weather[0].icon.slice(0,2)<27 && responseJson.weather[0].icon.slice(0,2)<9){
	$('.jsWeather').replaceWith(
		`<div class="jsWeather" role="weather info" aria-live="polite">
			<h1>Out There in ${responseJson.name}</h1>
			<h2>${responseJson.weather[0].description.toUpperCase()}<img src="https://developer.accuweather.com/sites/default/files/${responseJson.weather[0].icon.slice(0,2)}-s.png" alt="weather icon"></h2>
			<h2>Temperature: ${responseJson.main.temp}&#8457</h2>
			<h3> Low: ${responseJson.main.temp_min}&#8457 High: ${responseJson.main.temp_max}&#8457</h3>
			<h2>Humidity: ${responseJson.main.humidity}%</h2>
			<h2>Wind Speed: ${responseJson.wind.speed} MPH</h2>
			</div>`);
	}else{
		$('.jsWeather').replaceWith(
		`<div class="jsWeather" role="weather info" aria-live="polite">
			<h1>Out There in ${responseJson.name}</h1>
			<h2>${responseJson.weather[0].description.toUpperCase()}</h2>
			<h2>Temperature: ${responseJson.main.temp}&#8457</h2>
			<h3> Low: ${responseJson.main.temp_min}&#8457 High: ${responseJson.main.temp_max}&#8457</h3>
			<h2>Humidity: ${responseJson.main.humidity}%</h2>
			<h2>Wind Speed: ${responseJson.wind.speed} MPH</h2>
			</div>`);
		}
}
	

function displayTaxon(responseJson){
	$('.jsTaxon').empty();
	$('.jsTaxon').append(`<h1>Who&#39s Out There:</h1>`);
	for(let i=1; i< responseJson.results.length; i++){
		if(responseJson.results[i].taxon.preferred_common_name === undefined){
			$('.jsTaxon').append(
			`<div class="resultsItem">
			<img alt="${responseJson.results[i].taxon.preferred_common_name}" src="${responseJson.results[i].photos[0].url}">
			<h2>Scientiffic Name: ${responseJson.results[i].taxon.name}</h2>
			<h3>Observed: ${responseJson.results[i].observed_on} at ${responseJson.results[i].place_guess}</h3>
			<h3><a href="${responseJson.results[i].taxon.wikipedia_url}" target="blank">More Information</a> </h3>
			</div>`);
		
		}else{
		$('.jsTaxon').append(
			`<div class="resultsItem">
			<img alt="${responseJson.results[i].taxon.preferred_common_name}" src="${responseJson.results[i].photos[0].url}">
			<h2>${responseJson.results[i].taxon.preferred_common_name.toUpperCase()}</h2>
			<h3>Scientific Name: ${responseJson.results[i].taxon.name}</h3>
			<h3>Observed: ${responseJson.results[i].observed_on} at ${responseJson.results[i].place_guess}</h3>
			<h3><a href="${responseJson.results[i].taxon.wikipedia_url}" target="blank">More Information</a> </h3>
			</div>`);
		}
	}
}
		
function initialize(){
	handleStart();
	handleCityInput();
}

$(initialize())