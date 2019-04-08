import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';

import RoomList from '../RoomList';
import User from '../User';

import './SideBar.css';

class SideBar extends Component
{
  render()
  {
    return (
      <Grid.Column width={3} className="panel sidebar-container">
        <RoomList firebase={this.props.firebase} 
          activeRoom={this.props.activeRoom}
          setActiveRoom={(activeRoom) => this.props.setActiveRoom(activeRoom)} 
        />
        <User firebase={this.props.firebase} 
          user={this.props.user} 
          setUser={(user) => this.props.setUser(user)} 
          getUserName={() => this.props.getUserName()}
        />
      </Grid.Column>
    );
  }
}

export default SideBar;