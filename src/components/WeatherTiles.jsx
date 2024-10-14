import { useEffect, useState } from 'react';
import ForecastTile from './ForecastTile';
import capitalize from '../utils/capitalize';

import { createClient } from 'pexels';

const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;

const client = createClient(pexelsApiKey);

export default function WeatherTiles({ weatherData, city }) {
  const [bgImage, setBgImage] = useState();

  const query = 'Clear Sky';
  // const query = weatherData.weather[0].main + ' sky';

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
        <div
          className={
            'flex flex-col items-center w-full p-5 text-center text-[#7f8690] h-[50%] ' +
            `bg-[url${bgImage}]`
          }
        >
          <p className="text-3xl">
            {(city && capitalize(city)) || weatherData.name}
          </p>
          <p className="text-3xl">{parseInt(weatherData.main.temp)}&deg;</p>
          <p>{capitalize(weatherData.weather[0].description)}</p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 h-[50%]">
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
          <WeatherTile weatherData={weatherData} />
        </div>

        {/* <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b] text-center text-[#7f8690] rounded">
          <p>Max Temp</p>
          <p>{parseInt(weatherData.main.temp_max)}&deg;</p>
        </div>
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b]  text-center text-[#7f8690] rounded">
          <p>Min Temp</p>
          <p>{parseInt(weatherData.main.temp_min)}&deg;</p>
        </div>
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

      <div className="col-right w-[33%]">
        <div className="h-[50%]"></div>

        <div className="h-[50%]">
          <ForecastTile
            coords={{ lat: weatherData.coord.lat, lon: weatherData.coord.lon }}
            city={city || weatherData.name}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherTile({ weatherData }) {
  return (
    <div className="w-full flex items-center flex-start px-5 gap-5 bg-[#202b3b] text-center rounded-xl  ">
      <div className="flex items-start">
        <svg
          viewBox="0 0 256 512"
          style={{
            width: 24,
            height: 24,
            overflow: 'visible',
            opacity: 1,
            zIndex: 1,
            fill: 'rgb(147, 153, 162)',
          }}
        >
          <path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V224c0-17.673 14.327-32 32-32s32 14.327 32 32v104.583c19.124 11.068 32 31.732 32 55.417zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z" />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-text-color">Feels Like</p>
        <p className="text-white">
          {parseInt(weatherData.main.feels_like)}&deg;
        </p>
      </div>
    </div>
  );
}
