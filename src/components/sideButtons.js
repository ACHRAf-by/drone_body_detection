import React from 'react'
import '../styles/sideButtons.css'



//create callbacks for buttons



export function SideButtons (startOnClickProp, trackWithColorProp ) {
    return(
        <div className='sideButtonDiv'>
            <button className="sideButton" onClick={startOnClickProp}>Start Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <button className="sideButton" onClick={trackWithColorProp}>Track with Colors
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        );
}

export default SideButtons;
