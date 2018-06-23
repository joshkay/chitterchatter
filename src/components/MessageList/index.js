import React, { Component } from 'react';

import { Header } from 'semantic-ui-react';

class MessageList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      messages: []
    };

    //this.messagesRef = this.props.firebase.database().ref('rooms');
  }

  render()
  {
    return (
      <Header as='h2'>
        {this.props.activeRoom.name}
      </Header>
    );
  }
}

export default MessageList;