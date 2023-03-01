import React from "react";
import Webcam from "react-webcam";
import SideButtons from "./sideButtons";
import loadModel from "../scripts/trackingModel";
import '@popperjs/core';
import '../styles/camera.css'


const LiveCameraComponent = () => {

    //Start cocossd on button click
    const handleStartTrackingClick = React.useCallback(() => {
        loadModel();
    }
    );

    const handleTrackWithColorsClick = React.useCallback( () => {
        // Open Color choice panel
        return;
    }
    );
  
    return (
      <div className="trackingRow">
        <div className='liveCameraDiv' id='liveView'>
          <Webcam className="cam_container" id="webcam" audio={false} autoPlay/>
        </div>
        <SideButtons startOnClickProp={handleStartTrackingClick} trackWithColorProp={handleTrackWithColorsClick} />
      </div>
    );
};
  
export default LiveCameraComponent;  