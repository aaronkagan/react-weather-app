import ForecastTile from './ForecastTile';

export default function WeatherTiles({ weatherData, city }) {
  return (
    <div className=" flex flex-wrap bg-gradient-to-t from-[#32cef4] to-[#1f62f2] w-[1000px] h-full">
      <div className="p-5 text-center text-white border">
        <p>{weatherData.weather[0].main}</p>
        <p>{parseInt(weatherData.main.temp)}&deg;</p>
        <p>{weatherData.name}</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Feels Like</p>
        <p>{parseInt(weatherData.main.feels_like)}&deg;</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Max Temp</p>
        <p>{parseInt(weatherData.main.temp_max)}&deg;</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Min Temp</p>
        <p>{parseInt(weatherData.main.temp_min)}&deg;</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Country</p>
        <p>{weatherData.sys.country.toUpperCase()}</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
      <ForecastTile
        coords={{ lat: weatherData.coord.lat, lon: weatherData.coord.lon }}
        city={city}
      />
      <div className="p-5 text-center text-white border">
        <p>Visibility</p>
        <p>{weatherData.visibility}m</p>
      </div>
      <div className="p-5 text-center text-white border">
        {' '}
        <p>Wind</p>
        <p>{weatherData.wind.speed} km/h</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Clouds</p>
        <p>{weatherData.clouds.all}%</p>
      </div>
      <div className="p-5 text-center text-white border">
        <p>Humidity</p>
        <p>{weatherData.main.humidity}%</p>
      </div>
    </div>
  );
}
