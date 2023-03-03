import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as cocoSsd from '@tensorflow-models/coco-ssd';


export default class TrackingModel{
  
  model;
  video;
  liveView;
  videoTrackingMode;
  // Keep a reference of all the child elements we create
  // so we can remove them easilly on each render.
  children;
  detectionThreshold;


  constructor() {
    
    this.model = undefined;
    this.video = undefined;
    this.liveView = undefined;
    this.children = [];
    this.detectionThreshold = 760;
    this.videoTrackingMode = "noTracking";

  }

  setVideoTrackingMode(videoTrackingMode){
    this.videoTrackingMode = videoTrackingMode;
  }

  retrieveColorFromWindow(){
    const strColor = localStorage.getItem("RGBSelectedColor");
    const strArray = strColor.split(',');
    return strArray;
  }

  async loadModel(videoTrackingMode){

    await cocoSsd.load().then(function (loadedModel) {
      this.model = loadedModel;
      console.log('Model Loaded')
      this.video = document.getElementById('webcam');
      this.liveView = document.getElementById('liveView');
    }.bind(this));
      
    // getUsermedia parameters.
      const constraints = {
        video: true
      };
    
      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        this.video.srcObject = stream;
        if(videoTrackingMode == "classicTracking") {
          console.log("Classic video tracking")
          this.video.addEventListener('loadeddata', this.predictWebcam.bind(this));
        }else if (videoTrackingMode == "colorTracking"){
            console.log("With colors video Tracking")
            this.video.addEventListener('loadeddata', this.predictWebcamWithColor.bind(this));
        }
      }.bind(this));
  }

  getColorDifference(boxColor) {

    // console.log("color in getColorDifference = " + this.selectedColorRgb);
    // console.log("BOX in getColorDifference = " + boxColor);
    
    // Convert the RGB values to Lab.
    const retrievedColor = this.retrieveColorFromWindow();
    const selectedColorLab = this.rgbToLab(retrievedColor[0], retrievedColor[1], retrievedColor[2]);
    const boxColorLab = this.rgbToLab(boxColor[0], boxColor[1], boxColor[2]);

    // Compute the Euclidean distance between the Lab values.
    const deltaL = selectedColorLab[0] - boxColorLab[0];
    const deltaA = selectedColorLab[1] - boxColorLab[1];
    const deltaB = selectedColorLab[2] - boxColorLab[2];
    const distance = Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);

    return distance;
  }

  rgbToLab(r,g,b) {

    // Convert the RGB values to the XYZ color space.
    let x = 0.412453 * r + 0.357580 * g + 0.180423 * b;
    let y = 0.212671 * r + 0.715160 * g + 0.072169 * b;
    let z = 0.019334 * r + 0.119193 * g + 0.950227 * b;

    // Normalize the XYZ values.
    const whiteX = 0.95047;
    const whiteY = 1.00000;
    const whiteZ = 1.08883;
    x = x / whiteX;
    y = y / whiteY;
    z = z / whiteZ;

    // Convert the XYZ values to Lab.
    x = x > 0.008856 ? Math.pow(x, 1/3) : 7.787 * x + 16/116;
    y = y > 0.008856 ? Math.pow(y, 1/3) : 7.787 * y + 16/116;
    z = z > 0.008856 ? Math.pow(z, 1/3) : 7.787 * z + 16/116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const bl = 200 * (y - z);
    console.log('l'+l+'a'+a+'bl'+bl);
    return [l, a, bl];
  }

  getBoundingBoxColor(box, video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    // Draw the current video frame to the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Extract the sub-image that corresponds to the bounding box
    const imageData = ctx.getImageData(box[0], box[1], box[2], box[3]);

    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;

    // Calculate the average color of the sub-image
    for (let i = 0; i < imageData.data.length; i += 4) {
      red += imageData.data[i];
      green += imageData.data[i + 1];
      blue += imageData.data[i + 2];
      count++;
    }
    const averageRed = Math.floor(red / count);
    const averageGreen = Math.floor(green / count);
    const averageBlue = Math.floor(blue / count);
    
    return this.rgbToLab(averageRed,averageGreen,averageBlue)
    //return `${averageRed},${averageGreen},${averageBlue}`;
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r =  parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    console.log("selected color in HEX function : " + [r,g,b]);
    return [r,g,b];
  }

  predictWebcam() {
    //console.log("prediction running")
    //console.log(this);
    // Now let's start classifying the stream.
    this.model.detect(this.video).then(function (predictions) {
      // Remove any highlighting we did previous frame.
      for (let i = 0; i < this.children.length; i++) {
        this.liveView.removeChild(this.children[i]);
      }
      this.children.splice(0);

      let closestMatch = null;

      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        if (predictions[n].class === 'person') {
          // If we are over 66% sure we are sure we classified it right, draw it!
          if (predictions[n].score > 0.3) {
            const p = document.createElement('p');
            p.innerText = predictions[n].class + ' - with ' +
              Math.round(parseFloat(predictions[n].score) * 100) +
              '% confidence.';
            // Draw in top left of bounding box outline.
            p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
              'top: ' + predictions[n].bbox[1] + 'px;' +
              'width: ' + (predictions[n].bbox[2] - 10) + 'px;';

            // Draw the actual bounding box.
            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left: ' + (predictions[n].bbox[0] + 100 )+ 'px; top: '
              + (predictions[n].bbox[1] + 120) + 'px; width: '
              + (predictions[n].bbox[2] + 60) + 'px; height: '
              + (predictions[n].bbox[3] + 60)+ 'px;';

            if (predictions[n] === closestMatch) {
              highlighter.style.border = 'solid 2px #ff0000';
            }


            this.liveView.appendChild(highlighter);
            this.liveView.appendChild(p);

            // Store drawn objects in memory so we can delete them next time around.
            this.children.push(highlighter);
            this.children.push(p);
            //console.log(JSON.stringify(predictions[n]));
          }
        }
      }
        window.requestAnimationFrame(this.predictWebcam.bind(this));
    }.bind(this));
  }


  predictWebcamWithColor() {
    console.log("selected color = "+ this.retrieveColorFromWindow());
    this.model.detect(this.video).then(function (predictions) {
      // Remove any highlighting we did previous frame.
      for (let i = 0; i < this.children.length; i++) {
        this.liveView.removeChild(this.children[i]);
      }
      this.children.splice(0);

      let closestMatch = null;
      let closestDistance = Number.MAX_VALUE;


      // Now lets loop through predictions and draw them to the live view if
      // they have a high confidence score.
      for (let n = 0; n < predictions.length; n++) {
        if (predictions[n].class === 'person') {
          // If we are over 66% sure we are sure we classified it right, draw it!
          if (predictions[n].score > 0.3) {
            const boxColor = this.getBoundingBoxColor(predictions[n].bbox, this.video);
            const colorDifference = this.getColorDifference(boxColor);
            console.log('Detected color: ' + boxColor); // Add this line to log the detected color
            
            // console.log("Before RGB to lab of stored color : " + this.retrieveColorFromWindow());
            // console.log('Input color: ' + this.rgbToLab(this.retrieveColorFromWindow()[0], this.retrieveColorFromWindow()[1], this.retrieveColorFromWindow()[2])); // Add this line to log the detected color


            console.log(' color diff: ' + colorDifference); // Add this line to log the detected color
            
            if (colorDifference <= this.detectionThreshold && colorDifference < closestDistance) {
              closestMatch = predictions[n];
              closestDistance = colorDifference;
            }
            console.log('match color: ' + closestMatch); // Add this line to log the detected color
            console.log('dist color: ' + closestDistance); // Add this line to log the detected color 

            const p = document.createElement('p');
            p.innerText = predictions[n].class + ' - with ' +
              Math.round(parseFloat(predictions[n].score) * 100) +
              '% confidence.';
            // Draw in top left of bounding box outline.
            p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
              'top: ' + predictions[n].bbox[1] + 'px;' +
              'width: ' + (predictions[n].bbox[2] - 10) + 'px;';

            // Draw the actual bounding box.
            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left: ' + (predictions[n].bbox[0] + 100 )+ 'px; top: '
              + (predictions[n].bbox[1] + 120) + 'px; width: '
              + (predictions[n].bbox[2] + 60) + 'px; height: '
              + (predictions[n].bbox[3] + 60)+ 'px;';

            if (predictions[n] === closestMatch) {
              highlighter.style.border = 'solid 2px #ff0000';
            }


            this.liveView.appendChild(highlighter);
            this.liveView.appendChild(p);

            // Store drawn objects in memory so we can delete them next time around.
            this.children.push(highlighter);
            this.children.push(p);
            //console.log(JSON.stringify(predictions[n]));
          }
        }
      }

      if (closestMatch) {
        console.log('Closest match found with color difference of ' + closestDistance); // Add this line to log the closest match
      }

      // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(this.predictWebcamWithColor.bind(this));
    }.bind(this));
  }
}