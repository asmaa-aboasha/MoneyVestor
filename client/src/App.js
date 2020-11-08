import React from 'react';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
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
