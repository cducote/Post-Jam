import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import EditUserForm from './EditUserForm'
import { Link } from 'react-router-dom'


const Img = styled.img`
  border-radius: 50%;
  width: 235px;
  height: 235px;
  min-height: 20px;
  @media (max-width: 720px) {
    height: 100px;
    width: 100px;
  }
`
export default class ProfilePage extends Component {

  state = {
    user: {}
  }

  getUser = async () => {
    const userId = this.props.match.params.userId
    const response = await axios.get(`/api/users/${userId}`)
    this.setState({ user: response.data })
    this.props.updateUser(this.state.user)
  }

  componentDidMount = () => {
    this.getUser()
  }

  render() {
    // const userId = this.state.user.id
    const user = this.state.user
    return (
      <div>
        <h1>Profile Page {user.name}</h1><hr/>
        <div>
          <Img src={user.pic} alt={user.name}/>
          <li>age: {user.age}</li>
          <li>main_instrument: {user.main_instrument}</li>
          <li>influences: {user.influences}</li>
          <li>skills: {user.skills}</li>
          <li>gear: {user.gear}</li>
          <li>location: {user.location}</li>
          <li>bio: {user.bio}</li>
        </div>
        <Link to='/cities'>Cities</Link>
        <EditUserForm 
          editUser={this.editUser}
          user={this.state.user}
          userId={this.state.user.id}
          push={this.props.history.push}
          currentUser={this.setState.currentUser}
          getUser={this.getUser}
          />
      </div>
    )
  }
}
