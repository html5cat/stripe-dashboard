import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ChargesCollection from '../../../api/Charges/Charges';
import Loading from '../../components/Loading/Loading';

const Charges = ({ loading, charges, match, history }) => (!loading ? (
  <div className="Charges">
    <div className="page-header clearfix">
      <h4 className="pull-left">Charges</h4>
    </div>
    {charges.length ? <Table responsive>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Customer</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {charges.map(({ _id, amount, currency, customer, description, created }) => (
          <tr key={_id}>
            <td>${amount/100} {currency.toUpperCase()}</td>
            <td>{description}</td>
            <td>{customer}</td>
            <td>{Date(created)}</td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No charges yet!</Alert>}
  </div>
) : <Loading />);

Charges.propTypes = {
  loading: PropTypes.bool.isRequired,
  charges: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('charges');
  return {
    loading: !subscription.ready(),
    charges: ChargesCollection.find().fetch(),
  };
}, Charges);
