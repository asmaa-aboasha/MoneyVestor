import React from 'react';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar/Navbar';
import Headline from './components/Headline/Headline';
import VisualContent from './components/VisualContent/VisualContent';
import FiveSteps from './components/FiveSteps/FiveSteps';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Headline />
        <VisualContent />
        <FiveSteps />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/trade" component={VirtualMarket} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
