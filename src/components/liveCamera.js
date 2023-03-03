import React from "react";
import Webcam from "react-webcam";
import SideButtons from "./sideButtons";
import '@popperjs/core';
import '../styles/camera.css';


const LiveCameraComponent = () => {

  return (
    <div className="trackingRow">
      <div className='liveCameraDiv' id='liveView'>
        <Webcam className="cam_container" id="webcam" audio={false} autoPlay />
      </div>
      <SideButtons />
    </div>
  );
};
  
export default LiveCameraComponent;  