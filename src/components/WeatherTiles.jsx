import { useEffect, useState } from 'react';
import ForecastTile from './ForecastTile';
import capitalize from '../utils/capitalize';

import { createClient } from 'pexels';

const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY;

const client = createClient(pexelsApiKey);

export default function WeatherTiles({ weatherData, city }) {
  const [bgImage, setBgImage] = useState();

  // const query = 'Clear Sky';
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
    <div className=" overflow-y-scroll bg-[#0b141d] w-[1000px] ">
      <div
        className="flex flex-col items-center w-full p-5 text-center text-[#7f8690] "
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p className="text-3xl">
          {(city && capitalize(city)) || weatherData.name}
        </p>
        <p className="text-3xl">{parseInt(weatherData.main.temp)}&deg;</p>
        <p>{capitalize(weatherData.weather[0].description)}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b] text-center text-[#7f8690] rounded  ">
          <p>Feels Like</p>
          <p>{parseInt(weatherData.main.feels_like)}&deg;</p>
        </div>
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b] text-center text-[#7f8690] rounded">
          <p>Max Temp</p>
          <p>{parseInt(weatherData.main.temp_max)}&deg;</p>
        </div>
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b]  text-center text-[#7f8690] rounded">
          <p>Min Temp</p>
          <p>{parseInt(weatherData.main.temp_min)}&deg;</p>
        </div>
        <div className="w-40 h-12 flex items-center justify-center gap-5  p-5 bg-[#202b3b]  text-center text-[#7f8690] rounded">
          <p>Country</p>
          <p>{weatherData.sys.country.toUpperCase()}</p>
        </div>
      </div>

      <ForecastTile
        coords={{ lat: weatherData.coord.lat, lon: weatherData.coord.lon }}
        city={city}
      />
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
      </div>
    </div>
  );
}
