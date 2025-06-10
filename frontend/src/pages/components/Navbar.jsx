import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  StyledNavbar,
  StyledNavLink,
  StyledLogo,
  NavButton,
} from "../../styles/jsx/navbar.styles";
import axios from "../../axiosConfig";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const message = await axios
      .post("/profile/logout", {}, { withCredentials: true })
      .then((res) =>
        navigate("/", {
          state: { isLogout: true, data: res.data },
          replace: true,
        })
      )
      .catch((error) => console.log(error));
    console.log(message);
  };
  return (
    <div>
      <StyledNavbar>
        <StyledLogo src="/logo.svg" alt="CertifyMe Logo" />
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/profile/${user?._id}`}>Profile</StyledNavLink>
          <StyledNavLink to={`/verify`}>Verify Certificate</StyledNavLink>
          {/* <StyledNavLink to={}>Log Out</StyledNavLink> */}
        </div>
        <NavButton type="button" onClick={handleLogout}>
          Log Out
        </NavButton>
      </StyledNavbar>
      <Outlet />
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string
  })
};
