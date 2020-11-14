import React, {Component} from 'react';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';
import LoginForm from './pages/Login/Login';
import SignupForm from './pages/SignUp/SignUp';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/api/user/').then(response => {
      // console.log('Get user response: ')
      // console.log(response.data)
      if (response.data.user) {
        // console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        // console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
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
            <Route exact path="/login" component={() => <LoginForm updateUser={this.updateUser} />} />
            <Route exact path="/signup" component={SignupForm} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
