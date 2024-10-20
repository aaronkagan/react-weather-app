import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavButton from './NavButton';
import HomeButton from './HomeButton';
import capitalize from '../utils/capitalize';
import getCoords from '../utils/getCoords';

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
    setError(false);

    if (
      value &&
      !cities.map((city) => city.toLowerCase()).includes(value.toLowerCase())
    ) {
      try {
        setIsLoading(true);

        // Checking if city exists
        const coords = await getCoords(value);
        if (coords === undefined) throw error;

        const updatedCities = [...cities, capitalize(value)];
        setCities(updatedCities);
        localStorage.setItem('cities', JSON.stringify(updatedCities));
        setValue('');
        history.push(`/city/${value}`);
      } catch (error) {
        console.error(error.message);
        setError("City doesn't exist");
        setValue('');
        setTimeout(() => {
          setError('');
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    } else {
      setHasDuplicate(true);
      setValue('');
      setTimeout(() => {
        setHasDuplicate(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('cities')) {
      setCities(JSON.parse(localStorage.getItem('cities')));
    }
  }, []);

  function handleDelete(city) {
    const updatedCities = cities.filter((element) => element !== city);
    setCities(updatedCities);
    localStorage.setItem('cities', JSON.stringify(updatedCities));
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
