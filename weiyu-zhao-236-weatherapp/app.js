async function weatherDetail(){
    
    let city_name = document.getElementById('city').value;
    let url;
    city_name == /^([0-9]{5})/? 
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${city_name}&appid=93f26e3c57081a6210de53b8dcfdfea4`: 
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=93f26e3c57081a6210de53b8dcfdfea4`
    
    await fetch(url)
    .then((weather)=>{return weather.json()})
    .then ((data)=>{
        data.cod === "404"? document.getElementById("notFound").innerText = "City not found!":displayData(data)
    })
    clearInput();
}
let temp;
let temp_max;
let temp_min;
let feelsLike;
function displayData(data){
    document.getElementById('unitConvert').removeAttribute("disabled");
    let city = data.name;
    let imgIcon = data.weather[0].icon
    let imgurl = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`
    temp = kelvinToFahrenheit(data.main.temp)
    temp_max = kelvinToFahrenheit(data.main.temp_max);
    temp_min = kelvinToFahrenheit(data.main.temp_min);
  
    let imgWeather = data.weather[0].main;
    let day = getDay();
    let cityDiv = document.createElement('div');
    let tempDiv = document.createElement('div');
    tempDiv.setAttribute('id','temp');
    let tempRange = document.createElement('div');
    tempRange.setAttribute('id','tempRange');
    let img = document.createElement('div');
    let weather = document.createElement('div');
    let dayDiv = document.createElement('div');
    cityDiv.innerHTML = `${city}`;
    cityDiv.classList.add('h3','mb-0');
    img.innerHTML = `<img src=${imgurl} alt='weather'/>`
    let dailyDiv = document.createElement('div');
    dailyDiv.appendChild(cityDiv)
    dailyDiv.appendChild(img)
    tempDiv.innerHTML = `<h3>${temp}°F</h3>`
    dailyDiv.appendChild(tempDiv)
   
    tempRange.innerHTML = `${temp_max} / ${temp_min}°F`
    dailyDiv.appendChild(tempRange)
    weather.innerHTML = `${imgWeather}`;
    dailyDiv.appendChild(weather)
    dayDiv.innerHTML = `${day}`;
    dayDiv.classList.add("border-top","border-light-subtle", "px-4","m-2");
    dailyDiv.appendChild(dayDiv)
    dailyDiv.classList.add( "px-5","py-3","rounded-3","d-flex", "flex-column","align-items-center")
    document.getElementById('weather').appendChild(dailyDiv)
    let moreDetails = document.createElement('button')
    
    moreDetails.classList.add("btn", "btn-primary","mt-3")
    moreDetails.innerText="Click for more details"
    moreDetails.onclick = function(){
        moreDetails.setAttribute("disabled", "");
        let detailsDiv = document.createElement('div');
        let humidityDiv = document.createElement('div');
        let pressureDiv = document.createElement('div');
        let windSpeedDiv = document.createElement('div');
        let windDegreeDiv =  document.createElement('div');
        detailsDiv.classList.add('ms-4','py-4','px-5','border','rounded-3',"d-flex","flex-column","justify-content-around",'align-items-center')
        let feelsLikeDiv = document.createElement('div');
        feelsLike = kelvinToFahrenheit(data.main.feels_like);
        let humidity = data.main.humidity;
        let pressure = data.main.pressure;
        let windSpeed = data.wind.speed;
        let windDegree = data.wind.deg;
        feelsLikeDiv.innerHTML = `Feels like: ${feelsLike}°F`;
        humidityDiv.innerHTML = `Humidity: ${humidity}%`;
        pressureDiv.innerHTML = `Pressure: ${pressure}mb`;
        windSpeedDiv.innerHTML = `Wind speed: ${windSpeed}m/s`;
        windDegreeDiv.innerHTML = `Wind degree: ${windDegree}°`;
        feelsLikeDiv.setAttribute('id','feelsLike');
        detailsDiv.appendChild(feelsLikeDiv);
        detailsDiv.appendChild(humidityDiv);
        detailsDiv.appendChild(pressureDiv);
        detailsDiv.appendChild(windSpeedDiv);
        detailsDiv.appendChild(windDegreeDiv);
       
        document.getElementById('weather').appendChild(detailsDiv);
    }
    dailyDiv.appendChild(moreDetails)
}

async function forecastWeather(){
    let city_name = document.getElementById('city').value;
    let url;
    (city_name) == /^([0-9]{5})/? 
    url = `https://api.openweathermap.org/data/2.5/forecast?zip=${city_name}&appid=93f26e3c57081a6210de53b8dcfdfea4`: 
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=93f26e3c57081a6210de53b8dcfdfea4`;
    
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        data.cod === "404"? document.getElementById("notFound").innerText = "City not found!":displayForecast(data)
    })
    clearInput();
};
function displayForecast(data){
   
        document.getElementById('unitConvert').setAttribute("disabled", "");
        let city = data.city.name;
            let cityDiv = document.createElement('div');
            cityDiv.innerHTML = `${city}`;
            cityDiv.classList.add('h3','mb-2','text-center');
            let slide1 = document.getElementsByClassName("slides")[0]
            document.getElementsByClassName("row")[0].insertBefore(cityDiv,slide1);
        let slide;
        const today = new Date();
        for (i=0;i<4;i++){
            slide = document.createElement('div');
            slide.className = "slides"
            let col = document.createElement('div');
            col.classList.add('col-md-3');
            col.appendChild(slide);
            document.getElementsByClassName('row')[0].appendChild(col); 
            const weekDay = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate()+i+1);
            
            let day = weekDay[tomorrow.getDay()]; 
            
            let dayDiv = document.createElement('div');
            dayDiv.innerHTML = `${day}`;
            dayDiv.classList.add('order-2',"border-top","border-secondary", "px-4","m-2")
            slide.appendChild(dayDiv);
            
            
        }
       
       let tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);

        let a = tomorrow.toISOString();
        let b = a.slice(0,10)

        let indDate = 0;
        let dateString = data.list[indDate].dt_txt;
        

        while(!dateString.includes(b)){
            dateString = data.list[indDate].dt_txt;
            indDate++;
                    };
                 
        let index = 0;
        let slideDiv;
        for(let i=indDate+3;i<40;i+=8){

            let imgIcon = data.list[i].weather[0].icon;
            let imgurl = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`;
            let imgWeather = data.list[i].weather[0].main;
            slideDiv = document.getElementsByClassName("slides")[index]
           
            let iconDiv = document.createElement('div');
            let imgWeatherDiv = document.createElement('div');
            iconDiv.innerHTML = `<img src=${imgurl} alt='weather'/>`;
            slideDiv.appendChild(iconDiv);
            imgWeatherDiv.innerHTML = `${imgWeather}`;
            imgWeatherDiv.classList.add('order-1')
            slideDiv.appendChild(imgWeatherDiv);
           slideDiv.classList.add('d-flex','flex-column', 'align-items-center')
            index++;
            if (index>3){
                break
            }
        };
       
        let ind = 0;
        for(let k = indDate;k<40;k+=8){
            let temp_max=-Infinity;
            let temp_min=Infinity;
            for (let j=k;j<k+8;j++){
            if (j<40){
              
                temp_max = (data.list[j].main.temp_max>temp_max)?
                data.list[j].main.temp_max:temp_max;
                temp_min = (data.list[j].main.temp_min<temp_min)?
                data.list[j].main.temp_min:temp_min; 
                date = data.list[j].dt_txt;   
            }      
        }
        slideDiv = document.getElementsByClassName("slides")[ind]
        let temp_range = document.createElement('div')
        temp_range.innerHTML = `<h3>${kelvinToFahrenheit(temp_max)} / ${kelvinToFahrenheit(temp_min)}°F</h3>`
        slideDiv.appendChild(temp_range)
        ind++;
        if (ind>3){
            break
        }
        }   
    }

    function kelvinToFahrenheit(k){
        Fahrenheit = Math.round((k-273.15) * 9/5 + 32);
        return Fahrenheit;
    }
    function fahrenheitToCelsius(f){
        Celsius = Math.round((f-32) * 5/9 );
        return Celsius;
    }
    function getDay(){
        const weekDay = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        const d = new Date();
        let day = weekDay[d.getDay()];
        return day;
    }
    function clearInput(){
        document.getElementById('city').value='';
    }
    function removeNotFound(){
        document.getElementById('notFound').innerText='';
        document.getElementsByClassName('row')[0].innerHTML=''
        document.getElementById('weather').innerHTML=''
    }
    function unitConvert(){
        document.getElementById('unitConvert').classList.contains('active')?  
        celsiusConvert(): fahrenheitConvert();
    }
    function celsiusConvert(){
        let tempC = fahrenheitToCelsius(temp);
        let temp_maxC = fahrenheitToCelsius(temp_max);
        let temp_minC = fahrenheitToCelsius(temp_min);
        let feelsLikeC = fahrenheitToCelsius(feelsLike);
        document.getElementById('temp').innerHTML = `<h3>${tempC}°C</h3>`; 
        document.getElementById('tempRange').innerHTML = `${temp_maxC} / ${temp_minC}°C`;
        if (document.getElementById('feelsLike')!=null){
        document.getElementById('feelsLike').innerText = `Feels like: ${feelsLikeC}°C`};
    }
    function fahrenheitConvert(){
        document.getElementById('temp').innerHTML = `<h3>${temp}°F</h3>`
        document.getElementById('tempRange').innerHTML = `${temp_max} / ${temp_min}°F`
        document.getElementById('feelsLike').innerText = `Feels like: ${feelsLike}°F`;
    }
    
