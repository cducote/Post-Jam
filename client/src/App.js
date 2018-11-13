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
    const ProfileComponent = (props) => <ProfilePage { ...props } updateUser={this.updateUser}/>
    // const EditProfileComponent = (props) => <EditUserForm { ...props } currentUser={this.state.currentUser}/>
    const CityComponent = (props) => <CityPage { ...props } currentUser={this.state.currentUser}/>
    const PostComponent = (props) => <SinglePostPage { ...props } currentUser={this.state.currentUser}/>

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/signin' component={SignUpPage}/>
            <Route exact path='/users/:userId' render={ProfileComponent}/>
            <Route exact path='/cities' component={CitiesPage}/>
            <Route exact path='/cities/:cityId' render={CityComponent}/>
            <Route exact path='/cities/:cityId/posts/:postId' render={PostComponent}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
