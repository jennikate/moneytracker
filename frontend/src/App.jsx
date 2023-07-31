import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page from './layout/Page';
import Landing from './pages/Landing';
import Sources from './pages/Sources/Sources';

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sources" element={<Sources />} />
      </Routes>
    </Page>
  );
}

export default App;
