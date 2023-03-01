import React from "react";
import Webcam from "react-webcam";
import SideButtons from "./sideButtons";
import '../styles/camera.css'


const LiveCameraComponent = () => {

    //Start cocossd on button click
    const handleStartTrackingClick = React.useCallback(() => {
        return;
    }
    );

    const handleTrackWithColorsClick = React.useCallback( () => {
        // Open Color choice panel
        return;
    }
    );
  
    return (
      <div className="trackingRow">
        <div className='liveCameraDiv'>
          <Webcam className="cam_container" audio={false} />
        </div>
        <SideButtons startOnClickProp={handleStartTrackingClick} trackWithColorProp={handleTrackWithColorsClick} />
      </div>
    );
  };
  
export default LiveCameraComponent;  