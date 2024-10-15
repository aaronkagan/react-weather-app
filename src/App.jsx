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
          {/* <Route exact path="/" component={SplashPage} /> */}
          {/* <> */}
          <div className="flex justify-center bg-[#0b131e] items-center w-fit px-2 pt-2 pb-10">
            <main className="mx-auto h-[80vh] flex">
              <Navigation />
              <Route exact path="/" component={Home} />
              <Route exact path="/city/:cityId" component={City} />
            </main>
          </div>
          {/* </> */}
        </Switch>
      </div>
    </Router>
  );
}
