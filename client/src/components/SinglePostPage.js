import React, { Component } from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import axios from 'axios'

export default class SinglePostPage extends Component {

  state = {
    post:{},
    comments:[],
    newComment: {
      body: ''
    }
  }

  getPostAndComments = async () => {
    const postId = this.props.match.params.postId
    const cityId = this.props.match.params.cityId
    const postResponse = await axios.get(`/api/cities/${cityId}/posts/${postId}`)
    const commentResponse = await axios.get(`/api/cities/${cityId}/posts/${postId}/comments`)
    this.setState({
      post: postResponse.data,
      comments: commentResponse.data,
    })
  }

  componentDidMount = () =>{
    this.getPostAndComments()
  }

  addNewComment = async (newComment) => {
    const cityId = this.props.match.params.cityId
    const postId = this.props.match.params.postId
    await axios.post(`/api/cities/${cityId}/posts/${postId}/comments`, {
      newComment,
    })
    this.getPostAndComments()
  }

  handleChange = (event) => {
    const newComment = { ...this.state.newComment }
    newComment[event.target.name] = event.target.value
    this.setState({ newComment })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newComment = { ...this.state.newComment }
    newComment.user_id = this.props.currentUser.id
    this.addNewComment(newComment)
    this.setState({
      newComment: {
        body: ''
      }
    })
    console.log("Submited")
  }

  render() {
    const post = this.state.post
    const newComment = this.state.newComment
    const comments = this.state.comments.map((comment,i) => {
      return (
        <div key={i}>
          <div>
            {comment.body}
          </div>
          <hr/>
        </div>
      )
    })
    return (
      <div>
        <h1>Single Post</h1>
        <div>
          {post.title}
        </div>
        <div>
          {post.body}
        </div><hr/>
          <Form onSubmit={this.handleSubmit}>
          <Input onChange={this.handleChange} type="text" name="body" value={newComment.body} placeholder='Write a comment...' height='50%' /><br/>
          <Button color='blue' type='submit' value='Add Comment'>Add Comment</Button>
          </Form>
        <div>
          <h3> Comments </h3>
        </div>
        {comments}
      </div>
    )
  }
}
