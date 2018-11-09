import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  &&& {
    width: 30vw;
    margin: auto;
  }
`

export default class NewUserForm extends Component {
  state = {
    newUser: {
      name: '',
      pic: ''
    },
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleChange = (e) => {
    const newUser = { ...this.state.newUser }
    newUser[e.target.name] = e.target.value
    this.setState({ newUser })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = { ...this.state.newUser }
    this.props.addNewUser(newUser)
    this.setState({
      newUser: {
        name: '',
        pic: ''
      }
    })
    this.setState({ modalOpen: false })
  }
  
  newUserModal = () => (
    <Modal trigger={<Button onClick={this.handleOpen}>Sign Up</Button>}
      open={this.state.modalOpen}>
      <Modal.Content form>
        <StyledForm onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type='text' name='name' value={this.state.newUser.name} placeholder='Username'/>
          <input onChange={this.handleChange} type='text' name='pic' value={this.state.newUser.pic} placeholder='Avatar Pic Link'/>
          <Button className='update' type='submit' value='Add User'>Submit</Button>
        </StyledForm>
      </Modal.Content>
    </Modal>
  )

  render() {
    return (
     this.newUserModal()
    )
  }
}
