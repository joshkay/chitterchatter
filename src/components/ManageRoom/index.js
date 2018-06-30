import React, { Component } from 'react';

import { Modal, Form, Button, Icon } from 'semantic-ui-react';

class ManageRoom extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
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
      modalOpen: false
    });
  }

  deleteRoom(e)
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
    var manageRoomButton = (
      <Button icon onClick={() => this.handleOpen()}>
        <Icon name="setting" />
      </Button>
    );

    return (
      <Modal open={this.state.modalOpen} onClose={() => this.handleClose()} trigger={manageRoomButton}
        size="tiny" dimmer='blurring' closeIcon>
        <Modal.Header>Manage Room</Modal.Header>
        
      </Modal>
    );
  }
}

export default ManageRoom;