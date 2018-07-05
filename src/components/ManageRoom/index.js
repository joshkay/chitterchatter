import React, { Component } from 'react';

import { Modal, Button, Icon } from 'semantic-ui-react';

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
    this.handleClose();

    this.messagesRef = this.props.firebase.database().ref(`messages/${this.props.activeRoom.key}`);
    this.messagesRef.remove();

    this.roomsRef = this.props.firebase.database().ref(`rooms/${this.props.activeRoom.key}`);
    this.roomsRef.remove();

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
        size="tiny" closeIcon>
        <Modal.Header>Manage Room</Modal.Header>
        <Modal.Content>
          <Button negative icon labelPosition='left' onClick={(e) => this.deleteRoom(e)}>
            <Icon name='delete' />
            Delete Room
          </Button>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ManageRoom;