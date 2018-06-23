import React, { Component } from 'react';
import * as firebase from 'firebase';

import { Sidebar } from 'semantic-ui-react';

import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: ''
    };
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
      <div>
        <Sidebar visible width="wide" direction="left">
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom}
            setActiveRoom={(activeRoom) => this.setActiveRoom(activeRoom)} />
        </Sidebar>
        <Sidebar.Pusher>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </Sidebar.Pusher>
      </div>
    );
  }
}

export default App;
