import { Outlet } from "react-router-dom";
import { StyledNavbar, StyledNavLink } from "../../styles/jsx/navbar.styles";

export default function MainNavbar() {
  return (
    <>
      <StyledNavbar>
        LOGO
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/signup">Sign Up</StyledNavLink>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </div>
      </StyledNavbar>
      <Outlet />
    </>
  );
}
