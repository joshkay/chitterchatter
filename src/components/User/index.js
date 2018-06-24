import React, { Component } from 'react';

import { Menu, Button } from 'semantic-ui-react';

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

  getUserName()
  {
    if (this.props.user == null)
    {
      return "Guest";
    }

    return this.props.user.displayName;
  }

  render()
  {
    var loadedUserMenu = (
      <Menu pointing secondary>
        <div className="user-name">
            {this.getUserName()}
        </div>
        <Menu.Menu position="right">
          <Menu.Item size="tiny">
            {
              (this.props.user == null) ? this.getSignInButton() : this.getSignOutButton()
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );

    var loadingUserMenu = (
      <div></div>
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