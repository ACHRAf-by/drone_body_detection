import * as bodyPix from "@tensorflow-models/body-pix";



export default class HumanSegmentationModel{


    video;
    liveView;
    segmentationProperties;
    colourMap;
    model;
    previousSegmentationComplete;

    constructor(){
        this.model = undefined;
        this.video = undefined;
        this.liveView = undefined;
        console.log("Constructor init");
        console.log(this.liveView);

        this.bodyPixProperties = {
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 4
        };

        this.segmentationProperties = {
            flipHorizontal: false,
            internalResolution: 'high',
            segmentationThreshold: 0.9
        };

        // This array will hold the colours we wish to use to highlight different body parts we find.
        // RGBA (Red, Green, Blue, and Alpha (transparency) channels can be specified).
        this.colourMap = [];

        // Left_face
        this.colourMap.push({ r: 244, g: 67, b: 54, a: 255 });
        // Right_face
        this.colourMap.push({ r: 183, g: 28, b: 28, a: 255 });
        // left_upper_arm_front
        this.colourMap.push({ r: 233, g: 30, b: 99, a: 255 });
        // left_upper_arm_back  
        this.colourMap.push({ r: 136, g: 14, b: 79, a: 255 });
        // right_upper_arm_front
        this.colourMap.push({ r: 233, g: 30, b: 99, a: 255 });
        // 	right_upper_arm_back
        this.colourMap.push({ r: 136, g: 14, b: 79, a: 255 });
        // 	left_lower_arm_front
        this.colourMap.push({ r: 233, g: 30, b: 99, a: 255 });
        // 	left_lower_arm_back
        this.colourMap.push({ r: 136, g: 14, b: 79, a: 255 });
        // right_lower_arm_front
        this.colourMap.push({ r: 233, g: 30, b: 99, a: 255 });
        // right_lower_arm_back
        this.colourMap.push({ r: 136, g: 14, b: 79, a: 255 });
        // left_hand 
        this.colourMap.push({ r: 156, g: 39, b: 176, a: 255 });
        // right_hand
        this.colourMap.push({ r: 156, g: 39, b: 176, a: 255 });
        // torso_front
        this.colourMap.push({ r: 63, g: 81, b: 181, a: 255 });
        // torso_back 
        this.colourMap.push({ r: 26, g: 35, b: 126, a: 255 });
        // left_upper_leg_front
        this.colourMap.push({ r: 33, g: 150, b: 243, a: 255 });
        // left_upper_leg_back
        this.colourMap.push({ r: 13, g: 71, b: 161, a: 255 });
        // right_upper_leg_front
        this.colourMap.push({ r: 33, g: 150, b: 243, a: 255 });
        // right_upper_leg_back
        this.colourMap.push({ r: 13, g: 71, b: 161, a: 255 });
        // left_lower_leg_front
        this.colourMap.push({ r: 0, g: 188, b: 212, a: 255 });
        // left_lower_leg_back
        this.colourMap.push({ r: 0, g: 96, b: 100, a: 255 });
        // right_lower_leg_front
        this.colourMap.push({ r: 0, g: 188, b: 212, a: 255 });
        // right_lower_leg_back
        this.colourMap.push({ r: 0, g: 188, b: 212, a: 255 });
        // left_feet
        this.colourMap.push({ r: 255, g: 193, b: 7, a: 255 });
        // right_feet
        this.colourMap.push({ r: 255, g: 193, b: 7, a: 255 });

        this.previousSegmentationComplete = true;

    }

    // A function to render returned segmentation data to a given canvas context.
    processSegmentation(canvas, segmentation) {
        var ctx = canvas.getContext('2d');

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        let n = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (segmentation.data[n] !== -1) {
                data[i] = this.colourMap[segmentation.data[n]].r;     // red
                data[i + 1] = this.colourMap[segmentation.data[n]].g; // green
                data[i + 2] = this.colourMap[segmentation.data[n]].b; // blue
                data[i + 3] = this.colourMap[segmentation.data[n]].a; // alpha
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 0;
            }
            n++;
        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Check if webcam access is supported.
    hasGetUserMedia() {
        return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
    }


    // This function will repeatidly call itself when the browser is ready to process
    // the next frame from webcam.
    predictWebcam() {
        if (this.previousSegmentationComplete) {
            // Copy the video frame from webcam to a tempory canvas in memory only (not in the DOM).
            this.videoRenderCanvasCtx.drawImage(this.video, 0, 0);
            this.previousSegmentationComplete = false;
            // Now classify the canvas image we have available.
            this.model.segmentPersonParts(this.videoRenderCanvas, this.segmentationProperties).then(function (segmentation) {
                this.processSegmentation(this.webcamCanvas, segmentation);
                this.previousSegmentationComplete = true;
            }.bind(this));
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(this.predictWebcam.bind(this));
    }

    async loadModel(){

        await bodyPix.load(this.bodyPixProperties).then(function (loadedModel) {
            this.model = loadedModel;
            console.log('Model Loaded')
            this.video = document.getElementById('webcam');
            this.liveView = document.getElementById('liveView');
        }.bind(this));
          
        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        // Lets create a canvas to render our findings to the DOM.
        this.webcamCanvas = document.createElement('canvas');
        //this.webcamCanvas.setAttribute('class', 'overlay');
        this.webcamCanvas.setAttribute('class', 'cam_canvas');
        this.liveView.appendChild(this.webcamCanvas);

        // We will also create a tempory canvas to render to that is in memory only
        // to store frames from the web cam stream for classification.
        this.videoRenderCanvas = document.createElement('canvas');
        this.videoRenderCanvasCtx = this.videoRenderCanvas.getContext('2d');

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
   
            this.video.addEventListener('loadedmetadata', this.setHeightAndWidth.bind(this));

            this.video.srcObject = stream;

            this.video.addEventListener('loadeddata', this.predictWebcam.bind(this));
        }.bind(this));

      }

    setHeightAndWidth(){
        // Update widths and heights once video is successfully played otherwise
        // it will have width and height of zero initially causing classification
        // to fail.
        console.log("VIDEOOOOOOOOOOOOOOOOOOOOOOOO " + this.video);
        this.webcamCanvas.width = this.video.videoWidth;
        this.webcamCanvas.height = this.video.videoHeight;
        this.videoRenderCanvas.width = this.video.videoWidth;
        this.videoRenderCanvas.height = this.video.videoHeight;
    }
}
