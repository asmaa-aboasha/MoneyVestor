import React from 'react';
import VirtualMarket from './pages/VirtualMarket/VirtualMarket';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/StockAPI/API";


function App() {
  // API.createUser("John Edwards", 10000);
  // API.getUserById("5fa9f9a9f368650950b68be8").then(result => console.log(result.data));
  // API.getUserByName("John Edwards").then(({ data }) => {
  //   const portfolioAdd = {stockId: "AAPL", shares: 1, initDate: new Date(Date.now()), initPrice: 100, currPrice: 101}
  //   const newFunds = 7500;
  //   API.updateUser(data, portfolioAdd, newFunds)
  //   .then(res => console.log(res));
  // });
  //   API.getUserByName("Dummy User").then(({ data }) => {
  //   if(data !== null){
  //     API.deleteUser(data._id);
  //   }
  // });
  // API.getStockData("MSFT", 60).then(res => console.log(res));

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
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
