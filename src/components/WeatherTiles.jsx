import ForecastTile from './ForecastTile';
import capitalize from '../utils/capitalize';
import { useEffect, useState } from 'react';
import axios from 'axios';

const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function WeatherTiles({ weatherData, city }) {
  const [weatherImage, setWeatherImage] = useState();

  async function fetchImage() {
    setWeatherImage();
    const { data } = await axios(
      `https://api.unsplash.com/search/photos?query=${weatherData.weather[0].main}&client_id=${unsplashApiKey}
`
    );

    setWeatherImage(data.results[0].urls.full);
  }

  useEffect(() => {
    fetchImage();
  }, [weatherData]);

  function convertToLocalTime(timezoneOffset) {
    const utcDate = new Date();
    const offsetInMilliseconds = timezoneOffset * 1000;
    const localDate = new Date(utcDate.getTime() + offsetInMilliseconds);
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    if (hours > 12) {
      return `${hours - 12}:${minutes} PM`;
    }
    if (hours < 10) {
      return `${hours[1]}:${minutes} AM`;
    }
    return `${hours}:${minutes} AM`;
  }

  return (
    <div className="bg-[#0b131e] w-[1000px] flex gap-10 justify-between px-5">
      <div className="col-left w-[66%]">
        <div className={'flex gap-56 w-full p-5 text-[#7f8690] h-[50%] '}>
          <div className="flex flex-col items-start w-full">
            <div>
              <p className="mb-3 text-3xl text-white">
                {(city && capitalize(city)) || weatherData.name}
              </p>
              <p>{capitalize(weatherData.weather[0].description)}</p>
            </div>

            <p className="mt-0 text-[5rem] text-white">
              {parseInt(weatherData.main.temp)}&deg;
            </p>
            <p className="text-3xl">
              {convertToLocalTime(weatherData.timezone)}
            </p>
          </div>

          <img
            src={`https://openweathermap.org/img/wn/${
              weatherData.weather[0].icon[0] +
              weatherData.weather[0].icon[1] +
              'd'
            }@2x.png`}
            className="object-cover h-[200px] self-start"
          />
        </div>

        <div className="grid w-full grid-cols-2 gap-4 h-[50%]">
          <WeatherTile text="Feels Like" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.feels_like)}&deg;</span>}
          </WeatherTile>
          <WeatherTile text="Max Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_max)}&deg;</span>}
          </WeatherTile>
          <WeatherTile text="Min Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_min)}&deg;</span>}
          </WeatherTile>
          <WeatherTile
            text="Country"
            icon={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`}
          >
            {<span>{weatherData.sys.country.toUpperCase()}</span>}
          </WeatherTile>
          <WeatherTile
            text="Visibility"
            icon="/assets/images/icons/visibility.png"
          >
            {<span>{parseInt(weatherData.visibility * 0.3048)}m</span>}
          </WeatherTile>
          <WeatherTile text="Wind" icon="/assets/images/icons/wind.png">
            {<span>{weatherData.wind.speed} km/h</span>}
          </WeatherTile>
          <WeatherTile text="Clouds" icon="/assets/images/icons/clouds.png">
            {<span>{weatherData.clouds.all}%</span>}
          </WeatherTile>
          <WeatherTile text="Humidity" icon="/assets/images/icons/humidity.png">
            {<span>{weatherData.main.humidity}%</span>}
          </WeatherTile>
        </div>
      </div>

      <div className="col-right gap-5 pt-5 w-[33%] flex flex-col justify-between">
        <div className="w-full h-full">
          {weatherImage && (
            <img
              src={weatherImage}
              alt="Weather Conditions"
              className="object-cover w-full h-[275px]"
            />
          )}
        </div>

        <div className="h-[70%]">
          <ForecastTile
            coords={{ lat: weatherData.coord.lat, lon: weatherData.coord.lon }}
            city={city || weatherData.name}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherTile({ icon, text, children }) {
  return (
    <div className="w-full flex items-center justify-start px-5 gap-10 bg-[#202b3b] text-center rounded-xl  ">
      <div className="flex justify-center w-12">
        <img src={icon} className="h-10" />
      </div>

      <div className="flex flex-col items-start">
        <p className="text-text-color">{text}</p>
        <p className="text-2xl font-bold text-white">{children}</p>
      </div>
    </div>
  );
}
