import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import React from 'react'
import '@testing-library/jest-dom';
import Video from "../components/video";
import App from "../App";

  
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
}) 

test('renders Home, About and Contact links', () => {
  render(<App/>);
  const homeLink = screen.getByRole('link', { name: /home/i });
  const aboutLink = screen.getByRole('link', { name: /about/i });
  const demoLink = screen.getByRole('link', { name: /demo/i });
  const productsLink = screen.getByRole('link', { name: /products/i });
  const contactLink = screen.getByRole('link', { name: /contact/i });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
  expect(demoLink).toBeInTheDocument();
  expect(productsLink).toBeInTheDocument();
});

test('renders the landing page', () => {
  render(<App />);
  
  const homeNavBar = screen.getByRole('navigation');
  expect(homeNavBar).toBeInTheDocument();
});

test('Video should be played in background', () => {
  render(<Video/>);
  const videoBackground = screen.Video;

  expect(videoBackground).toBeInTheDocument();
});

test('Home button should redirect to Home', () => {
  render(<App/>);
  const homeLink = screen.getByRole('link', { name: /home/i });

  fireEvent.click(homeLink);

  expect(window.location.pathname).toEqual('/');
});

test('Logo button should redirect to Home', () => {
  
});

test('About button should redirect to about page', () => {
  render(<App/>);
  const aboutLink = screen.getByRole('link', { name: /about/i });

  fireEvent.click(aboutLink);

  expect(window.location.pathname).toEqual('/about');
});

test('Products button should redirect to products page', () => {
  render(<App/>);
  const productsLink = screen.getByRole('link', { name: /products/i });

  fireEvent.click(productsLink);

  expect(window.location.pathname).toEqual('/products');
});

test('Demo button should redirect to demo page', () => {
  render(<App/>);
  const demoLink = screen.getByRole('link', { name: /demo/i });

  fireEvent.click(demoLink);

  expect(window.location.pathname).toEqual('/demo');
});

test('Contact button should redirect to contact page', () => {
  render(<App/>);
  const contactLink = screen.getByRole('link', { name: /contact/i });

  fireEvent.click(contactLink);

  expect(window.location.pathname).toEqual('/contact');
});

test('Get started button should redirect to get started page', () => {
  
});
