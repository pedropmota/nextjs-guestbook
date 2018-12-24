import React from 'react'
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import InputContainer from '../InputContainer/InputContainer';

export default class GuestbookForm extends React.Component {

  static propTypes = {
    addAlert: PropTypes.func,
  }

  state = {
    message: '',
    name: ''
  }

  onInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    const { addAlert } = this.props
    const { name, message } = this.state 

    event.preventDefault()

    if (!name) {
      return addAlert('Please enter your name', 'error')
    }
    if (!message) {
      return addAlert(`Don't forget to type your message!`, 'error')
    }

    try {

      await this.doPostRequest({ name, message });

    } catch (e) { 
      return addAlert(`There was an error processing your request: ${e}`)
    }

    addAlert('Message added successfully! Thank you for posting :)');

    this.setState({
      name: '',
      message: ''
    })
  }

  doPostRequest({ name, message }) {
    return fetch('/api/guestbook', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          message
        })
    })
  }


  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
      
        <h2>Guestbook</h2>

        <InputContainer
          label="your name">

          <input
            type="text"
            name="name"
            onChange={this.onInputChange}
            value={this.state.name}
            placeholder="Enter your name" />

        </InputContainer>


        <InputContainer
          label="message">
          <textarea
            name="message"
            onChange={this.onInputChange}
            rows="8"
            value={this.state.message}
            placeholder="Your message goes here" />
          
        </InputContainer>

        <style jsx>{`
          form {
            max-width: 400px;
            margin: 0 auto 20px;;
          }

          textarea, input[type=text] {
            width: 100%;
            border: 1px solid gray;
            border-radius: 3px;
            padding: 4px 8px;
            display: block;
          }

        `}</style>
        


        {/* <TextInput
          inputName="message"
          value={this.state.message}
          placeHolder="Enter your message"
          onChange={this.onInputChange} /> */}

          <input type="submit" value="Send message"/>

      </form>
      )
  }
}