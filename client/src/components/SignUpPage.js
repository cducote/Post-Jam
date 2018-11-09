import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import NewUserForm from './NewUserForm';

// const StyledForm = styled(Form)`
//   &&& {
//     width: 30vw;
//     margin: auto;
//   }
// `

export default class SignUpPage extends Component {

  state = {
    users: []
  }

  getUsers = async() => {
    const response = await axios.get('/api/users')
    this.setState({ users: response.data })
  }

  componentDidMount = async () => {
    await this.getUsers()
  }

  addNewUser = async (newUser) => {
    const userId = this.props.match.params.userId
    await axios.post(`/api/users`, newUser)
    this.getUsers()
  }

  render() {
    const userList = this.state.users.map((user, i) => {
      return (
        <Link to={`/user/${user.id}`} key={i}>
          <div>
            {user.name}
          </div>
        </Link>
      )
    })
    return (
      <div>
        <h1>Sing in</h1>
        <p>Don't See your name below? <NewUserForm addNewUser={this.addNewUser}/> to get posting.</p>
        <hr/>
        
        {userList}
      </div>
    )
  }
}
