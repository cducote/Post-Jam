import React, { Component } from 'react'
import { Form, Button, Modal, Input } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'

const StyledForm = styled(Form)`
  &&& {
    width: 30vw;
    margin: auto;
    display: flex;
    flex-direction: column
  }
`

export default class EditUserForm extends Component {
  state = {
    editUser: {
      name: '',
      pic: '',
      age: '',
      location: '',
      main_instrument: '',
      skills: '',
      gear: '',
      influences: '',
      bio: ''
    },
    modelOpen: false
  }

  handleChange = (e) => {
    const editUser = { ...this.state.editUser }
    editUser[e.target.name] = e.target.value
    this.setState({ editUser })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const userId = this.props.userId
    const editUser = { ...this.state.editUser }
    await axios.put(`/api/users/${userId}`, editUser)
    this.props.push(`/user/${userId}`)
    this.setState({ modalOpen: false })
    await this.props.getUser()
  }  

  handleOpen = () => this.setState({ modelOpen: true })
  
  editUserModal = () => (
    <Modal trigger={<Button onClick={this.handleOpen}>Edit Profile</Button>}
      open={this.state.modalOpen}>
      <Modal.Content>
        <StyledForm onSubmit={this.handleSubmit}>
          <Input onChange={this.handleChange} type='text' name='name' value={this.state.editUser.name} placeholder={this.props.user.name}/>
          <Input onChange={this.handleChange} type='text' name='pic' value={this.state.editUser.pic} placeholder={this.props.user.pic}/>
          <Input onChange={this.handleChange} type='text' name='age' value={this.state.editUser.age} placeholder='Age'/>
          <Input onChange={this.handleChange} type='text' name='location' value={this.state.editUser.location} placeholder='Location'/>
          <Input onChange={this.handleChange} type='text' name='main_instrument' value={this.state.editUser.main_instrument} placeholder='Main Instrument'/>
          <Input onChange={this.handleChange} type='text' name='skills' value={this.state.editUser.skills} placeholder='Skills'/>
          <Input onChange={this.handleChange} type='text' name='gear' value={this.state.editUser.gear} placeholder='Gear'/>
          <Input onChange={this.handleChange} type='text' name='influences' value={this.state.editUser.influences} placeholder='Influences'/>
          <Input onChange={this.handleChange} type='text' name='bio' value={this.state.editUser.bio} placeholder='Bio'/>
          <Button color='green' type='submit' value='Add User'>Submit</Button>
        </StyledForm>
      </Modal.Content>
    </Modal>
  )

  render() {
    return (
        this.editUserModal()
    )
  }
}
