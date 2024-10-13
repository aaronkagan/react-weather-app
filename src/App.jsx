import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import City from './pages/City';
import SplashPage from './pages/SplashPage';

// const cities = ['london', 'paris']; // make this list dynamic, aka hate it as state in app
const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          {' '}
          <>
            <Route exact path="/" component={SplashPage} />
            <div className="flex gap-20">
              <Navigation />
              <Route exact path="/home" component={Home} />
              <Route exact path="/city/:cityId" component={City} />
            </div>
          </>
        </Switch>
      </div>
    </Router>
  );
}

function Navigation() {
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
        console.log(error.message);
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
      {<div>{error}</div>}
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {cities.map((city) => {
          return <NavButton key={city} city={city} />;
        })}
      </ul>
    </nav>
  );
}

function NavButton({ city }) {
  return (
    <li>
      <Link to={`/city/${city}`}>{city}</Link>
    </li>
  );
}
