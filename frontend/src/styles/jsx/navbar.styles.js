import styled from "styled-components";
import { NavLink } from "react-router-dom";
import breakpoint from 'styled-components-breakpoint';
import theme from "../theme";

const StyledMainNavbar = styled.nav`
  font-size: 1rem;
  height: auto;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background-color: ${theme.light.nav.background};
  box-shadow: ${theme.light.nav.shadow};
  padding: ${theme.light.spacing.md} ${theme.light.spacing.xl};
  font-family: ${theme.fonts.fontFamily};
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: ${theme.light.spacing.sm} ${theme.light.spacing.md};
  color: ${theme.light.colors.textPrimary};
  transition: all 0.3s ease;
  font-weight: 500;
  border-radius: ${theme.light.borderRadius.small};
  margin: 0 ${theme.light.spacing.xs};

  &:hover {
    background-color: ${theme.light.colors.backgroundLight};
    color: ${theme.light.colors.secondary};
    transform: translateY(-1px);
  }

  &.active {
    font-weight: 600;
    color: ${theme.light.colors.secondary};
    background-color: ${theme.light.colors.backgroundLight};
  }
`;

const NavButton = styled.button`
  background: ${theme.light.colors.secondary};
  border: none;
  font-family: ${theme.fonts.fontFamily};
  font-size: 0.9rem;
  font-weight: 600;
  padding: ${theme.light.spacing.sm} ${theme.light.spacing.lg};
  cursor: pointer;
  color: ${theme.light.colors.textWhite};
  border-radius: ${theme.light.borderRadius.medium};
  transition: all 0.3s ease;
  box-shadow: ${theme.light.shadows.small};

  &:hover {
    background: ${theme.light.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.light.shadows.medium};
  }

  &.active {
    font-weight: 700;
  }
`;

const StyledLogo = styled.img`
  height: 3rem;
  width: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledNavbar = styled.nav`
  font-size: 1rem;
  height: auto;
  top: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.light.nav.background};
  z-index: 100;
  box-shadow: ${theme.light.nav.shadow};
  padding: ${theme.light.spacing.md} ${theme.light.spacing.xl};
  font-family: ${theme.fonts.fontFamily};
`;

const DesktopNavLinks = styled.div`
  display: none;
  ${breakpoint('tablet')`
    display: flex;
    align-items: center;
  `}
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${theme.light.nav.background};
  box-shadow: ${theme.light.nav.shadow};
  z-index: 100;
  padding: ${theme.light.spacing.md};
  
  ${breakpoint('tablet')`
    display: none;
  `}
`;

const HamburgerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${theme.light.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.light.colors.textPrimary};
  padding: ${theme.light.spacing.sm};
  border-radius: ${theme.light.borderRadius.small};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.light.colors.backgroundLight};
  }
  
  ${breakpoint('tablet')`
    display: none;
  `}
`;

export {
  StyledMainNavbar,
  StyledNavbar,
  StyledNavLink,
  StyledLogo,
  NavButton,
  DesktopNavLinks,
  HamburgerButton,
  MobileNavLinks
};
