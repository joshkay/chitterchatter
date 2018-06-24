import React from 'react';

import { Menu, Container, Button } from 'semantic-ui-react';

const User = () => (
  <Menu pointing secondary size="small">
    
    <Container textAlign="center">
      Guest
    </Container>
    <Menu.Menu position="right">
      <Menu.Item>
        <Button primary>
          Log In
        </Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default User;