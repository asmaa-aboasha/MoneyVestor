import React from 'react';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import LoginForm from './pages/Login/Login';
import SignupForm from './pages/SignUp/SignUp';


function App() {
  return (
    <Router>
      <div>
        <Navbar
          alignLinks="right"
          brand={<a className="brand-logo" href="/">This is a placeholder Nav</a>}
          id="mobile-nav"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: 'left',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
        >
          <NavItem href="/">
            Search
            </NavItem>
          <NavItem href="/saved">
            Saved
          </NavItem>

        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/trade" component={VirtualMarket} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
