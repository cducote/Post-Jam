import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ProfilePage from './components/ProfilePage';
import CitiesPage from './components/CitiesPage';
import CityPage from './components/CityPage';
import SinglePostPage from './components/SinglePostPage';
import SignUpPage from './components/SignUpPage'


class App extends Component {
  state = {
    currentUser: {
      name: 'no user'
    }
  }

  updateUser = ( userInfo ) => {
    this.setState({ currentUser: userInfo })
  }

  render() {
    // const SignUpComponent = (props) => <SignUpPage { ...props } updateUser={this.updateUser}/>
    const ProfileComponent = (props) => <ProfilePage { ...props } updateUser={this.updateUser}/>
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/signin' component={SignUpPage}/>
            <Route exact path='/user/:userId' render={ProfileComponent}/>
            <Route exact path='/cities' component={CitiesPage}/>
            <Route exact path='/city/:cityId' component={CityPage}/>
            <Route exact path='/city/:cityId/:postId' component={SinglePostPage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
