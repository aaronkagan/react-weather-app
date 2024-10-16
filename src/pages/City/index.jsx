import React, { useEffect, useState } from 'react';
import WeatherTiles from '../../components/WeatherTiles';
import getWeather from '../../utils/getWeather';
import getCoords from '../../utils/getCoords';

export default function City({
  match: {
    params: { cityId },
  },
}) {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData() {
    const { lat, lon } = await getCoords(cityId);
    const data = await getWeather({ lat, lon });
    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [cityId]);

  return (
    <div className=" flex w-[1000px] h-full gap-4">
      {weatherData ? (
        <WeatherTiles weatherData={weatherData} city={cityId} />
      ) : (
        <p className="flex bg-[#0b131e] items-center justify-center w-full h-full text-2xl text-white ">
          Loading Weather Data...
        </p>
      )}
    </div>
  );
}
