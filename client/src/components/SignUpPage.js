import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

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


  render() {
    const userList = this.state.users.map((user, i) => {
      return (
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      )
    })
    return (
      <div>
        <h1>Sing in</h1>
        <p>Don't See your name below? <button onclick={this.handleSubmit}>Sign Up</button> to get posting.</p>
        <hr/>
        
        {userList}
      </div>
    )
  }
}
