import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';

import SideBar from '../../components/SideBar';
import MessageList from '../../components/MessageList';

import * as firebase from 'firebase';

class LandingPage extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      user: null,
      activeRoom: null
    };

    this.GUEST_USERNAME = "Guest";
  }

  setUser(user)
  {
    this.setState({
      user: user
    })
  }

  getUserName()
  {
    if (this.state.user == null)
    {
      return this.GUEST_USERNAME;
    }

    return this.state.user.displayName;
  }

  setActiveRoom(activeRoom)
  {
    this.setState({
      activeRoom: activeRoom
    });
  }

  render()
  {
    return (
      <Grid padded className="fill-height">
        <SideBar firebase={firebase} 
          user={this.state.user}
          activeRoom={this.state.activeRoom}
          setActiveRoom={(activeRoom) => this.setActiveRoom(activeRoom)}
          setUser={(user) => this.setUser(user)}
          getUserName={() => this.getUserName()}
        />
        <Grid.Column width={13} className="panel">
          <MessageList firebase={firebase} 
            user={this.state.user} 
            activeRoom={this.state.activeRoom} 
            getUserName={() => this.getUserName()}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default LandingPage;
