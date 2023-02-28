import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './NavbarElements';
import { MyButton } from '../hoverButton';
import { MyLogo } from '../logo';
import '../../styles/menu.css'

const Navbar = () => {

    return (
            <Nav>
                <a href='/'>
                    <MyLogo />
                </a>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        <p className='menu' id='HomeButton'>Home</p>
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        <p className='menu' id='AboutButton'>About</p>
                    </NavLink>
                    <NavLink to="/products" activeStyle>
                        <p className='menu' id='ProductsButton'>Products</p>
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        <p className='menu' id='ContactButton'>Contact Us</p>
                    </NavLink>
                    <NavLink to="/demo" activeStyle>
                        <p className='menu' id='DemoButton'> Demo</p>
                    </NavLink>
                </NavMenu>
                <div className='app'>
                    <MyButton text="GET STARTED" />
                </div>
            </Nav>
    );
};

export default Navbar;