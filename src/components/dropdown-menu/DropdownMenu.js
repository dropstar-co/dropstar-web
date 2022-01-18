import './DropdownMenu.css'

import React from 'react';

const DropdownMenu = () => {
  return (
    <div className="dropdown-card">
      <div className="dropdown-card-title mt-1">MY PROFILE</div>
      <div className="dropdown-card-profile common my-2">Profile</div>
      <div className="dropdown-card-logout common">Log out</div>
    </div>
  );
}

export default DropdownMenu
