import * as React from 'react';
import { Link } from 'react-router-dom';
import FormAddPayment from '../pages/Payments/FormAddPayment';

function Sidebar() {
  console.log('sidebar');
  return (
    <>
      <div>
        <h2>Add Payment</h2>
        <FormAddPayment />
      </div>
      <div className="section-secondary">
        <h2>Menu</h2>
        <Link className="link-navigation" to="/sources">
          Add sources
        </Link>
        <Link className="link-navigation" to="/">
          View payments
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
