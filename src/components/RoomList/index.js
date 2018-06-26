import React, { Component } from 'react';

import { Grid, Header, List } from 'semantic-ui-react';

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

  createRoom(newRoomName)
  {
    this.roomsRef.push({
      name: newRoomName
    });

    this.props.setActiveRoom(newRoomName);
  }

  selectRoom(room)
  { 
    this.props.setActiveRoom(room);
  }

  getActiveRoomKey()
  {
    if (this.props.activeRoom == null)
    {
      return null;
    }

    return this.props.activeRoom.key;
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
          <Grid.Column verticalAlign="middle" width={8} textAlign="right">
            <NewRoom createRoom={(name) => this.createRoom(name)} />
          </Grid.Column>
        </Grid>
        <List selection size="large">
        {
          this.state.rooms.map((room, index) => {
            var active = room.key === this.getActiveRoomKey();
            return (
              <List.Item active={active} key={index}
                onClick={() => this.selectRoom(room)}>
                <List.Content>
                  {room.name}
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

export default RoomList;