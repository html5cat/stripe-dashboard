import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (loggingIn) return <div />;
      return authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<Redirect to="/logout" />);
    }}
  />
);

Authenticated.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default Authenticated;
