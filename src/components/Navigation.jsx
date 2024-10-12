import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Navigation() {
  const [cities, setCities] = useState();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(async (position) => {});
    }
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value) {
      try {
        setIsLoading(true);
        // If this user doesn't exist, the error will be catch will be triggered and the code below that adds the user to the nav bar will be skipped
        await axios(`https://api.github.com/users/${value}`);
        const updatedUsers = [...users, value];
        setUsers(updatedUsers);
        setValue('');
      } catch (error) {
        setError(`${error.message}  : User doesn't exist`);
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
        <button type="submit">Add User</button>
      </form>
      {isLoading && <div>Searching for the user</div>}
      {error && <div>{error}</div>}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {users.map((userId) => (
          <li key={userId}>
            <Link to={`/user/${userId}`}>{userId}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
