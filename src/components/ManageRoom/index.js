import React, { Component } from 'react';

import { Modal, Button, Icon } from 'semantic-ui-react';

import ConfirmationModal from './../ConfirmationModal';

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

  deleteRoom()
  {
    this.handleClose();

    this.messagesRef = this.props.firebase.database().ref(`messages/${this.props.activeRoom.key}`);
    this.messagesRef.remove();

    this.roomsRef = this.props.firebase.database().ref(`rooms/${this.props.activeRoom.key}`);
    this.roomsRef.remove();
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
          <ConfirmationModal
            header={`Delete ${this.props.activeRoom.name}`}
            onConfirm={() => this.deleteRoom()}
            triggerText="Delete Room"
            triggerIcon="delete"
            triggerColor="red"
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ManageRoom;