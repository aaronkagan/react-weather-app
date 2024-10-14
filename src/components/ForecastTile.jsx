import axios from 'axios';
import { useState, useEffect } from 'react';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function ForecastTile({ coords: { lat, lon }, city }) {
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
    <div className="p-5 text-center text-white border">
      {console.log(forecastData)}
      <p>5 Day Forecast for {city}</p>
      <ul className="flex gap-4">
        {forecastData &&
          forecastData.map((day) => {
            const date = new Date(day.dt_txt.slice(0, 10));
            const options = {
              weekday: 'long',
            };
            const dayOfWeek = date.toLocaleDateString('en-US', options);
            return (
              <li key={day.dt}>
                <p>{dayOfWeek}</p>
                <p>{parseInt(day.main.temp)}&deg;</p>
                <p>{day.weather[0].description}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
