import React, { Component } from 'react';

import { Grid, List } from 'semantic-ui-react';

class Message extends Component
{
  selectMessage() 
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
      <List.Item className="message-row" onClick={() => this.selectMessage()}>
        <List.Content>
          <Grid padded>
            <Grid.Column width={13} className="message-content">
              <List.Header className="message-user">
                {this.props.message.username}
              </List.Header>
              {this.props.message.content}
            </Grid.Column>
            <Grid.Column width={3} textAlign="right" verticalAlign="top" className="message-time">
              {this.formatDate(this.props.message.sentAt)}
            </Grid.Column>
          </Grid>
        </List.Content>
      </List.Item>
    );
  }
};

export default Message;