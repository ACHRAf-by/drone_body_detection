import React from 'react';

export function Tracker () {
    return (
        <div>
        <div id="waitForModel">
                <p id="wait">Wait for the model to load ...</p>

                <div className="spinner-border" id="spin" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
                <section id="demos" className="invisible">
                <div className="row">
                    <div className="col camView" id="liveView">
                    <button className="btn btn-dark" id="webcamButton">Launch video tracking</button>
                    <video id="webcam" autoPlay muted width="640" height="480"></video>
                    </div>
                    <div className="col">
                        <div>
                            <input type="color" id="head" name="head"
                                value="#e66465"/>
                            <label htmlFor="head">Head</label>
                        </div>
                        <div>
                            <input type="color" id="body" name="body"
                                    value="#f6b73c"/>
                            <label htmlFor="body">Body</label>
                        </div>
                        <div>
                            <input type="color" id="legs" name="legs"
                                    value="#343F51"/>
                            <label htmlFor="legs">Legs</label>
                        </div>
                        <div>
                            <button className="btn btn-dark" id="#">Track with characteristics</button>
                        </div>
                    </div>
                </div>
                </section>
        </div>
    );
}

export default Tracker;
