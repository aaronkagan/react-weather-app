import { useEffect, useState } from 'react';
import ForecastTile from './ForecastTile';
import capitalize from '../utils/capitalize';

import { createClient } from 'pexels';

const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;

const client = createClient(pexelsApiKey);

export default function WeatherTiles({ weatherData, city }) {
  const [bgImage, setBgImage] = useState();

  const query = weatherData.weather[0].main + ' sky';

  async function getBgImage() {
    const photos = await client.photos.search({ query, per_page: 1 });
    setBgImage(photos.photos[0].src.small);
  }
  useEffect(() => {
    setBgImage('');
    getBgImage();
  }, [weatherData]);

  return (
    <div className="bg-[#0b131e] w-[1000px] flex gap-10 justify-between px-5">
      <div className="col-left w-[66%]">
        <div className={'flex gap-56 w-full p-5 text-[#7f8690] h-[50%] '}>
          <div className="flex flex-col items-start">
            <div>
              <p className="mb-3 text-3xl text-white">
                {(city && capitalize(city)) || weatherData.name}
              </p>
              <p>{capitalize(weatherData.weather[0].description)}</p>
            </div>

            <p className="mt-0 text-[5rem] text-white">
              {parseInt(weatherData.main.temp)}&deg;
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
          <WeatherTile text="Max Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_max)}&deg;</span>}
          </WeatherTile>
          <WeatherTile text="Max Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_max)}&deg;</span>}
          </WeatherTile>
          <WeatherTile text="Max Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_max)}&deg;</span>}
          </WeatherTile>
          <WeatherTile text="Max Temp" icon="/assets/images/icons/temp.png">
            {<span>{parseInt(weatherData.main.temp_max)}&deg;</span>}
          </WeatherTile>
        </div>

        {/* 
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-card-gradient text-center text-[#7f8690] rounded">
          <p>Country</p>
          <p>{weatherData.sys.country.toUpperCase()}</p>
        </div>
        <div className="p-5 text-center text-[#7f8690] border">
          <p className="flex items-center justify-center">Visibility</p>
          <p>{weatherData.visibility}m</p>
        </div>
        <div className="p-5 text-center text-[#7f8690] border">
          {' '}
          <p>Wind</p>
          <p>{weatherData.wind.speed} km/h</p>
        </div>
        <div className="p-5 text-center text-[#7f8690] border">
          <p>Clouds</p>
          <p>{weatherData.clouds.all}%</p>
        </div>
        <div className="p-5 text-center text-[#7f8690] border">
          <p>Humidity</p>
          <p>{weatherData.main.humidity}%</p>
        </div> */}
      </div>

      <div className="col-right gap-5 pt-5 w-[33%] flex flex-col justify-between">
        <div className="w-full h-full">
          <img
            src={bgImage}
            alt="Weather Conditions"
            className="object-cover w-full h-[275px]"
          />
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
    <div className="w-full flex items-center flex-start px-5 gap-5 bg-[#202b3b] text-center rounded-xl  ">
      <div className="flex flex-col justify-between">
        <img src={icon} className="h-10" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-text-color">{text}</p>
        <p className="text-2xl text-white">{children}</p>
      </div>
    </div>
  );
}
