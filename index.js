
function getLocation(){
	function locationSuccess(position){
  console.log(position);
  //return position;
 	getWeather(position);
 	getTaxon(position);
	}
	function locationFailure(err){
  $('.jsError').text(`ERROR(${err.code}): ${err.message}, Try entering a city.`);
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
	var city = $('.cityInput').val();
	getCityWeather(city);
	//getCityTaxon(responseJson);
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
       //console.log( response.json());
    		}
      else {
     throw new Error (response.statusText);}
    })
    .then(responseJson => {
			displayWeather(responseJson);
			console.log(responseJson);
			})
			
    .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
}

function getCityWeather(city){
	const APIKey = `6f1db6bbcce144b73f9217c2d91174c7`;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${APIKey}`)
	  .then(response => {
      if (response.ok){
      	return response.json();
       //console.log( response.json());
    		}
      else {
     throw new Error (response.statusText);}
    })
    .then(responseJson => {
			displayWeather(responseJson);
			getCityTaxon(responseJson);
			console.log(responseJson);
			})

    .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
}
    
function getTaxon(position){
	
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	
	fetch(`https://api.inaturalist.org/v1/observations?geo=true&identified=true&photos=true&lat=${latitude}&lng=${longitude}&radius=5&per_page=12&order=desc&order_by=created_at`)
	
	.then(response => {
    if (response.ok){
      return response.json();
    }
    else {
     throw new Error (response.statusText);}
    })
  .then(responseJson => {
  displayTaxon(responseJson);
  	console.log(responseJson);
  	})
  .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
	}
	
function getCityTaxon(responseJson){
	
	const latitude = responseJson.coord.lat;
	const longitude = responseJson.coord.lon;
	
	fetch(`https://api.inaturalist.org/v1/observations?geo=true&identified=true&photos=true&lat=${latitude}&lng=${longitude}&radius=5&per_page=12&order=desc&order_by=created_at`)
	
	.then(response => {
    if (response.ok){
      return response.json();
    }
    else {
     throw new Error (response.statusText);}
    })
  .then(responseJson => {
  displayTaxon(responseJson);
  	console.log(responseJson);
  	})
  .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
	}
	
function handleStart(){
	$('.start').click( event => {
		event.preventDefault();
		getLocation();
		$('.welcome').toggleClass("hidden");
	})
}

function displayWeather(responseJson){
	$('.jsWeather').replaceWith(
		`<div class="jsWeather" role="weather info">
			<h1>Out There in ${responseJson.name}</h1>
			<h2>${responseJson.weather[0].description.toUpperCase()}</h2>
			<h2>Temperature: ${responseJson.main.temp}&#8457</h2>
			<h3> Low: ${responseJson.main.temp_min}&#8457 High: ${responseJson.main.temp_max}&#8457</h3>
			<h2>Humidity: ${responseJson.main.humidity}%</h2>
			<h2>Wind Speed: ${responseJson.wind.speed} MPH</h2>
			</div>`);
}

function displayTaxon(responseJson){
	$('.jsTaxon').empty();
	$('.jsTaxon').append(`<h1>Who&#39s Out There:</h1>`);
	for(let i=1; i< responseJson.results.length; i++){
	$('.jsTaxon').append(
		`<img alt="${responseJson.results[i].taxon.preferred_common_name}" src="${responseJson.results[i].photos[0].url}">
		<h2>${responseJson.results[i].taxon.preferred_common_name}</h2>
		<h3>Scientiffic Name: ${responseJson.results[i].taxon.name}</h3>
		<h3>Observed: ${responseJson.results[i].observed_on} at ${responseJson.results[i].place_guess}</h3>
		<h3><a href="${responseJson.results[i].taxon.wikipedia_url}" target="blank">More Information</a> </h3>`);
		}
}
		
function initialize(){
	handleStart();
	handleCityInput();
}

$(initialize())
//getWeather(Position);