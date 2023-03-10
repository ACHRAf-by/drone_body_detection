import React, { useState, useEffect } from 'react';
import Logo from '../img/logo.svg';
import '../styles/logo.css';

export function MyLogo() {  

    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setSpinning(false);
        }, 500);
      }, []);

    return (

        <div id="logo" style={{ position: 'relative', top: '20px', right: '200px' }}>
            <img src={Logo} alt="Big Brother Logo" className={spinning ? "spin":""} />
        </div>
      );
}