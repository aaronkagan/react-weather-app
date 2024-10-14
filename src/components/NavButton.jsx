import axios from 'axios';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import capitalize from '../utils/capitalize';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function NavButton({ city, handleDelete }) {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData() {
    const { data: coords } = await axios(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openWeatherApiKey}`
    );

    const { lat, lon } = coords[0];

    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
    );

    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    // <li>
    //   <Link to={`/city/${city}`}>{city}</Link>
    //   {weatherData && <p>{kToC(weatherData.main.temp)}&deg;</p>}
    // </li>
    <>
      {weatherData && (
        <li>
          <NavLink
            className={(isActive) =>
              !isActive ? 'bg-[#202b3b]' : 'bg-[#1f62f2]'
            }
            to={`/city/${city}`}
          >
            <div className=" text-white bg-inherit bg-[#202b3b] w-[90%] h-[100px] mx-auto p-2 flex justify-between rounded">
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <p className="font-bold">{city}</p>
                  <p
                    className="text-[11px] text-slate-300"
                    onClick={() => handleDelete(city)}
                  >
                    Remove
                  </p>
                </div>

                <p className="text-xs text-slate-300">
                  {capitalize(weatherData.weather[0].description)}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-[2rem] font-extralight mt-[-8px]">
                  {parseInt(weatherData.main.temp)}&deg;
                </p>
                <p className="text-xs text-slate-300">
                  H:{parseInt(weatherData.main.temp_max)}&deg; L:
                  {parseInt(weatherData.main.temp_min)}&deg;
                </p>
              </div>
            </div>
          </NavLink>
        </li>
      )}
    </>
  );
}
