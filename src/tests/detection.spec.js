import { render, cleanup, fireEvent } from "@testing-library/react";
import React from 'react'
import '@testing-library/jest-dom';
import LiveCameraComponent from "../components/liveCamera";
import SideButtons from "../components/sideButtons";


// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('Classic Button should not be visible', () => {
    render(<LiveCameraComponent />);
    expect(document.getElementById("classicButton")).toBeNull();
});

test('Color Button should not be visible', () => {
    render(<LiveCameraComponent />);
    expect(document.getElementById('colorButton')).toBeNull();
});

test('Segmentation Button should not be visible', () => {
    render(<LiveCameraComponent />);
    expect(document.getElementById("segmentationButton")).toBeNull();
});

test('Click on Start Tracking displays classic button', () => {
    render(<LiveCameraComponent />);
    const startButton = document.getElementById("webCamButton", { name: 'Start Tracking' });
    console.log(startButton)
    fireEvent.click(startButton);

    const classicButton = document.getElementById("classicButton");
    expect(classicButton).toBeVisible();
});

test('Click on Start Tracking displays color button', () => {
    render(<LiveCameraComponent />);
    const startButton = document.getElementById("webCamButton", { name: 'Start Tracking' });
    fireEvent.click(startButton);

    const colorButton = document.getElementById("colorButton");
    expect(colorButton).toBeVisible();
});

test('Click on Start Tracking displays segmentation button', () => {
    render(<LiveCameraComponent />);
    const startButton = document.getElementById("webCamButton", { name: 'Start Tracking' });
    fireEvent.click(startButton);

    const buttonSegmentation = document.getElementById("segmentationButton");
    expect(buttonSegmentation).toBeVisible();
});

test('Click on Classic Tracking loads model', async () => {

    render(<LiveCameraComponent />);
    const startButton = document.getElementById("webCamButton", { name: 'Start Tracking' });
    fireEvent.click(startButton);

    const startModelSpy = jest.fn();
    const { getByTestId } = render(<SideButtons handleClassicModelStart={startModelSpy} />)
    fireEvent.click(getByTestId('id'));
});

test('Click on Color Tracking opens color picker', () => {
    render(<LiveCameraComponent />);
    const startButton = document.getElementById("webCamButton", { name: 'Start Tracking' });
    fireEvent.click(startButton);

    const colorButton = document.getElementById("colorButton");
    fireEvent.click(colorButton);

    const colorPicker = document.getElementById("hexColorPicker");
    expect(colorPicker).toBeVisible();
});
