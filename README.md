# Out There

Out There allows users to get currnet weather conditions as well as floura and fauna sightings based on their current position
or a city entered as a query. 

[Live Page](https://wades1248.github.io/Out-There/)

## Mission

The purpose of this app is to inspire users to go outside and see what there is to see, as well as
to remind users that humans aren't the only things living in cities around the world. Hopefully Out There will inspire users
to explore thier surroundings and be mindful of their non-human neighbors.

## Use

Upon landing on Out There users will be prompted with a message explaining what the app does and for what their location will
be used, the landing message also informs users that if they should choose not to disclose their location, that they are 
welcome to enter a city as a query in order to use the service. The users location or query is then sent to he AccuWeather and 
iNaturalist APIs which return data for those specific coordinates. If the user did choose to enter a city, iNaturalist will use 
coordinates provided by AccuWeather for the city entered. This was done to streamline and minimize API calls. The user may then
browse the weather and species data provided. Links to the wikipedia page for each species are provided on the page should the 
user feel inclined to learn more about a species. 

## Screenshots

Landing Page

  ![Landing Page](https://github.com/wades1248/Out-There/blob/master/Screen%20Shot%202019-11-18%20at%207.23.57%20PM.png?raw=true)

Location Results

  ![Query Results](https://github.com/wades1248/Out-There/blob/master/Screen%20Shot%202019-11-18%20at%207.18.37%20PM.png?raw=true)

Query Results

  ![Query Results](https://github.com/wades1248/Out-There/blob/master/Screen%20Shot%202019-11-18%20at%207.19.03%20PM.png?raw=true)

## Technologies

HTML5, CSS, JavaScript
