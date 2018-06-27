import React, { Component } from 'react';

import { Modal, Form, Button } from 'semantic-ui-react';

class NewRoom extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      newRoomName: '',
      modalOpen: false
    };
  }

  handleOpen()
  {
    this.setState({
      modalOpen: true
    });
  }

  handleClose()
  {
    this.setState({
      modalOpen: false,
      newRoomName: ''
    });
  }

  handleChange(e)
  {
    this.setState({
      newRoomName: e.target.value
    });
  }

  handleSubmit(e)
  {
    var newRoomName = this.state.newRoomName;
    if (newRoomName.length > 0)
    {
      this.props.createRoom(newRoomName);
      this.handleClose();
    }

    e.preventDefault();
  }

  render()
  {
    var newRoomButton = (
      <Button color="blue" onClick={() => this.handleOpen()}>New Room</Button>
    );

    return (
      <Modal open={this.state.modalOpen} onClose={() => this.handleClose()} trigger={newRoomButton}
        size="tiny" dimmer='blurring' closeIcon>
        <Modal.Header>Create New Room</Modal.Header>
        <Modal.Content>
          <Form id="newRoomForm" onSubmit={e => this.handleSubmit(e)}>
            <Form.Field>
              <label>Room Name</label>
              <input type="text" value={this.state.newRoomName} onChange={e => this.handleChange(e)} 
                placeholder="Room Name" 
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" negative onClick={() => this.handleClose()}>
            Cancel
          </Button>
          <Button type="submit" form="newRoomForm" positive icon="checkmark" labelPosition="right" content="Create" />
        </Modal.Actions>
      </Modal>
    );
  }
};

export default NewRoom;