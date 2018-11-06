import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CityPage extends Component {

  state = {
    city: {},
    posts: []
  }

  getCityAndPosts = async () => {
    const cityId = this.props.match.params.cityId
    const cityResponse = await axios.get(`/api/cities/${cityId}`)
    const postResponse = await axios.get(`/api/cities/${cityId}/posts`)
    this.setState({
      city: cityResponse.data,
      posts: postResponse.data
    })
  }

  componentDidMount = () => {
    this.getCityAndPosts()
  }
  
  render() {
    const city = this.state.city
    const cityPosts = this.state.posts.map((post, i) => {
      return (
        <div>
          {post.title} | {post.body}
        </div>
      )
    })
    return (
      <div>
        <h1>City Page</h1><hr/>
        {cityPosts}
      </div>
    )
  }
}
