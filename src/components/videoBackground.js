import React from 'react';
import backgroundVideo from "../video/screen_glitch.mp4"
import '../styles/video.css';

export function VideoBackground() {
  return (
    <div>
      <video autoPlay loop muted id='video'>
          <source src = {backgroundVideo} type='video/mp4'/>
      </video>
      <div className="content">
      </div>
    </div>
  );
}
  
export default VideoBackground;