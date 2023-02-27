import React from 'react';
import backgroundVideo from "../video/bigbrother.mp4"
import '../styles/video.css';

export function Video() {
  return (
    <video autoPlay loop muted id='video'>
        <source src = {backgroundVideo} type='video/mp4'/>
    </video>
  );
}
  
export default Video;