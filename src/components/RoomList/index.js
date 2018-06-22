import React, { Component } from 'react';

import { Grid, Header } from 'semantic-ui-react';

import NewRoom from '../NewRoom';

import './RoomList.css';

class RoomList extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount()
  {
    this.roomsRef.on('child_added', (snapshot) => {
      const room = snapshot.val();
      room.key = snapshot.key;
      
      this.setState({
        rooms: [...this.state.rooms, room]
      });
    });
  }

  render()
  {
    return (
      <section className="room-list">
        <Grid>
          <Grid.Column verticalAlign="middle" width={8}>
            <Header as='h1'>
              Bloc Chat
            </Header>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={8}>
            <NewRoom  />
          </Grid.Column>
        </Grid>
        <ul>
        {
          this.state.rooms.map((room, index) => {
            return (
              <li key={index}>
                {room.name}
              </li>
            );
          })
        }
        </ul>
      </section>
    );
  }
}

export default RoomList;