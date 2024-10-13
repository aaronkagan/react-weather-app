import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import HomeButton from './HomeButton';

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

    if (value) {
      try {
        setIsLoading(true);

        const { data } = await axios(
          `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${openWeatherApiKey}`
        );
        if (data.length === 0) throw error;
        const updatedCities = [...cities, value];
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
    <nav>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Add City</button>
      </form>
      {isLoading && <div>Searching for the city</div>}
      {error && <div>{error}</div>}
      <ul>
        <HomeButton />
        {cities.map((city) => {
          return <NavButton key={city} city={city} />;
        })}
      </ul>
    </nav>
  );
}
