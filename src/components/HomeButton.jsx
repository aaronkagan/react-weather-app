import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import kToC from '../utils/kToC';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function HomeButton() {
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
    <li>
      {weatherData ? (
        <div>
          <Link to={`/city/home`}>
            <div className="text-white bg-[#1f62f2] w-[90%] h-[100px] mx-auto p-2 flex justify-between rounded">
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <p className="font-bold">
                    {weatherData.name}
                    <>
                      <br />
                      <span className="text-xs text-slate-200">
                        Current Location
                      </span>
                    </>
                  </p>
                  {/* <p className="text-xs text-slate-300">5:39PM</p> */}
                </div>
                <p className="text-xs text-slate-300">
                  {weatherData.weather[0].main}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-[2rem] font-extralight mt-[-8px]">
                  {kToC(weatherData.main.temp)}&deg;
                </p>
                <p className="text-xs text-slate-300">
                  H:{kToC(weatherData.main.temp_max)}&deg; L:
                  {kToC(weatherData.main.temp_min)}&deg;
                </p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="text-white bg-[#1f62f2] w-[90%] h-[100px] mx-auto p-2 rounded flex items-center justify-center">
          <p className="text-center ">Loading Current Location...</p>
        </div>
      )}
    </li>
  );
}
