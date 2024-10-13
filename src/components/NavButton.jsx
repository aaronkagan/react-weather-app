import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import kToC from '../utils/kToC';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function NavButton({ city }) {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData() {
    const { data: coords } = await axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openWeatherApiKey}`
    );

    const { lat, lon } = coords[0];

    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );

    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    <li>
      <Link to={`/city/${city}`}>{city}</Link>
      {weatherData && <p>{kToC(weatherData.main.temp)}&deg;</p>}
    </li>
  );
}
