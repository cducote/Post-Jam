import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        <h1>Sing in</h1><hr/>
        
        {userList}
      </div>
    )
  }
}
