import React, { Component } from 'react';
import * as firebase from 'firebase';

import { Grid } from 'semantic-ui-react';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCy3WjeZdoiPJVCIGGVO2R4mOvSDBsSFwE",
  authDomain: "bloc-chat-react-joshkay.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-joshkay.firebaseio.com",
  projectId: "bloc-chat-react-joshkay",
  storageBucket: "bloc-chat-react-joshkay.appspot.com",
  messagingSenderId: "214183468611"
};
firebase.initializeApp(config);

class App extends Component 
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
        <Grid.Column width={3} className="panel">
          <RoomList firebase={firebase} 
            activeRoom={this.state.activeRoom}
            setActiveRoom={(activeRoom) => this.setActiveRoom(activeRoom)} 
          />
        </Grid.Column>
        <Grid.Column width={13} className="panel">
          <User firebase={firebase} 
            user={this.state.user} 
            setUser={(user) => this.setUser(user)} 
            getUserName={() => this.getUserName()}
          />
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

export default App;
