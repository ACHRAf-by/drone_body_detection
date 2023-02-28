import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Video from "../components/video";
import Navbar from "../components/Navbar/index";
import App from "../App"
  
// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe('DOM tests'), () => {

  test('Navbar should be complete', () => {

    render(<App/>);

  });

  test('renders the landing page', () => {
    render(<App />);
    
    expect(screen.getByRole("navbar")).toHaveTextContent('Home');
    expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
    expect(screen.getByRole("video")).toBeInTheDocument();
  });

  test('Video should be played in background', () => {
    
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


}