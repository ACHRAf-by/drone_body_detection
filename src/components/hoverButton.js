import React from 'react';
import { NavLink } from "react-router-dom";
import '../styles/hover_button.css';

export function MyButton() {
  
  return (
    <NavLink to="/tracking" >
      <div className="buttonWrapper" >
        
      <button className='button1'>Get Started
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </button>
      </div>
    </NavLink>
);
}