let api = '4b68b9833a5d876624e3bef5097ac73d';
let globe = 'metric';
let pincodeAdd;

function inputCondition(gettinginputvalue){
    if(gettinginputvalue.length === 5 && Number.parseInt(gettinginputvalue) + '' === gettinginputvalue){
        pincodeAdd = 'zip'
    } else {
        pincodeAdd = 'q'
    }
}

function getAPIdata(inputpara){
    inputCondition(inputpara);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${pincodeAdd}=${inputpara}&APPID=${api}&units${globe}`)
    .then(getresult =>{
        return getresult.json();
    }).then(receiveData =>{
        gettingData(receiveData);
        // console.log(receiveData);
    })
}

function gettingData(newparameter){
    console.log(newparameter);
    let icons = document.getElementById("icon");
    switch(newparameter.list[0].weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = "url('./images/clear.jpg')";
            icons.style.backgroundImage = "url('./images/sun.png')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('./images/cloudy.jpg')";
            icons.style.backgroundImage = "url('./images/cloudy.png')";
            break;
        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('./images/rain.jpg')";
            icons.style.backgroundImage = "url('./images/raining.png')";
            break;
        case 'Mist':
            document.body.style.backgroundImage = "url('./images/mist.jpg')";
            icons.style.backgroundImage = "url('./images/wind.png')";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('./images/storm.jpg')";
            icons.style.backgroundImage = "url('./images/thunderstorm.png')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('/images/snow.jpg')";
            icons.style.backgroundImage = "url('./images/snowning.png')";
            break;
        default:
            break;
    }
    let title = document.getElementById("city-title");
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let pressure = document.getElementById("pressure");
    let humidity = document.getElementById("humidity");
    let minTemp = document.getElementById("min-temp");
    let maxTemp = document.getElementById("max-temp");
    let windSpeed = document.getElementById("wind-speed");
    let gust = document.getElementById("gust");
    
    title.innerHTML = newparameter.city.name.toUpperCase();
    description.innerText = newparameter.list[0].weather[0].description;
    temperature.innerHTML = Math.floor(newparameter.list[0].main.temp) + '&#176;';
    // icons.src = 'http://openweathermap.org/img/w/' + newparameter.list[0].weather[0].icon + '.png';
    humidity.innerHTML = "Humidity: " + newparameter.list[0].main.humidity;
    pressure.innerHTML = "Pressure: " + newparameter.list[0].main.pressure;
    minTemp.innerHTML = "Min-Temp: " + newparameter.list[0].main.temp_min;
    maxTemp.innerHTML = "Max-Temp: " + newparameter.list[0].main.temp_max;
    windSpeed.innerHTML = "Wind-Speed: " + newparameter.list[0].wind.speed;
    gust.innerHTML = "Gust: " + newparameter.list[0].wind.gust;

    displaycontainer();

}

function displaycontainer(){
    let access = document.getElementById("weather-container");
    access.style.visibility = 'visible';
}


document.getElementById('button').addEventListener('click',()=>{
    let inputValue = document.getElementById('input-value').value;
    if(inputValue){
        getAPIdata(inputValue);
    }
});