import React, { useState } from "react";
import { SketchPicker } from "react-color";
import '../styles/sideButtons.css'
import loadModel from '../scripts/trackingModel';


//create callbacks for buttons

export function SideButtons () {
    const [color, setColor] = useState("lighblue");
    const [hidden, setHidden] = useState(false);
    const pickerStyle = {
        default: {
            picker: {
                position: "absolute",
                bottom: "40px",
                right: "300px"
            }
        }
    };
    
    return(
        <div className='sideButtonDiv'>
            <button className="sideButton" onClick={loadModel} id='webCamButton'>Start Tracking
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className="conatainer">
                {hidden && ( <SketchPicker styles={pickerStyle} color={color} onChange={(updateColor) => setColor(updateColor.hex)} /> )}
                <button className="sideButton" onClick={ () => setHidden(!hidden)}>{hidden ? "Close Colors Panel" : "Track With Colors"}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
        );
}
export default SideButtons;
