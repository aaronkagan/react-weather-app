import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavButton from './NavButton';
import HomeButton from './HomeButton';
import capitalize from '../utils/capitalize';

const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function Navigation() {
  const [cities, setCities] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [hasDuplicate, setHasDuplicate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setHasDuplicate(false);

    if (
      value &&
      !cities.map((city) => city.toLowerCase()).includes(value.toLowerCase())
    ) {
      try {
        setIsLoading(true);

        const { data } = await axios(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${openWeatherApiKey}`
        );
        if (data.length === 0) throw error;
        const updatedCities = [...cities, capitalize(value)];
        setCities(updatedCities);
        setValue('');
        history.push(`/city/${value}`);
      } catch (error) {
        console.error(error.message);
        setError("City doesn't exist");
        setTimeout(() => {
          setError('');
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    } else {
      setHasDuplicate(true);
      setTimeout(() => {
        setHasDuplicate(false);
      }, 5000);
    }
  };

  function handleDelete(city) {
    const updatedCities = cities.filter((element) => element !== city);
    setCities(updatedCities);
  }

  return (
    <nav className="rounded-2xl w-[300px] h-full py-5 no-scrollbar overflow-y-scroll  ">
      <div className="flex justify-center mb-5 ">
        <form className="w-[90%]" onSubmit={handleSubmit}>
          <input
            className="w-full p-2 px-3 text-sm rounded outline-none  bg-[#202b3b] text-white"
            type="search"
            value={value}
            onChange={handleChange}
            placeholder={isLoading ? 'Searching for the city' : 'Add City'}
          />
        </form>
      </div>
      {error && (
        <div className=" flex items-center justify-center p-2  bg-[#202b3b] mx-auto max-w-[90%] rounded mb-5 text-red-500">
          {error}
        </div>
      )}
      {hasDuplicate && (
        <div className="flex items-center justify-center p-2  bg-[#202b3b] mx-auto max-w-[90%] rounded mb-5 text-red-500">
          <p>Can't add the same city twice</p>
        </div>
      )}
      <ul className="flex flex-col gap-4 ">
        <HomeButton />
        {cities.map((city) => {
          return (
            <NavButton key={city} city={city} handleDelete={handleDelete} />
          );
        })}
      </ul>
    </nav>
  );
}
