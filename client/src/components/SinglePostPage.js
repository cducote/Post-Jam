import React, { Component } from 'react'
import axios from 'axios'

export default class SinglePostPage extends Component {

  state = {
    post:{},
    comments:[]
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


  render() {
    const post = this.state.post
    const comments = this.state.comments.map((comment,i) => {
      return (
        <div>
          <div>
            {comment.body}
          </div>
        </div>
      )
    })
    return (
      <div>
        <div>
          {post.title}
        </div>
        <div>
          {post.body}
        </div><hr/>
        <div>
          <h3> Comments </h3>
        </div>
        {comments}
      </div>
    )
  }
}
