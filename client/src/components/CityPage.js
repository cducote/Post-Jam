import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Post = styled.div`
  border: 1px solid black;
  margin: 10px;
  color: black;
    .title-container {
      padding: 10px;
      font-size: 20px;
      .top {
        display: flex;
        align-items: flex-start;
        .user-name {
          font-size: 15px;
          margin-left: 5px;
        }
      }
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
      .title {
          display: flex;
          margin-top: 8px;
          font-size: 18px;
          font-weight: bold;
        }
    }
    .body {
      font-size: 14px;
      padding-left: 10px;
      padding-bottom: 10px;

    }
`
const TopRight = styled.div`
    display: flex;
    flex-direction: column;
    .sub-text {
      font-size: 12px;
      margin-left: 5px;
      color: grey;
    }
`
const CityPicture = styled.img`
    width: 100vw;
    height: 50vh;
`
const CityPostBanner = styled.div`
    margin: auto;
    font-size: 30px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
    padding: 20px;
    color: purple;
`
const NewPostForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
`
const StyledButton = styled.button`
    align-self: center;
    width: 100px;
    color: white;
    background: purple;
`

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
    const newPost = this.state.newPost
    const city = this.state.city

    const cityPosts = this.state.posts.map((post, i) => {
      return (
        
        <Post key={i}>
          <div className='title-container'>
            <div className='top'>
              <img src={post.pic} alt={post.name}/> 

              <TopRight> 
                <div className='user-name'>{post.name}</div>
                <div className='sub-text'>{post.main_instrument}</div>
              </TopRight>
             
            </div>
            <div className='title'>
            <Link to={`/cities/${city.id}/posts/${post.id}`}> {post.title} </Link>
            </div>
          </div>
          <div className='body'>
          {post.body}
          </div>
        </Post>
       
      )
    })
    return (
      <div>
        <CityPicture src={city.city_img}/>
        <CityPostBanner>{city.name} Jam Posts</CityPostBanner>
        <NewPostForm>
          <form className='form' onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} type='text' name='title' value={newPost.title} placeholder='Title'/><br/>
            <textarea rows="4" cols="50" onChange={this.handleChange} type='text' name='body' value={newPost.body} placeholder='Body'/><br/>
            <StyledButton type='submit' value='Add Post'>Submit</StyledButton>
          </form>
        </NewPostForm>

        {cityPosts}
        
      </div>
    )
  }
}
