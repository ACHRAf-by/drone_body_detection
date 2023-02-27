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
        <header>
            <Nav>
                <a href='/'>
                    <MyLogo />
                </a>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        <p className='menu'>Home</p>
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        <p className='menu'>About</p>
                    </NavLink>
                    <NavLink to="/products" activeStyle>
                        <p className='menu'>Products</p>
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        <p className='menu'>Contac Us</p>
                    </NavLink>
                    <NavLink to="/demo" activeStyle>
                        <p className='menu'> Demo</p>
                    </NavLink>
                </NavMenu>
                <div className='app'>
                    <MyButton text="GET STARTED" />
                </div>
            </Nav>
        </header>
    );
};

export default Navbar;