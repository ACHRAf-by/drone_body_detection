import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #0d0d0d;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;
  
export const NavLink = styled(Link)`
  color: #FFFFFF;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 3rem;
  height: 100%;
  cursor: pointer;
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;