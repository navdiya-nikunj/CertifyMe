import { Outlet } from "react-router-dom";
import { StyledNavbar, StyledNavLink } from "../../styles/jsx/navbar.styles";
import { NavLink, Outlet } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <>
      <StyledNavbar>
        LOGO
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/profile/${user?._id}`}>Profile</StyledNavLink>
        </div>
      </StyledNavbar>

      <Outlet />
    </>
  );
}
