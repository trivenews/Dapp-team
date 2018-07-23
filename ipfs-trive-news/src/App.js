import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from "./components/navbar";
import Footer from "./components/footer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={(props) => (<LandingPage /> )} />

          <Route exact path='/dashboard' component={(props) => (<Dashboard /> )} />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
