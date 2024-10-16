import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import capitalize from '../utils/capitalize';
import getWeather from '../utils/getWeather';
import getCoords from '../utils/getCoords';

export default function NavButton({ city, handleDelete }) {
  const [weatherData, setWeatherData] = useState();

  async function getWeatherData() {
    const { lat, lon } = await getCoords(city);

    const data = await getWeather({ lat, lon });

    setWeatherData(data);
  }

  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
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
