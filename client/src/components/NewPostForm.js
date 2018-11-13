import React, { Component } from 'react'
import { Form, Button, Modal, Input } from 'semantic-ui-react'
import styled from 'styled-components'

export default class NewPostForm extends Component {
  state = {
    newPost: {
      title: '',
      body: ''
    },
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleChange = (e) => {
    const newPost = { ...this.state.newPost }
    newPost[e.target.name] = e.target.value
    this.setState({ newPost })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newPost = { ...this.state.newPost }
    newPost.user_id = this.props.currentUser.id
    newPost.user_pic = this.props.currentUser.pic
    this.addNewPost(newPost)
    this.setState({
      newPost: {
        title: '',
        body: '',
      }
    })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
