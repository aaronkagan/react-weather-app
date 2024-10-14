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
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    }
  };
  return (
    <nav className="bg-[#0b131e] rounded-s-[20px] w-[300px] h-full py-5 overflow-y-scroll overscroll-y-contain">
      <div className="flex justify-center mb-5">
        <form className="w-[90%]" onSubmit={handleSubmit}>
          <input
            className="w-full p-1 outline-none text-slate-500"
            type="search"
            value={value}
            onChange={handleChange}
            placeholder={isLoading ? 'Searching for the city' : 'Add City'}
          />
        </form>
      </div>
      {/* {error && <div>{error}</div>}  */}
      <ul className="flex flex-col gap-4">
        <HomeButton />
        {cities.map((city) => {
          return <NavButton key={city} city={city} />;
        })}
      </ul>
    </nav>
  );
}
