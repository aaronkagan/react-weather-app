import axios from 'axios';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default async function getCoords(city) {
  try {
    const { data: coords } = await axios(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openWeatherApiKey}`
    );

    return coords[0];
  } catch (error) {
    console.log(error);
  }
}
