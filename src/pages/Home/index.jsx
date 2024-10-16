import React, { useState, useEffect } from 'react';
import WeatherTiles from '../../components/WeatherTiles';
import getWeather from '../../utils/getWeather';

export default function Home() {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData(lat, lon) {
    const data = await getWeather({ lat, lon });
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
    <div className=" flex w-[1000px] h-full gap-4">
      {weatherData ? (
        <WeatherTiles weatherData={weatherData} />
      ) : (
        <p className="flex bg-[#0b131e] items-center justify-center w-full h-full text-2xl text-white ">
          Loading Weather Data...
        </p>
      )}
    </div>
  );
}
