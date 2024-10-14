import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherTiles from '../../components/WeatherTiles';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function Home() {
  const [weatherData, setWeatherData] = useState();
  const [coords, setCoords] = useState({});

  async function getWeatherData(lat, lon) {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );
    setWeatherData(data);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setCoords({ lat, lon });
          getWeatherData(lat, lon);
        },
        (error) => console.log(error)
      );
    }
  }, []);

  return (
    <div className=" flex bg-gradient-to-t from-[#32cef4] to-[#1f62f2] w-[1000px] h-full gap-4">
      {weatherData && <WeatherTiles weatherData={weatherData} />}
    </div>
  );
}
