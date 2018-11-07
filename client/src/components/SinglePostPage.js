import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePostPage extends Component {

  state = {
    post:{},
    comments:[],
    newComment: {
      body: ''
    }
  }
  handleChange = (event) => {
    const newComment = { ...this.state.newComment }
    newComment[event.target.name] = event.target.value
    this.setState({ newComment })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newComment = { ...this.state.newPost }
    this.props.addNewComment(newComment)
    this.setState({
      newComment: {
        body: ''
      }
    })
    console.log(newComment)
  }

  getPostAndComments = async () => {
    const postId = this.props.match.params.postId
    const cityId = this.props.match.params.cityId
    const postResponse = await axios.get(`/api/cities/${cityId}/posts/${postId}`)
    const commentResponse = await axios.get(`/api/cities/${cityId}/posts/${postId}/comments`)
    this.setState({
      post:postResponse.data,
      comments: commentResponse.data,
    })
  }

  componentDidMount = () =>{
    this.getPostAndComments()
  }

  addNewComment = async (newComment) => {
    const cityId = this.props.match.params.cityId
    const postId = this.props.match.params.postId
    await axios.post(`/api/cities/${cityId}/posts/${postId}`, newComment)
    this.getPostAndComments()
  }

  render() {
    const post = this.state.post
    const comments = this.state.comments.map((comment,i) => {
      return (
        <div>
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
        <form onSumbit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name="body" value={this.state.newComment.body} placeholder='Write a comment...' height='50%' />
          <button type='submit' value='Add Comment'>Submit</button>
        </form>
        <div>
          <h3> Comments </h3>
        </div>
        {comments}
      </div>
    )
  }
}
