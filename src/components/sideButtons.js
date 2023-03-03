import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import '../styles/sideButtons.css'
import TrackingModel from '../scripts/trackingModel';
import HumanSegmentationModel from '../scripts/humanSegmentationModel';

//create callbacks for buttons

export function SideButtons () {
    var [hidden, setHidden] = useState(false);
    var [hiddenButton, setHiddenButton] = useState(false);
    var [selectedColor, setColor] = useState("#b32aa9");

    var trackingModel = new TrackingModel();
    var humanSegmentationModel = new HumanSegmentationModel();

    useEffect(() => {
        try{
            const rgbColor = trackingModel.hexToRgb(selectedColor);
            localStorage.setItem('RGBSelectedColor', rgbColor);
            console.log("Stored RGB color " + localStorage.getItem('RGBSelectedColor'));
        }
        catch(e){
            console.log("caught exception " + e);
        }
        
     }, [selectedColor]);

     function handleLoadModelStart(){
        setHiddenButton(!hiddenButton);
        console.log('Open sub-buttons')
    }
    
    function handleClassicModelStart(){
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

    function handleBodySegmentationStart(){
        //Load BodyPix model
        console.log("Click button to start BodyPix seg")
        humanSegmentationModel.loadModel();
    }

    return(
        <div className='sideButtonDiv'>
            { !hiddenButton && <button className="sideButton" onClick={() => handleLoadModelStart()} id='webCamButton'>Start Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>}
            { hiddenButton &&< button className="sideButton" onClick={() => handleClassicModelStart()} id='classicButton' data-testid="id">Classic Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>}
            { hiddenButton &&< button className="sideButton" onClick={() => handleBodySegmentationStart()} id='segmentationButton'>Segmentation
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>}
            <div className="conatainer">
                {hidden && ( <HexColorPicker id="hexColorPicker" color={selectedColor} onChange={setColor} /> )}
                { hiddenButton && <button className="sideButton" id="colorButton" onClick={ () => handleOnClickColor()}>{hidden ? "Close Colors Panel" : "Track With Colors"}
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
