import React, { useState } from 'react';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="container">
      <div className="wrapper">
        <div className={sidebarOpen ? 'sidebar' : 'sidebar sidebar_small'}>
          <button
            type="button"
            onClick={handleSidebarButtonClick}
          >
            {sidebarOpen ? '<' : '>'}
          </button>
          {/* <div className={sidebarOpen ? 'visible' : 'hidden'}> */}
          <div className="sidebar-content">
            sidebar content
            {/* </div> */}
          </div>
        </div>
        <div className={sidebarOpen ? 'main-content' : 'main-content main-content_large'}>
          content
        </div>
      </div>
    </main>
  );
}

export default Main;
