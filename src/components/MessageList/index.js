import React, { Component } from 'react';

import { Menu, Header, List, Input } from 'semantic-ui-react';

import Message from '../Message';
import ManageRoom from '../ManageRoom';

import './MessageList.css';

class MessageList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      messages: [],
      currentMessage: ''
    };
  }

  updateMessages(activeRoom)
  {
    this.setState({
      messages: []
    });

    if (activeRoom == null)
    {
      return;
    }
    
    if (this.messagesRef != null)
    {
      this.messagesRef.off();
    }

    this.messagesRef = this.props.firebase.database().ref(`messages/${activeRoom.key}`);

    this.messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;

      message.sentAt = new Date(message.sentAt);

      var messages = [...this.state.messages, message];
      messages.sort((message1, message2) => {
        return message1.sentAt - message2.sentAt;
      });
      
      this.setState({
        messages: messages
      });
    });
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.activeRoom == null && this.props.activeRoom == null)
    {
      return;
    }

    if (nextProps.activeRoom == null && this.props.activeRoom != null)
    {
      this.updateMessages(null);
    }
    else if ((this.props.activeRoom == null && nextProps.activeRoom != null) ||
            (nextProps.activeRoom.key !== this.props.activeRoom.key))
    {
      this.updateMessages(nextProps.activeRoom)
    }
  }

  handleChange(e)
  {
    this.setState({
      currentMessage: e.target.value
    });
  }

  componentDidMount()
  {
    this.updateMessages(this.props.activeRoom);
    this.scrollToBottom();
  }

  componentDidUpdate() 
  {
    this.scrollToBottom();
  }

  scrollToBottom()
  {
    if (this.messagesEnd != null)
    {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }  

  getRoomName()
  {
    if (this.props.activeRoom == null)
    {
      return '';
    }
    
    return this.props.activeRoom.name;
  }

  handleSubmit(e)
  {
    e.preventDefault();

    if (this.state.currentMessage === '')
    {
      return;
    }

    this.messagesRef.push({
      content: this.state.currentMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.getUserName()
    });

    this.setState({
      currentMessage: ''
    });
  }
  
  render()
  {
    var roomSelected = (
      <section className="message-list-container">
        <Menu pointing secondary className="user-menu">
          <Menu.Item size="tiny">
            <Header as='h2' className="message-list-header">
              {this.getRoomName()}
            </Header>
          </Menu.Item>
          <Menu.Menu position="right" className="room-settings">
            <Menu.Item size="tiny">
              <ManageRoom firebase={this.props.firebase}
                activeRoom={this.props.activeRoom} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
          
        <div className="message-list">
          <List relaxed size="large">
            {
              this.state.messages.map((message, index) => {
                return (
                  <Message key={index} message={message} />
                );
              })
            }
            <span ref={(el) => { this.messagesEnd = el; }} />
          </List>
        </div>
        <form className="message-send" onSubmit={e => this.handleSubmit(e)}>
          <Input action={{color: 'blue', content: 'Send', type: 'submit'}}
            size="large" placeholder='Write your message here...'
            onChange={(e) => this.handleChange(e)} value={this.state.currentMessage} />
        </form>
      </section>
    );

    var noRoomSelected = (
      <section className="message-list-container">
      </section>
    );

    return (
      this.props.activeRoom == null ? noRoomSelected : roomSelected
    );
  }
};

export default MessageList;