import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import Charges from '../../pages/Charges/Charges';
import Customers from '../../pages/Customers/Customers';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';

import './App.scss';

const App = props => (
  <Router>
    {!props.loading ? <div className="App">
      <Navigation {...props} />
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Authenticated exact path="/customers" component={Customers} {...props} />
          <Authenticated exact path="/charges" component={Charges} {...props} />
          <Authenticated exact path="/profile" component={Profile} {...props} />
          <Public path="/signup" component={Signup} {...props} />
          <Public path="/login" component={Login} {...props} />
          <Public path="/logout" component={Logout} {...props} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          <Route name="terms" path="/terms" component={Terms} />
          <Route name="privacy" path="/privacy" component={Privacy} />
          <Route name="examplePage" path="/example-page" component={ExamplePage} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
      <Footer />
    </div> : ''}
  </Router>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
  };
}, App);
