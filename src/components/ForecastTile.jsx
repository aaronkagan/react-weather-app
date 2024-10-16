import { useState, useEffect } from 'react';
import capitalize from '../utils/capitalize';
import getForecast from '../utils/getForecast';

export default function ForecastTile({ coords: { lat, lon }, city }) {
  const [forecastData, setForecastData] = useState();

  async function getForecastData() {
    const data = await getForecast({ lat, lon });

    const dailyForecast = data.list.filter((element) =>
      element.dt_txt.includes('15:00:00')
    );

    setForecastData(dailyForecast);
  }

  useEffect(() => {
    getForecastData();
  }, [lat, lon]);

  return (
    <div className="flex flex-col gap-4 items-center w-full h-full p-5 text-center text-white bg-[#202b3b] rounded-2xl overflow-y-scroll no-scrollbar">
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
              <li
                key={day.dt}
                className="grid items-center justify-between grid-cols-4"
              >
                <p className="text-xs font-thin text-start">{dayOfWeek}</p>
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${
                      day.weather[0].icon[0] + day.weather[0].icon[1] + 'd'
                    }@2x.png`}
                  />
                </div>

                <p className="text-sm">
                  {capitalize(day.weather[0].description)}
                </p>
                <p>{parseInt(day.main.temp)}&deg;</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
