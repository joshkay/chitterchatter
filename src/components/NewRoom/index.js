import React, { Component } from 'react';

import { Grid, Modal, Form, Button } from 'semantic-ui-react';

class NewRoom extends Component 
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
    var newRoomButton = (
      <Button color="blue">New Room</Button>
    );

    return (
      <Modal size="tiny" trigger={newRoomButton}>
        <Modal.Header>Create New Room</Modal.Header>
        <Modal.Content>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Field>
              <label>Room Name</label>
              <input type="text" value={this.state.value} onChange={e => this.handleChange(e)} 
                placeholder='Room Name' 
              />
            </Form.Field>
            <div>
              <Button type='submit' color="blue">Create</Button>
              <Button type='cancel' negative>Cancel</Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
};

export default NewRoom;