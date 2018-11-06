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
  color: black;
}
`

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header>
          <Link to="/signin">Log in Sign Up</Link>
        </Header>
        Im in here!
      </div>
    )
  }
}
