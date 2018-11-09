import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CityPage extends Component {

  state = {
    city: {},
    posts: [],
    newPost: {
      title: '',
      body: ''
    }
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

  addNewPost = async (newPost) => {
    const cityId = this.props.match.params.cityId
    await axios.post(`/api/cities/${cityId}/posts`, {
      newPost,
    })
    this.getCityAndPosts()
  }

  handleChange = (e) => {
    const newPost = { ...this.state.newPost }
    newPost[e.target.name] = e.target.value
    this.setState({ newPost })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newPost = { ...this.state.newPost }
    newPost.user_id = this.props.currentUser.id
    this.addNewPost(newPost)
    this.setState({
      newPost: {
        title: '',
        body: '',
      }
    })
  }

  render() {
    const newPost = this.state.newPost
    const city = this.state.city
    const cityPosts = this.state.posts.map((post, i) => {
      return (
        <Link to={`/city/${city.id}/${post.id}`} key={i}>
        <div>
          {post.title} | {post.body}
          <hr/>
        </div>
        </Link>
      )
    })
    return (
      <div>
        <h1>{city.name} Page</h1><hr/>
        {cityPosts}

        <div>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type='text' name='title' value={newPost.title} placeholder='Title'/><br/>
            <input onChange={this.handleChange} type='text' name='body' value={newPost.body} placeholder='Body'/><br/>
            <button type='submit' value='Add Post'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
