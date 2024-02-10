import { Outlet } from "react-router-dom";
import { StyledMainNavbar, StyledNavLink, StyledLogo } from "../../styles/jsx/navbar.styles";
// import logo from "../../../public/logo.png"
export default function MainNavbar() {
  return (
    <div>
      <StyledMainNavbar>
        <StyledLogo src="/logo.png" alt="logo" />
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/verify`}>VerifyCertificate</StyledNavLink>
          <StyledNavLink to="/signup">Sign Up</StyledNavLink>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </div>
      </StyledMainNavbar>
      <Outlet />
    </div>
  );
}
