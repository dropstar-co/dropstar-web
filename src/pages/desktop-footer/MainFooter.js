import React from 'react';
import './MainFooter.css';

const MainFooter = () => {
  return (
    <div className="footer-two d-flex justify-content-end align-items-center mt-5">
      <div className="d-flex">
        <div className="mx-2">
          <span className="mx-1">&copy;</span>
          Dropstar
        </div>
        <div>
          <a href='https://www.dropstar.org/imprint' target="_blank" className='link'>Imprint</a>
          
          </div>
      </div>
    </div>
  );
}

export default MainFooter
