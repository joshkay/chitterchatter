import React, { Component } from 'react';

import { Grid, Button } from 'semantic-ui-react';

import './User.css';

class User extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      userLoaded: false
    };
  }

  componentDidMount()
  {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.userLoaded();
      this.props.setUser(user);
    });
  }

  userLoaded()
  {
    if (this.state.userLoaded)
    {
      return;
    }

    this.setState({
      userLoaded: true
    });
  }

  logIn()
  {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  logOut()
  {
    this.props.firebase.auth().signOut();
  }

  getSignInButton()
  {
    return (
      <Button primary size="tiny" onClick={() => this.logIn()}>
        Sign In
      </Button>
    );
  }

  getSignOutButton()
  {
    return (
      <Button negative size="tiny" onClick={() => this.logOut()}>
        Sign Out
      </Button>
    );
  }

  render()
  {
    var loadedUserMenu = (
      <Grid padded className="user-menu">
        <Grid.Column verticalAlign="middle" width={8} className="user-name">
          {this.props.getUserName()}
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={8} textAlign="right">
          {
            (this.props.user == null) ? this.getSignInButton() : this.getSignOutButton()
          }
        </Grid.Column>
      </Grid>
    );

    var loadingUserMenu = (
      <div className="user-menu"></div>
      // <Menu pointing secondary>
      //   <div className="user-loader">
      //     <Loader size="small" active inline="centered" />
      //   </div>
      // </Menu>
    );

    return this.state.userLoaded ? loadedUserMenu : loadingUserMenu;
  }
};

export default User;