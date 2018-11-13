import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewUserForm from './NewUserForm';

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
    // const userId = this.props.match.params.userId
    await axios.post(`/api/users`, newUser)
    this.getUsers()
  }

  render() {
    const userList = this.state.users.map((user, i) => {
      return (
        <Link to={`/users/${user.id}`} key={i}>
          <div>
            {user.name}
          </div>
        </Link>
      )
    })
    return (
      <div>
        <h1>Log in Page</h1>
        Don't See your name below? <NewUserForm addNewUser={this.addNewUser}/> to get posting.
        <hr/>
        {userList}
      </div>
    )
  }
}
