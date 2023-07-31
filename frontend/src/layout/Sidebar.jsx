import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  console.log('sidebar');
  return (
    <>
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
