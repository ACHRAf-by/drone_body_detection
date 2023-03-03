import * as bodyPix from "@tensorflow-models/body-pix";

async function runBodysegment(webcamRef, canvasRef) {

    const net = await bodyPix.load();
    console.log("BodyPix model loaded.");
    //  Loop and detect hands
    setInterval(() => {
        detect(net, webcamRef, canvasRef);
    }, 100);
}

export default runBodysegment;

async function detect(net, webcamRef, canvasRef) {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {

        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        // * One of (see documentation below):
        // *   - net.segmentPerson
        // *   - net.segmentPersonParts
        // *   - net.segmentMultiPerson
        // *   - net.segmentMultiPersonParts
        // const person = await net.segmentPerson(video);
        const person = await net.segmentPersonParts(video);
        console.log(person);

        // const coloredPartImage = bodyPix.toMask(person);
        const coloredPartImage = bodyPix.toColoredPartMask(person);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;
        const canvas = canvas.current;

        bodyPix.drawMask(
            canvas,
            video,
            coloredPartImage,
            opacity,
            maskBlurAmount,
            flipHorizontal
        );
    }
}


