import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import '../styles/sideButtons.css'
import TrackingModel from '../scripts/trackingModel';


//create callbacks for buttons

export function SideButtons () {
    var [hidden, setHidden] = useState(false);
    var [hiddenButton, setHiddenButton] = useState(false);
    var [selectedColor, setColor] = useState("#b32aa9");

    var trackingModel = new TrackingModel();

    useEffect(() => {
        const rgColor = trackingModel.hexToRgb(selectedColor);
        localStorage.setItem('RGBSelectedColor', rgColor);
        console.log("Stored RGB color " + localStorage.getItem('RGBSelectedColor'));
     }, [selectedColor]);

     function handleLoadModelStart(){
        //change hidden state
        setHiddenButton(!hiddenButton);
        trackingModel.loadModel("classicTracking");
        trackingModel.setVideoTrackingMode("classicTracking");
    }

    function handleOnClickColor(){
        //change hidden state
        setHidden(!hidden)
        //load color model
        console.log("Click on color button");
        trackingModel.loadModel("colorTracking");
        trackingModel.setVideoTrackingMode("colorTracking")
    }


    return(
        <div className='sideButtonDiv'>
            { !hiddenButton && <button className="sideButton" onClick={() => handleLoadModelStart()} id='webCamButton'>Start Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>}
            { hiddenButton &&< button className="sideButton" onClick={() => {trackingModel.setVideoTrackingMode("classicTracking")}} id='webCamButton'>Classic Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>}
            <div className="conatainer">
                {hidden && ( <HexColorPicker id="hexColorPicker" color={selectedColor} onChange={setColor} /> )}
                { hiddenButton && <button className="sideButton" onClick={ () => handleOnClickColor()}>{hidden ? "Close Colors Panel" : "Track With Colors"}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>}
            </div>
        </div>
        );
}
export default SideButtons;
