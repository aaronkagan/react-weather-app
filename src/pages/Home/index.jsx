import React, { useState, useEffect } from 'react';
import axios from 'axios';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function Home() {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData(lat, lon) {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );
    setWeatherData(data);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          getWeatherData(lat, lon);
        },
        (error) => console.log(error)
      );
    }
  }, []);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {weatherData &&
          Object.entries(weatherData).map(([key, value]) => (
            <li key={key}>
              {key} : {JSON.stringify(value)}
            </li>
          ))}
      </ul>
    </>
  );
}
