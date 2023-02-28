import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Video from "../components/video";
import Navbar from "../components/Navbar/index";
import App from "../App";
import { BrowserRouter } from 'react-router-dom';

  
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
}) 

test('renders Home, About and Contact links', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);
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
  
  expect(screen.getByRole("banner")).toHaveTextContent('Home');
  expect(screen.getByRole("video")).toBeInTheDocument();
});

test('Video should be played in background', () => {
  render(<Video/>);
  expect(screen.getByRole("video").toBeInTheDocument());
});

test('Home button should redirect to Home', () => {
  
});

test('Logo button should redirect to Home', () => {
  
});

test('About button should redirect to about page', () => {
  
});

test('Products button should redirect to products page', () => {
  
});

test('Demo button should redirect to demo page', () => {
  
});

test('Contact button should redirect to contact page', () => {
  
});

test('Get started button should redirect to get started page', () => {
  
});
