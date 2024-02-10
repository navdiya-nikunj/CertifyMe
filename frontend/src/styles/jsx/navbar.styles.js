import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavbar = styled.nav`
  font-size: 1.2rem;
  height: 9vh;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${(props) => props.theme.light.primary};
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

export { StyledNavbar, StyledNavLink };
