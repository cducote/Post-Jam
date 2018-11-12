import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import EditUserForm from './EditUserForm'
import { Link } from 'react-router-dom'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
    .profile {
      padding-left: 20px;
    }
    .link {
      align-self: center;
      font-size: 15px;
      padding-right: 20px;
    }
`

const Img = styled.img`
  padding: 20px;
  border-radius: 50%;
  width: 235px;
  height: 235px;
  min-height: 20px;
  @media (max-width: 720px) {
    height: 100px;
    width: 100px;
  }
`
const Profile = styled.div`
  display: flex;
    .attributes {
      margin-left: 20px;
      padding: 30px;
      font-size: 20px;
      line-height: 30px;
    }
`
const EditButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
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
    const user = this.state.user
    return (
      <div>
        <Header>
          <div className='profile'><h1>{user.name}'s Page</h1></div>
          <div className='link'><Link to='/cities'>Cities</Link></div>
        </Header>
        <hr/>
        
        <Profile>
        <div>
          <Img src={user.pic} alt={user.name}/>
        </div>
          <div className='attributes'>
          <li>Age: {user.age}</li>
          <li>Main Instrument: {user.main_instrument}</li>
          <li>Influences: {user.influences}</li>
          <li>Skills: {user.skills}</li>
          <li>Gear: {user.gear}</li>
          <li>Location: {user.location}</li>
          <li>Bio: {user.bio}</li>
        </div>
        </Profile>
        <EditButtonContainer>
        <EditUserForm 
          editUser={this.editUser}
          user={this.state.user}
          userId={this.state.user.id}
          push={this.props.history.push}
          currentUser={this.setState.currentUser}
          getUser={this.getUser}
          />
        </EditButtonContainer>
      </div>
    )
  }
}
