import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import City from './pages/City';

const cities = ['london', 'paris']; // make this list dynamic, aka hate it as state in app

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {cities.map((city) => (
              <li key={city}>
                <Link to={`/city/${city}`}>{city}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/city/:cityId" component={City} />
        </Switch>
      </div>
    </Router>
  );
}
