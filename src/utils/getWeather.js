import axios from 'axios';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default async function getWeather({ lat, lon }) {
  const { data } = await axios(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
  );
  return data;
}
