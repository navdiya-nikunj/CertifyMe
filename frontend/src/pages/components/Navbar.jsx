import { Outlet } from "react-router-dom";
import { StyledNavbar, StyledNavLink ,StyledLogo} from "../../styles/jsx/navbar.styles";

export default function Navbar({ user }) {
  return (
    <div style={{backgroundColor:"#e4e4e4"}}>
      <StyledNavbar>
      <StyledLogo src="../../../public/logo.png" alt="logo" />
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/profile/${user?._id}`}>Profile</StyledNavLink>
        </div>
        
      </StyledNavbar>
      <Outlet />
    </div>
  );
}
