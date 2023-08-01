import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  console.log('sidebar');
  return (
    <>
      <h2>Add Payment</h2>
      <Link className="link-navigation" to="/sources">
        Add recipient etc.
      </Link>
      <Link className="link-navigation" to="/">
        View payments
      </Link>
    </>
  );
}

export default Sidebar;
