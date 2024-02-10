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
  padding: 0.2rem;
  background-color: #8C7AA9;
  backdrop-filter: blur(8px);
  z-index: 100;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 1rem;
  color: ${(props) => props.theme.light.secondary};
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
`

const StyledNavbar = styled.nav`
margin-top: 0.5rem;
  border-radius: 20px;
  font-size: 1.2rem;
  height: 9%;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  background-color: #8C7AA9;
  backdrop-filter: blur(8px);
  z-index: 100;
`

export { StyledMainNavbar,StyledNavbar, StyledNavLink,StyledLogo };
