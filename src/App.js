import React, { Component } from 'react';
import * as firebase from 'firebase';

import { Sidebar } from 'semantic-ui-react';

import RoomList from './components/RoomList';

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
  render() 
  {
    return (
      <Sidebar visible width="wide" direction="left">
        <RoomList firebase={firebase} />
      </Sidebar>
    );
  }
}

export default App;