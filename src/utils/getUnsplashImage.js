import axios from 'axios';

const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default async function getUnsplashImage(weatherData) {
  const { data } = await axios(
    `https://api.unsplash.com/search/photos?query=${weatherData.weather[0].main}&client_id=${unsplashApiKey}`
  );

  return data.results[0].urls.full;
}
