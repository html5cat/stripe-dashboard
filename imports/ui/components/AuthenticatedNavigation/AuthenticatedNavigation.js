import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const AuthenticatedNavigation = ({ name }) => (
  <div>
    <Nav>
      <LinkContainer to="/customers">
        <NavItem eventKey={2} href="/customers">Customers</NavItem>
      </LinkContainer>
      <LinkContainer to="/charges">
        <NavItem eventKey={3} href="/charges">Charges</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => Meteor.logout()}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AuthenticatedNavigation;
