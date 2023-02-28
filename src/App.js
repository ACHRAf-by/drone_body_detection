import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import Products from './pages/products';
import PreStarting from './pages/preStarting';

function App() {
return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/getStarted' element={<PreStarting/>} />
        </Routes>
    </Router>
);
}
  
export default App;