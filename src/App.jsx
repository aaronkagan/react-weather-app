import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import City from './pages/City';
import SplashPage from './pages/SplashPage';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <>
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
