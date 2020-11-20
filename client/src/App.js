import React, { Component } from 'react';
import Home from './pages/Home/Home';
import SignupForm from './pages/SignUp/SignUp';
import LoginForm from './pages/Login/Login';
import InvestingBasics from './pages/InvestingBasics/InvestingBasics';
import Tutorial from './pages/Tutorial/Tutorial';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import NoMatch from './pages/NoMatch';
import Navbar from './components/Navbar/Navbar';
// import { Navbar, NavItem, Icon } from 'react-materialize';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';

import API from './utils/StockAPI/API';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      user: {}
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
    //console.log(API.getCurrentValues(["PG","BIG","MSFT","AAPL"]))//,"C","DAL","GOOG", "SNAP", "FB", "TSLA", "SO", "COST"]));
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  async getUser() {
    await axios.get('/api/user/').then(response => {
      // console.log('Get user response: ')
      // console.log(response.data) password can be viewed if this isn't commented out
      if (response.data.user) {
        // console.log('Get User: There is a user saved in the server session: ')
        // console.log(response.data)
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          user: response.data.user
        })
      } else {
        // console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          user: {}
        })
      }
    })
  }

  logoutUser() {
    axios.get('/api/logout');
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Navbar
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
            <NavItem href="/login">
              Login
            </NavItem>
            <NavItem href="/signup">
              SignUp
            </NavItem>
            <NavItem href="/" onClick={this.logoutUser}>
              Logout
            </NavItem>

          </Navbar> */}
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/investing-basics" component={InvestingBasics} />
            <Route exact path="/how-it-works" component={Tutorial} />
            <Route exact path="/trade" component={() => <VirtualMarket getUser={this.getUser} user={this.state.user} />} />
            <Route exact path="/login" component={() => <LoginForm updateUser={this.updateUser} user={this.state.user} />} />
            <Route exact path="/signup" component={SignupForm} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
