import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <h1>Stripe Dashboard</h1>
    <p>Key metrics and top customres at your fingertips</p>
    <div>
      <Link className="btn btn-default btn-lg" to="/signup">Sign up or log in</Link>
    </div>
    <footer>
      <p>Made with ❤️ & ☕️</p>
    </footer>
  </div>
);

export default Index;
