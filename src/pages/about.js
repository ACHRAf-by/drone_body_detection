import React from "react";
import '../styles/about.css'
import '../styles/hover_button.css'
  
const About = () => {
  return (
    <div className='about' id='about'>
      <div className='container'>
          <div className='col-2'>
              <h2>About</h2>
              <span className='line'></span>
              <p>Big Brother permettra à des entreprises organisant des événements susceptibles d’attirer des foules, de surveiller en temps réel les individus et de faciliter le repérage d’éléments précis. Ce dispositif peut également être utilisé par des services de renseignement.</p>
              <p>une solution technologique et économique. </p>
              <button className='button1'>Explore More</button>
          </div>
      </div>
    </div>
  );
};
  
export default About;