import React from 'react';
import { MyTitle } from '../components/title.js';
import { VideoBackground } from '../components/videoBackground.js';

const Home = () => {
  return (

    <div>
      <VideoBackground />
      <MyTitle/>
    </div>
  );
};
  
export default Home;