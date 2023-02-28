import React from "react";
import '../styles/about.css'
import '../styles/hover_button.css'
import backgroundVideo from "../video/bigbrother.mp4"
import '../styles/video.css';
import $ from 'jquery'

const removeVideoAndshowAbout = () => {
  $("#hiddenInformation").show();
  $("#videoSection").hide(1000);
}

const About = () => {
  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
      <div className="section-one" id="videoSection">
      <video autoPlay id='video' onEnded={() => removeVideoAndshowAbout()}>
          <source src = {backgroundVideo} type='video/mp4'/>
      </video>
      </div>
      <div id="hiddenInformation" hidden>
        <div className="section-one" >
          <h2 className="section-one__title">Big Brother</h2>
          <p className="section-one__descr">Introducing the cutting-edge technology drone human recognition system!<br/><br/>With its advanced AI-powered system, this drone can detect and identify humans with pinpoint accuracy, making it an invaluable asset for security and surveillance applications.<br/><br/>Whether you are securing a perimeter or monitoring a large event, this drone can give you the advantage you need to keep people safe and secure.</p>
          <div className="separator">
            <svg className="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#14222E" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100 100 V 10 L 0 100"/>
              <path d="M 30 73 L 100 18 V 10 Z" fill="#1a2d3d" strokeWidth="0"/>
              </svg>
          </div>
        </div>
        <div className="section-two">
          <h2 className="section-two__title">The best drone system on the market !</h2>
          <p className="section-two__descr">Thanks to its state-of-the-art camera technology, this drone can capture clear and detailed images of individuals, even from long distances. And with its sophisticated machine learning algorithms, it can quickly analyze these images and identify any potential threats or anomalies.<br/><br/>
            But the benefits do not stop there. This drone also features intuitive controls and a user-friendly interface, making it easy for anyone to operate. And with its compact and durable design, it can easily maneuver through tight spaces and withstand the toughest of conditions.<br/><br/>
          <br/>So if you are looking for a reliable, high-tech solution for human recognition, look no further than this drone human recognition system. Contact us today to learn more about how it can transform your security and surveillance operations.</p>
          
        </div>
      </div>
    </div>
    
  );
};

export default About;