import * as React from 'react';
import { FC, ReactNode, useState } from 'react';
import Sidebar from './Sidebar';

// TODO review options for children and use best one, this was just a default starting point
type Props = { children: ReactNode };

const Page: FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="container">
      <div className="wrapper">
        <div className={sidebarOpen ? 'sidebar' : 'sidebar sidebar_small'}>
          <button
            className="sidebar-button"
            type="button"
            onClick={handleSidebarButtonClick}
          >
            {sidebarOpen ? '<' : '>'}
          </button>
          <div className="sidebar-content">
            <Sidebar />
          </div>
        </div>
        <div className={sidebarOpen ? 'main-content' : 'main-content main-content_large'}>
          <h2 className="logo">Money Tracker</h2>
          {children}
        </div>
      </div>
    </main>
  );
}

export default Page;
