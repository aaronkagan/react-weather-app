import axios from 'axios';
import { useState, useEffect } from 'react';
import capitalize from '../utils/capitalize';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function ForecastTile({
  coords: { lat, lon },
  city,
  getFiveDayTrend,
}) {
  const [forecastData, setForecastData] = useState();

  async function getForecastData() {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );

    const dailyForecast = data.list.filter((element) =>
      element.dt_txt.includes('15:00:00')
    );

    setForecastData(dailyForecast);
  }

  useEffect(() => {
    getForecastData();
  }, [lat, lon]);

  return (
    <div className="flex flex-col gap-4 items-center w-full h-full p-5 text-center text-white bg-[#202b3b] rounded-2xl">
      <p className="text-text-color">
        5 Day Forecast for {city && capitalize(city)}
      </p>
      <ul className="flex flex-col justify-around w-full h-full">
        {forecastData &&
          forecastData.map((day) => {
            const date = new Date(day.dt_txt.slice(0, 10));
            const options = {
              weekday: 'long',
            };
            const dayOfWeek = date.toLocaleDateString('en-US', options);
            return (
              <li key={day.dt} className="flex items-center justify-between">
                <p className="text-xs font-thin">{dayOfWeek}</p>
                <p>{capitalize(day.weather[0].description)}</p>
                <p>{parseInt(day.main.temp)}&deg;</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
