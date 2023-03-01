import React from 'react'
import '../styles/sideButtons.css'
import loadModel from '../scripts/trackingModel';


//create callbacks for buttons



export function SideButtons () {
    return(
        <div className='sideButtonDiv'>
            <button className="sideButton" onClick={loadModel} id='webCamButton'>Start Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <button className="sideButton">Track with Colors
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        );
}

export default SideButtons;
