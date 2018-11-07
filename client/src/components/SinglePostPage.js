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
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
