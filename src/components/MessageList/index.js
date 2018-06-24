import React, { Component } from 'react';

import { Container, Grid, Header, List } from 'semantic-ui-react';

import './MessageList.css';

class MessageList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      messages: []
    };
  }

  updateMessages(activeRoom)
  {
    this.setState({
      messages: []
    })

    if (this.messagesRef != null)
    {
      this.messagesRef.off();
    }

    this.messagesRef = this.props.firebase.database().ref(`messages/${activeRoom.key}`);

    this.messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.activeRoom.key !== this.props.activeRoom.key)
    {
      this.updateMessages(nextProps.activeRoom);
    }
  }

  componentDidMount()
  {
    this.updateMessages(this.props.activeRoom);
  }
  
  selectMessage(message)
  {

  }

  formatDate(date)
  {
    var options = {  
      hour: "2-digit", minute: "2-digit"  
    };
    
    return date.toLocaleTimeString("en-us", options);
  }
  
  render()
  {
    return (
      <section className="message-list">
        <Header as='h2'>
          {this.props.activeRoom.name}
        </Header>
        <List relaxed size="large">
          {
            this.state.messages.map((message, index) => {
              return (
                <List.Item className="message-row" key={index} onClick={() => this.selectMessage(message)}>
                  <List.Content>
                    <Grid padded>
                      <Grid.Column width={13} className="message-content">
                        <List.Header className="message-user">
                          {message.username}
                        </List.Header>
                        {message.content}
                      </Grid.Column>
                      <Grid.Column width={3} textAlign="right" verticalAlign="top" className="message-time">
                        {this.formatDate(new Date(message.sentAt))}
                      </Grid.Column>
                    </Grid>
                  </List.Content>
                </List.Item>
              );
            })
          }
          </List>
      </section>
    );
  }
}

export default MessageList;