import React from 'react';
import './LoginButton.css';

const LoginButton = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className='login-btn'>
      {text}
    </button>
  )
}

export default LoginButton;
