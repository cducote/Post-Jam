import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: space-between;
align-items: center;
height: 50px;
font-family: 'Gill Sans', 'Gill Sans MT', sans-serif;
padding: 10px;

a {
  text-decoration: none;
  color: purple;
}
`
const BodyContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
    .title {
      color: purple;
      font-size: 80px;
      align-self: center;
      line-height: 80px;
    }
    .sub-text {
      padding: 20px;
      color: gray;
    }
`

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header>
          <Link to="/signin">Log in Sign Up</Link>
        </Header>
        <BodyContainer>
          <div className='title'>Post Jam</div>
          <div className='sub-text'>Our mission is to connect local musicians and achieve more art, create an account and get jamming!</div>
        </BodyContainer>
      </div>
    )
  }
}
