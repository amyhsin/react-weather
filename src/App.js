import React, { useState } from 'react';


const api = {
  key: "788ce2f75106e32d70df0bcbc0effd79",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const cityValue = (e) => {
    setQuery(e.target.value);
  }


  const enterSearch = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }




  const dateBuilder = (d) => {
    let months = ["January", "Fabuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${month} ${date} `
  }

  //c = k-273.15

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 16) ? "app" : "app warm") : "app"}>
      <main>
        <div className="search-box">
          <input className="search-bar" type="text"
            placeholder="City Name..."
            onChange={cityValue}
            value={query}
            onKeyPress={enterSearch}
          />
        </div>


        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="error">PLEASE ENTER A NEW CITY</div>
        )}
      </main>
    </div>
  );
}

export default App;
