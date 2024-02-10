import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledMainNavbar = styled.nav`
  border-radius: 20px;
  font-size: 1.2rem;
  height: 9%;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  background-color: #a3caf6;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.light.nav.color1},
    ${({ theme }) => theme.light.nav.color2}
  );
  z-index: 100;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
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
  height: 2rem;
  width: 7rem;
`;

const StyledNavbar = styled.nav`
  padding-left: 1rem;
  margin-top: 0.5rem;
  border-radius: 20px;
  font-size: 1.2rem;
  height: 9%;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  background: linear-gradient(to right, #f5d9e4, #d6d0f7);
  backdrop-filter: blur(8px);
  z-index: 100;
  color: white;
`;

export { StyledMainNavbar, StyledNavbar, StyledNavLink, StyledLogo, NavButton };
