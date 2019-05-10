import './general';

//http://api.openweathermap.org/data/2.5/forecast?zip=97405&units=imperial&appid=c59493e7a8643f49446baf0d5ed9d646

class Weather
{
  constructor()
  {
    this.state = {
      zipcode: "",
      city: {}, 
      forecast: [], 
      simpleForecast: [], 
      selectedDate: null
    };
    this.googleApi='AIzaSyAUVVZtkjKEpv2CP4VPahcqYpRZ8evgNL8';
    this.googleUrl='https://maps.googleapis.com/maps/api/timezone/json?location='
    this.url = "http://api.openweathermap.org/data/2.5/forecast?zip=";
    this.apikey = "&units=imperial&appid=63b4f10e19ed97e00432442f700ab81c";
    this.form=document.getElementById('zipForm');
    this.zipInput=document.getElementById("zipcode");
    this.weatherList=document.getElementById("weatherList");
    this.currentDay=document.getElementById("currentDay");
    this.onFormSubmit=this.onFormSubmit.bind(this);
    this.parseForecast=this.parseForecast.bind(this);
    this.getIndexOfMidnight=this.getIndexOfMidnight.bind(this);
    this.findMaxTemp=this.findMaxTemp.bind(this);
    this.findMinTemp=this.findMinTemp.bind(this);
    this.form.addEventListener('submit',this.onFormSubmit);
    this.rednerCurrentDay=this.rednerCurrentDay.bind(this);
    this.clearCurrentDay=this.clearCurrentDay.bind(this);
  }
  onFormSubmit(event)
  {
    event.preventDefault();
    let zip=document.getElementById('zipcode').value;
    fetch(`${this.url}${zip}${this.apikey}`)
    .then(response=>response.json())
    .then(data=>{
        
        this.state.city=data.city,
        this.state.forecast=data.list,
        this.state.simpleForecast=data.simpleForecast
        this.state.selectedDate=null;
        //console.log(`${this.googleUrl}${this.state.city.coord.lat},${this.state.city.coord.lon}&timestam=${this.state.forecast[0].dt}&key=${this.googleApi}`);
        fetch(`${this.googleUrl}${this.state.city.coord.lat},${this.state.city.coord.lon}&timestamp=${this.state.forecast[0].dt}&key=${this.googleApi}`)
        .then(response=>response.json())
        .then(tzdata=>{
          console.log("timezone data:" +tzdata);
          
          this.state.timezoneOffset=(tzdata.rawOffset+tzdata.dstOffset)/(60*60);
          this.state.simpleForecast=this.parseForecast(this.state.forecase,this.state.timezoneOffset);
          this.zip.value="";
          //call method that writes data to page
          renderWeatherList(this.state.simpleForecast);
        })
        .catch(tzError=>{alert("There was a problem getting timezone info!");
      });
      
    })
    clearCurrentDay();
    /*
    Write the method onFormSubmit.  It should
    - prevent the form from being sumbitted to the server
    - get the zip code from the UI and put it in a variable
    - call fetch with the url zipcode and apikey
      - when the response comes back THEN parse the json
      - when that finishes THEN 
        - set the city in the state object
        - set the forecast in the state object
        - set the simpleForecast in the state object 
            by calling the method parseForecast (see bottom of file)
        - set the selectedDate to null
        - clear the zipcode from the UI
        - call the method renderWeatherList and pass this.state.simpleForecast as the arg
    */
  }
  /**- Write a first version of renderWeatherList.  It has forecast 
   * (which is 5 element simplified forcast array) as a parameter.
    - console.log the value of forecast.
  - Edit the constructor to bind the class to the method renderWeatherList */
  renderWeatherList(forecastArray)
  {
    console.log(forecastArray);
    const itemsHTML = forecast.map((forecastDay, index) => this.renderWeatherListItem(forecastDay, index)).join('');
    document.getElementById('weatherlist').innerHTML=innerHTML;
    /*Edit the body of the method renderWeather list.  It should
    - Create the html for each of the weather list items.  Use the array method map to do this.
      const itemsHTML = forecast.map((forecastDay, index) => this.renderWeatherListItem(forecastDay, index)).join('');
    - Set the inner html of the weatherList element on the page to 
      - a div element styled with weather-list flex-parent
      - that contains the itemsHTML from above 
      
      - Add a click event handler to each of the weather list items 
    - add a loop to the end of the renderWeatherList method that adds the event handler
    - you'll have to bind the method renderCurrentDay to both the class and the index of the item*/
    for(let i=0;i<=forecastArray;i++)
    {
      document.getElementById("weatherlist")[i].addEventListener('click',rednerCurrentDay);
    }
  }
  renderWeatherListItem(forecastDay,index)
  {
    /** Write the method renderWeatherListItem
    - This method returns a template literal containing the html for the weather for ONE day.
      It gets called in renderWeatherList.  It has 2 parameters a forecastDay and an index.
      The forecastDay is a js object from the "parsed" version of the return from the weather api.
    - Format the weather information for one day on the html page.  At a minimum it should include
      - the month and day as well as the weekday
      - the high and low temperatures for that day
      - the element should be styled with weather-list-item as well
    - CUT the html for ONE day from your html page into the body of your method.
      - Enclose the html in ``.
      - Replace the hardcoded month and day, weekday, high and low temperatures 
        with template strings that use the properties of the forecastDay object
      - Return the template literal  */
      return `<div class='flex-parent weather-list-item'>
              <label for='month' class="weather-list-item inline">month</label><label for='day' class='weather-list-item'>day</label>
              <label for="high" class='weather-list-item'>${forecastDay[index].maxTemp}</label><label for="low"class='weather-list-item'>${forecastDay(index).minTemp}</label>
              </div>`
   
  }

  rednerCurrentDay(index)
  {
  
    ` <div class='flexdown weather-list-item'>
    <div> Weather in ${city}</div>
    <div id='icon'><img id='wicon' src="http://openweathermap.org/img/w/${simpleForecast[i].icon}" alt="weatherIcon"> Todays Weather: ${simpleForecast(i).description}</div>
    <div>Morning Temp: ${simpleForecast.morningTemp}/div>
    <div>Afternoon Temp: ${simpleForecast.dayTemp}</div>
    <div>Evening Temp: ${simpleForecast.eveningTemp}</div>
    <div>Night Temp: ${simpleForecast.nightTemp}</div>

    <div class="right">Atmospheric Pressure: pressure</div>
    <div class="right">Humidity: humid</div>
    <div class="right">Wind Speed: speedy</div>    
   </div>`
    /*Write the method renderCurrentDay.  It takes the index of the day as it's parameter.
    - Format the detailed weather information for the selected day on the html page. Include at least
      - identifying information for the city as well as the date
      - description and icon for the weather
      - temperatures throughout the day
      - humidity and wind information
    - CUT the html for the weather details and paste it into the body of your method
      - Enclose the html in ``.
      - Replace the hardcoded text with data.  The data is in the state instance variable.
      - Set the innerhtml property of the currentDay element on the page
  - Add a click event handler to each of the weather list items 
    - add a loop to the end of the renderWeatherList method that adds the event handler
    - you'll have to bind the method renderCurrentDay to both the class and the index of the item */
  }







  getIndexOfMidnight(firstDate, timezoneOffset) {
    let dt = firstDate * 1000;
    let date = new Date(dt);
    let utcHours = date.getUTCHours();
    let localHours = utcHours + timezoneOffset;
    let firstMidnightIndex = (localHours > 2 ) ? 
        Math.round((24 - localHours)/3) : 
        Math.abs(Math.round(localHours / 3));
    return firstMidnightIndex;
  }

  findMinTemp(forecast, indexOfMidnight) {
    let min = forecast[indexOfMidnight].main.temp_min;
    for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++)
      if (forecast[i].main.temp_min < min)
        min = forecast[i].main.temp_min;
    return min;
  }

  findMaxTemp(forecast, indexOfMidnight) {
    let max = forecast[indexOfMidnight].main.temp_max;
    for (let i = indexOfMidnight + 1; i < indexOfMidnight + 8; i++)
      if (forecast[i].main.temp_max > max)
        max = forecast[i].main.temp_max;
    return max;
  }

  parseForecast(forecast, timezoneOffset) {
    let simpleForecast = new Array();
    const MIDNIGHT = this.getIndexOfMidnight(forecast[0].dt, timezoneOffset);
    const NOON = 4;
    const SIXAM = 2;
    const SIXPM = 6;
    const NINEPM = 7;
    const MORNING = SIXAM;
    const DAY = NOON;
    const EVENING = SIXPM;
    const NIGHT = NINEPM;
    const PERDAY = 8;
    const DAYS = 4;
    for (let i = MIDNIGHT; i < forecast.length - NINEPM; i+=PERDAY) {
      let oneDay = new Object();
      oneDay.dt = forecast[i + NOON].dt;
      oneDay.temp = forecast[i + NOON].main.temp;
      oneDay.minTemp = this.findMinTemp(forecast, i);
      oneDay.maxTemp = this.findMaxTemp(forecast, i);
      oneDay.morningTemp = forecast[i + MORNING].main.temp;
      oneDay.dayTemp = forecast[i + DAY].main.temp;
      oneDay.eveningTemp = forecast[i + EVENING].main.temp;
      oneDay.nightTemp = forecast[i + NIGHT].main.temp;
      oneDay.description = forecast[i + NOON].weather[0].description;
      oneDay.icon = forecast[i].weather[0].icon;
      oneDay.pressure = forecast[i].main.pressure;
      oneDay.wind = forecast[i].wind.speed;
      oneDay.humidity = forecast[i].main.humidity;
      simpleForecast.push(oneDay);
    }
    return simpleForecast;
  }
  clearCurrentDay()
  {
    document.getElementById("currentDay").innerHTML="";
  }

}
/* Create a class called Weather
- Part 1 - Retrieve the weather information when the user clicks the buttobn
  - Create the constructor
    - initialize instance variables for the "state" of the app and the ajax call 
        this.state = {
          zipcode: "",
          city: {}, object name of city lat and long
          forecast: [], array of raw data from ajax call
          simpleForecast: [], less ugly forecast data
          selectedDate: null
        };
        this.url = "http://api.openweathermap.org/data/2.5/forecast?zip=";
        this.apikey = "&units=imperial&appid=63b4f10e19ed97e00432442f700ab81c";
    - initialize instance variables for UI elements
        the form
        the zipcode input element
        the weather list div
        the current day div
    - write the stub of a method onFormSubmit
    - bind the class to onFormSubmit
    - add a submit handler to the form that calls onFormSubmit
  - Write the method onFormSubmit.  It should
    - prevent the form from being sumbitted to the server
    - get the zip code from the UI and put it in a variable
    - call fetch with the url zipcode and apikey
      - when the response comes back THEN parse the json
      - when that finishes THEN 
        - set the city in the state object
        - set the forecast in the state object
        - set the simpleForecast in the state object 
            by calling the method parseForecast (see bottom of file)
        - set the selectedDate to null
        - clear the zipcode from the UI
        - call the method renderWeatherList and pass this.state.simpleForecast as the arg
  - Write a first version of renderWeatherList.  It has forecast (which is 5 element simplified forcast array) as a parameter.
    - console.log the value of forecast.
  - Edit the constructor to bind the class to the method renderWeatherList
END OF PART 1 - TEST AND DEBUG YOUR APP
- Part 2 - Format ONE weather list item and the weather list as a whole
  - Write the method renderWeatherListItem
    - This method returns a template literal containing the html for the weather for ONE day.
      It gets called in renderWeatherList.  It has 2 parameters a forecastDay and an index.
      The forecastDay is a js object from the "parsed" version of the return from the weather api.
    - Format the weather information for one day on the html page.  At a minimum it should include
      - the month and day as well as the weekday
      - the high and low temperatures for that day
      - the element should be styled with weather-list-item as well
    - CUT the html for ONE day from your html page into the body of your method.
      - Enclose the html in ``.
      - Replace the hardcoded month and day, weekday, high and low temperatures 
        with template strings that use the properties of the forecastDay object
      - Return the template literal 
  - Edit the body of the method renderWeather list.  It should
    - Create the html for each of the weather list items.  Use the array method map to do this.
      const itemsHTML = forecast.map((forecastDay, index) => this.renderWeatherListItem(forecastDay, index)).join('');
    - Set the inner html of the weatherList element on the page to 
      - a div element styled with weather-list flex-parent
      - that contains the itemsHTML from above
END OF PART 2 - TEST AND DEBUG YOUR APP
- Part 3 - Display weather details when the user clicks one weather list item
  - Write the method renderCurrentDay.  It takes the index of the day as it's parameter.
    - Format the detailed weather information for the selected day on the html page. Include at least
      - identifying information for the city as well as the date
      - description and icon for the weather
      - temperatures throughout the day
      - humidity and wind information
    - CUT the html for the weather details and paste it into the body of your method
      - Enclose the html in ``.
      - Replace the hardcoded text with data.  The data is in the state instance variable.
      - Set the innerhtml property of the currentDay element on the page
      **********************************************************************************
  - Add a click event handler to each of the weather list items 
    - add a loop to the end of the renderWeatherList method that adds the event handler
    - you'll have to bind the method renderCurrentDay to both the class and the index of the item
  - Write the method clearCurrentDay.  It sets the inner html property of the currentDay element to ""
  - Call clearCurrentDay at the end of onFormSubmit
END OF PART 3 - TEST AND DEBUG YOUR APP
*/

// Don't forget to instantiate the a weather object!

/*
  parseForecast(forecast) {
    let simpleForecast = new Array();
    const NOON = 4;
    const SIXAM = 2;
    const SIXPM = 6;
    const NINEPM = 7;
    const MORNING = SIXAM;
    const DAY = NOON;
    const EVENING = SIXPM;
    const NIGHT = NINEPM;
    const PERDAY = 8;
    const DAYS = 5;
    for (let i = 0; i < forecast.length; i+=PERDAY) {
      let oneDay = new Object();
      oneDay.dt = forecast[i + NOON].dt;
      oneDay.temp = forecast[i + NOON].main.temp;
      oneDay.minTemp = forecast[i + SIXAM].main.temp_min;
      oneDay.maxTemp = forecast[i + SIXPM].main.temp_max;
      oneDay.morningTemp = 
      oneDay.dayTemp = 
      oneDay.eveningTemp = 
      oneDay.nightTemp = 
      oneDay.description = 
      oneDay.icon = 
      oneDay.pressure = 
      oneDay.wind = 
      oneDay.humidity = 
      simpleForecast.push(oneDay);
    }
    return simpleForecast;
  }

*/

//parsing functions
 
let myWeather;
window.onload=()=>(myWeather=new Weather());
