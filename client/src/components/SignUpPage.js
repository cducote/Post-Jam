import React, { Component } from 'react'
import axios from 'axios'

export default class SignUpPage extends Component {

  state = {
    users: {}
  }

  getUsers = async() => {
    const response = await axios.get('/api/users')
    this.setState({ users: response.data })
  }

  componentDidMount = async () => {
    await this.getUsers()
  }
  render() {
    return (
      <div>
        <h1>Sing in</h1><hr/>
      </div>
    )
  }
}
