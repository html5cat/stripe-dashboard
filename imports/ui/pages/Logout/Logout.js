import React from 'react';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

const Logout = () => (
  <div className="Logout">
    <img
      src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
      alt="Clever Beagle"
    />
  <h1>Thanks for stopping by!</h1>
    <p>{'Social links 🙃:'}</p>
    <ul className="FollowUsElsewhere">
      <li><a href="https://twitter.com/html5cat"><Icon icon="twitter" /></a></li>
      <li><a href="https://github.com/html5cat"><Icon icon="github" /></a></li>
    </ul>
  </div>
);

Logout.propTypes = {};

export default Logout;
