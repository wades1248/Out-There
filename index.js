const Pos ={};

function getLocation(){
	function locationSuccess(position){
  console.log(position);
  //return position;
 	getWeather(position);
	}
	function locationFailure(err){
  console.log(`ERROR(${err.code}): ${err.message}`);
	}
 
	if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(locationSuccess,locationFailure);
  }else{
    console.log("false");
  };
}

function getWeather(position){
	const APIKey = `0fb9a9c197f6b60e2b5f581c6d982be1`;
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	
	fetch(`https://api.darksky.net/forecast/${APIKey}/${latitude},${longitude}`, {mode: 'cors'}) 
	    .then(response => {
      if (response.ok){
        console.log( response.json());
      }
      throw new Error (response.statusText);
    })
    //.then(responseJson => {displayResults(responseJson,query);})
    .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
    }
	

getLocation();
//getWeather(Position);