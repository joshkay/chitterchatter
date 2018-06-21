import React, { Component } from 'react';

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
      <section className="col-12 col-sm-5 col-md-3 fill-height room-list">
        <h1><b>Bloc Chat</b></h1>
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