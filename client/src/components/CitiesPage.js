import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export default class CitiesPage extends Component {

  state = {
    cities: []
  }

  getCities = async () => {
    const response = await axios.get('/api/cities')
    this.setState({ cities: response.data })
  }

  componentDidMount = async () => {
    await this.getCities()
  }

  render() {
      const cityList = this.state.cities.map((city, i) => {
        return (
          <Link to={`/city/${city.id}`}>{city.name}</Link>
        )
      })
    
    return (
      <div>
        <h1>Cities Index</h1><hr/>
        {cityList}
      </div>
    )
  }
}
