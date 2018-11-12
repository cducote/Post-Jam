import React, { Component } from 'react'
import { Form, Button, Input, Accordion } from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  &&& {
    width: 500px;
  }
  `
const Post = styled.div`
  text-align: left;
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
    .comments-accordian {
      padding: 10px;
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
const CommentBox = styled.div`
    padding: 10px;
    border: 1px solid lightgrey;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
      .top {
        display: flex;
        align-items: flex-start;
      }
      .user-name {
          font-size: 15px;
          margin-left: 5px;
        }
      .body {
      font-size: 14px;
      padding-left: 10px;
      padding-bottom: 10px;
      padding-top: 10px;
      background: lightgray;
      margin-top: 10px;
      border-radius: 500px;
    }
`
const PageHead = styled.div`
    text-align: center;
`

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
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const post = this.state.post
    const newComment = this.state.newComment
    const comments = this.state.comments.map((comment,i) => {
      return (
        <CommentBox key={i}>
          <div className='top'>
            <img src={comment.pic} alt={comment.name}/>

            <TopRight>
              <div className='user-name'>{comment.name}</div>
              <div className='sub-text'>{comment.main_instrument}</div>
            </TopRight> 
            
          </div>
            <div className='body'>
            {comment.body}
            </div>
        </CommentBox>
      )
    })
    return (
      <PageHead>
      <h2>Reply to this post</h2>
      <Post>
        <div className='title-container'>
          {post.title}
        </div>
        <div className='body'>
          {post.body}
        </div>
        <div className='comments-accordian'>
        <Accordion>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          Comments
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
      
          <Form onSubmit={this.handleSubmit}>
          <StyledInput onChange={this.handleChange} type="text" name="body" value={newComment.body} placeholder='Write a comment...' height='50%' />
          <Button color='blue' type='submit' value='Add Comment'>Add Comment</Button>
          </Form>

          {comments.reverse()}
        </Accordion.Content>
        </Accordion>
        </div>




          
        
      </Post>
      </PageHead>
    )
  }
}
