import React, { Component } from 'react';

class NewRoomForm extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange(e)
  {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e)
  {

  }

  render()
  {
    return (
      <form onSubmit={e => this.handleSubmit}>
        <label>
          Enter a room name
          <input type="text" value={this.state.value} 
            onChange={e => this.handleChange} 
          />
        </label>
        <input type="button" value="Cancel" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewRoomForm;