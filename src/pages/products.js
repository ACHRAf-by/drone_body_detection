import React from "react";
import '../styles/products.scss'



const Products = () => {
  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
    <div className="section-one">
      <h2 className="section-one__title">Specs</h2>
      <p className="section-one__descr">
      <ul>
        <li>Camera: The system is equipped with a high-resolution camera capable of capturing images and videos in real-time. The camera can rotate 360 degrees, providing a full view of the surrounding area.</li>
        <br/>
        <li>Sensors: The drone has advanced sensors that can detect and identify humans with precision. The sensors are designed to work in various lighting conditions, including low-light and night-time environments.</li>
        <br/>
        <li>AI-powered recognition: The system is powered by sophisticated AI algorithms that can analyze images and identify humans accurately. The AI can distinguish between humans and other objects, minimizing false positives.</li>
        <br/>
        <li>Range: The drone has a maximum range of 2 kilometers, allowing it to cover a large area. The drone can also fly up to a height of 200 meters, giving it an excellent vantage point.</li>
        <br/>
        <li>Battery life: The drone s battery can provide up to 30 minutes of flight time on a single charge. The battery is removable, allowing for quick replacements and extended use.</li>
        <br/>
        <li>Durability: The drone is designed to withstand tough weather conditions and impacts. It has a rugged and durable exterior that can withstand collisions and crashes.</li>
        <br/>
        <li>User interface: The system comes with a user-friendly interface that allows operators to control the drone and view live footage. The interface is intuitive and easy to use, making it accessible to even novice operators.</li>
        <br/>
        <li>Connectivity: The drone can connect to a Wi-Fi network, enabling operators to control it remotely. It can also be integrated with other security systems, providing a comprehensive security solution.</li>
      </ul>
      </p>
      <div className="separator">
        <svg className="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#14222E" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 V 10 L 0 100"/>
          <path d="M 30 73 L 100 18 V 10 Z" fill="#1a2d3d" strokeWidth="0"/>
          </svg>
      </div>
    </div>
    <div className="section-two">
      <h2 className="section-two__title">Pricing</h2>
      <p className="section-two__descr">Contact us to get the best price for your requirements !</p>
    </div>
    </div>
  );
};
export default Products;