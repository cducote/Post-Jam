import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/signin' component={SignUpPage}/>
            <Route exact path='/user/:userId' component={ProfilePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
