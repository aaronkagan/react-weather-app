import axios from 'axios';
import React, { useEffect, useState } from 'react';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export default function City({
  match: {
    params: { cityId },
  },
}) {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData() {
    const { data: coords } = await axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityId}&limit=5&appid=${openWeatherApiKey}`
    );

    const { lat, lon } = coords[0];

    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );

    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [cityId]);

  return (
    <ul>
      {weatherData &&
        Object.entries(weatherData).map(([key, value]) => (
          <li key={key}>
            {key} : {JSON.stringify(value)}
          </li>
        ))}
    </ul>
  );
}
