import { Outlet } from "react-router-dom";
import { StyledMainNavbar, StyledNavLink, StyledLogo, DesktopNavLinks,HamburgerButton, MobileNavLinks } from "../../styles/jsx/navbar.styles";
import {  Menu } from "lucide-react";
import { useState } from "react";
// import WalletButton from "./WalletButton";
// import logo from "../../../public/ logo.png"
export default function MainNavbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <div>
      <StyledMainNavbar>
        <StyledLogo src="/logo.svg" alt="CertifyMe Logo" />
        <DesktopNavLinks>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/verify`}>VerifyCertificate</StyledNavLink>
          <StyledNavLink to="/signup">Sign Up</StyledNavLink>
          <StyledNavLink to="/login">Login</StyledNavLink>
          {/* <WalletButton /> */}
        </DesktopNavLinks>
        <HamburgerButton onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          <Menu />
        </HamburgerButton>
        {isMobileNavOpen && <MobileNavLinks>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/verify`}>VerifyCertificate</StyledNavLink>
        </MobileNavLinks>}
      </StyledMainNavbar>
      <Outlet />
    </div>
  );
}
