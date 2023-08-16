import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  console.log('landing');
  return (
    <>
      <h1>Landing</h1>
      <Link to="/sources">Enter sources</Link>
    </>
  );
}

export default Landing;
