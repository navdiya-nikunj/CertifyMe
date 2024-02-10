import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  StyledNavbar,
  StyledNavLink,
  StyledLogo,
} from "../../styles/jsx/navbar.styles";
import axios from "../../axiosConfig";
import Button from "../atoms/Button";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    const message = await axios
      .post("/profile/logout", {}, { withCredentials: true })
      .then((res) => navigate("/", { state: res.data, replace: true }))
      .catch((error) => console.log(error));
    console.log(message);
  };
  return (
    <div style={{ backgroundColor: "#e4e4e4" }}>
      <StyledNavbar>
        <StyledLogo src="../../../public/logo.png" alt="logo" />
        <div>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to={`/profile/${user?._id}`}>Profile</StyledNavLink>
          {/* <StyledNavLink to={}>Log Out</StyledNavLink> */}
          <Button type="button" text="Log Out" onClick={handleLogout} />
        </div>
      </StyledNavbar>
      <Outlet />
    </div>
  );
}
