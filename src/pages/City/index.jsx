import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WeatherTiles from '../../components/WeatherTiles';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export default function City({
  match: {
    params: { cityId },
  },
}) {
  const [weatherData, setWeatherData] = useState();
  const [coords, setCoords] = useState();

  async function getWeatherData() {
    const { data: coords } = await axios(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityId}&limit=5&appid=${openWeatherApiKey}`
    );
    const { lat, lon } = coords[0];

    setCoords({ lat, lon });

    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );

    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [cityId]);

  return (
    <div>
      {weatherData && <WeatherTiles weatherData={weatherData} city={cityId} />}
    </div>
  );
}
