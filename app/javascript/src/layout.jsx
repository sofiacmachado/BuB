import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="p-3 bg-light">
      </footer>
    </React.Fragment>
  );
}

export default Layout;