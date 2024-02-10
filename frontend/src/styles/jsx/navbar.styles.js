import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledMainNavbar = styled.nav`
  font-size: 1.2rem;
  height: 20%;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.5);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 1rem;
  color: ${(props) => props.theme.light.nav.text};
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
  }

  &.active {
    font-weight: bold;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.light.nav.text};
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
  }

  &.active {
    font-weight: bold;
  }
`;

const StyledLogo = styled.img`
  height: 2.5rem;
  width: 8rem;
`;

const StyledNavbar = styled.nav`
font-size: 1.2rem;
height: 20%;
top: 0;
position: sticky;
display: flex;
justify-content: space-between;
align-items: center;
z-index: 100;
box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.5);
`;

export { StyledMainNavbar, StyledNavbar, StyledNavLink, StyledLogo, NavButton };
