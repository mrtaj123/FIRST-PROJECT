import { useEffect, useState } from 'react';
import './App.css';
/*Images*/
import searchicon from "./assets/search.png";
import drizzalicon from "./assets/drizzal.png";
import humidityicon from "./assets/humidity.png";
import rainicon from "./assets/rain.png";
import windicon from "./assets/wind.png";
import cloudicon from "./assets/cloud.png";
import snowicon from "./assets/snow.png";
import sunicon from "./assets/sun.jpg";

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    //hii
    <>
      <div className='image'>
        <img src={icon} alt='weather icon' />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt='humidity icon' className='icon' />
          <div className="class">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windicon} alt='wind icon' className='icon' />
          <div className="data">
            <div className="wind-percent">{wind}km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(rainicon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": sunicon,
    "01n": sunicon,
    "02d": cloudicon,
    "02n": cloudicon,
    "03d": drizzalicon,
    "03n": drizzalicon,
    "04d": drizzalicon,
    "04n": drizzalicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  };

  const search = async () => {
    setLoading(true);
    setError(null);

    try {
      // const apiKey = "YOUR_API_KEY";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=66ab14163f611837cdfbd294a0bf94b6&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || sunicon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
     setError("An error occurred while fetching weather data Please turn on your internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input
            type='text'
            className='cityInput'
            placeholder='Search City'
            onChange={handleCityChange}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className='search-icon' onClick={search}>
            <img src={searchicon} alt='search' />
          </div>
        </div>

        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}

        {!loading && !cityNotFound &&
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
        }

        <p className="copyright">
          Designed by <span>TAJ</span>
        </p>
      </div>
    </>
  );
}

export default App;
