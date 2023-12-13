import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page from './layout/Page';
import Payments from './pages/Payments';
// import Sources from './pages/Sources/Sources';

function App() {
  return (
    <Page>
    <Routes>
      <Route path="/" element={<Payments />} />
      {/* <Route path="/sources" element={<Sources />} /> */}
    </Routes>
  </Page>
  );
}
export default App;
