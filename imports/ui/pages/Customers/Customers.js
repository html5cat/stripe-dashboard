import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import CustomersCollection from '../../../api/Customers/Customers';
import Loading from '../../components/Loading/Loading';
import S from 'string';

const Customers = ({ loading, customers, match, history }) => (!loading ? (
  <div className="Customers">
    <Stats customers={customers}/>
    <div className="page-header clearfix">
      <h2 className="pull-left">Top 10 Customers</h2>
    </div>
    {customers.length ? <Table responsive className="table-hover">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {customers.slice(0, 10).map(({ _id, metadata, totalCharges, email, created }) => (
          <tr key={_id}>
            <td>{email}</td>
            <td>{metadata.name}</td>
            <td>${totalCharges/100}</td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No customers yet!</Alert>}
  </div>
) : <Loading />);

const Stats = ({customers}) => {
  let topReferral = {};
  let totalCharged = 0;

  customers.forEach(function(customer) {
    totalCharged += customer.totalCharges;
    if(topReferral[customer.metadata.customer_source]) {
      topReferral[customer.metadata.customer_source] += customer.totalCharges;
    } else {
      topReferral[customer.metadata.customer_source] = customer.totalCharges;
    }
  });
  let keysSorted = Object.keys(topReferral).sort((a, b) => topReferral[b] - topReferral[a])

  return (
  <div className="Stats">
    <div className="page-header clearfix Index">
      <h2 className="pull-left">Key Metrics</h2>
      <p></p>
      <h4>Total purchases: <mark>${(totalCharged/100).toLocaleString()}</mark></h4>
      <h4>Best referral channel: <mark>{S(keysSorted[0]).humanize().s} (${(topReferral[keysSorted[0]]/100).toLocaleString()})</mark></h4>
    </div>
  </div>
)};

Customers.propTypes = {
  loading: PropTypes.bool.isRequired,
  customers: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('customers.byTotalCharges');
  return {
    loading: !subscription.ready(),
    customers: CustomersCollection.find().fetch(),
  };
}, Customers);
