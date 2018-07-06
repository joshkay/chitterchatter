import React, { Component } from 'react';

import { Modal, Button } from 'semantic-ui-react';

class ConfirmationModal extends Component 
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

  confirm()
  {
    this.handleClose();

    if (this.props.onConfirm != null)
    {  
      this.props.onConfirm();
    }
  }

  deny()
  {
    this.handleClose();

    if (this.props.onDeny != null)
    {
      this.props.onDeny();
    }
  }

  render()
  {
    var trigger = (
      <Button color={this.props.triggerColor}
        content={this.props.triggerText}
        icon={this.props.triggerIcon} 
        labelPosition='left'
        onClick={() => this.handleOpen()}
      />
    );

    return (
      <Modal open={this.state.modalOpen} trigger={trigger} size="mini">
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Actions>
          <Button type="button" negative icon="cancel" labelPosition="right" 
            content="No" onClick={() => this.deny()} />
          <Button type="button" positive icon="checkmark" labelPosition="right" 
            content="Yes" onClick={() => this.confirm()} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmationModal;