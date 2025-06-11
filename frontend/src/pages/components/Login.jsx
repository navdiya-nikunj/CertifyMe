import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saved as studentSaved } from "../../state/studentSlice";
import { saved as instituteSaved } from "../../state/instituteSlice";
import { restored as templateRestored } from "../../state/templateSlice";
import styled from "styled-components";
import theme from "../../styles/theme";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import textfieldTheme from "../../styles/jsx/textfield.styles";

import TextField from "@mui/material/TextField";
import { FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, Card, CardContent } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 1.125rem;
  color: ${theme.light.colors.textPrimary};
  text-align: center;
  padding: ${theme.light.spacing.xl};
  background: ${theme.light.colors.backgroundLight};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
  
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.light.gradients.educational};
  padding: ${theme.light.spacing.xl};
`;

const LoginCard = styled(Card)`
  && {
    width: 100%;
    max-width: 500px;
    border-radius: ${theme.light.borderRadius.xl};
    box-shadow: ${theme.light.shadows.large};
    overflow: hidden;
  }
`;

const CardHeader = styled.div`
  background: ${theme.light.colors.primary};
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl} ${theme.light.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  margin-bottom: ${theme.light.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.md};
`;

const Subtitle = styled.p`
  opacity: 0.9;
  font-size: 1.125rem;
  margin: 0;
`;

const FormSection = styled(CardContent)`
  && {
    padding: ${theme.light.spacing.xxl};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.lg};
`;

const UserTypeSelector = styled.div`
  display: flex;
  gap: ${theme.light.spacing.md};
  margin: ${theme.light.spacing.lg} 0;
`;

const UserTypeCard = styled.div`
  flex: 1;
  padding: ${theme.light.spacing.lg};
  border: 2px solid ${props => props.selected ? theme.light.colors.secondary : theme.light.colors.backgroundDark};
  border-radius: ${theme.light.borderRadius.medium};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? theme.light.colors.secondary + '10' : theme.light.colors.background};
  
  &:hover {
    border-color: ${theme.light.colors.secondary};
    transform: translateY(-2px);
  }
  
  h4 {
    margin: ${theme.light.spacing.sm} 0 ${theme.light.spacing.xs};
    color: ${props => props.selected ? theme.light.colors.secondary : theme.light.colors.primary};
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${theme.light.colors.textSecondary};
  }
`;

const UserTypeIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.selected ? theme.light.colors.secondary : theme.light.colors.textLight};
  margin-bottom: ${theme.light.spacing.sm};
`;

const PasswordRequirements = styled.div`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.md};
  border-radius: ${theme.light.borderRadius.small};
  font-size: 0.875rem;
  color: ${theme.light.colors.textSecondary};
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  text-align: center;
  margin-top: ${theme.light.spacing.lg};
  padding-top: ${theme.light.spacing.lg};
  border-top: 1px solid ${theme.light.colors.backgroundDark};
  
  a {
    color: ${theme.light.colors.secondary};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isInstitute: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(e) {
    const value = e?.target?.value;
    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  function handleUserTypeSelect(isInstitute) {
    setFormData({
      ...formData,
      isInstitute: isInstitute,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post("/auth/login", formData, { withCredentials: true });
      const user = response.data;

        if (user.instituteName) {
          dispatch(templateRestored(user.templateIds));
          delete user.templateIds;
          dispatch(instituteSaved(user));
        } else {
          dispatch(studentSaved(user));
        }

      toast.success(`Welcome back, ${user.fullName || user.instituteName}!`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

        navigate(`/profile/${user._id}`);
    } catch (error) {
      toast.error(error.response?.data || "Login failed. Please try again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <MobileView>
        This application is optimized for desktop and tablet devices. 
        Please use a larger screen for the best experience.
    </MobileView>
      
      <Container>
        <LoginCard>
          <CardHeader>
            <Title>
              <LoginIcon fontSize="large" />
              Welcome Back
            </Title>
            <Subtitle>Sign in to your CertifyMe account</Subtitle>
          </CardHeader>
          
          <FormSection>
            <StyledForm onSubmit={handleSubmit}>
              <UserTypeSelector>
                <UserTypeCard 
                  selected={!formData.isInstitute}
                  onClick={() => handleUserTypeSelect(false)}
                >
                  <UserTypeIcon selected={!formData.isInstitute}>
                    <PersonIcon fontSize="inherit" />
                  </UserTypeIcon>
                  <h4>Student</h4>
                  <p>Access your certificates</p>
                </UserTypeCard>
                
                <UserTypeCard 
                  selected={formData.isInstitute}
                  onClick={() => handleUserTypeSelect(true)}
                >
                  <UserTypeIcon selected={formData.isInstitute}>
                    <SchoolIcon fontSize="inherit" />
                  </UserTypeIcon>
                  <h4>Institution</h4>
                  <p>Manage certificates</p>
                </UserTypeCard>
              </UserTypeSelector>

        <TextField
          sx={textfieldTheme}
          name="email"
                label="Email Address"
                type="email"
          variant="outlined"
          onChange={handleChange}
          value={formData.email}
                disabled={isLoading}
          required
                fullWidth
        />
              
              <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={formData.password}
            onChange={handleChange}
                  disabled={isLoading}
            required
                  sx={textfieldTheme}
          />
        </FormControl>

              <PasswordRequirements>
                Password must contain at least 8 characters, including uppercase, 
                lowercase, numbers, and special characters.
              </PasswordRequirements>

              <Button 
                type="submit" 
                text={isLoading ? "Signing In..." : "Sign In"}
                disabled={isLoading}
              />
              
              <FooterLinks>
                Don&apos;t have an account? <NavLink to="/signup">Sign up here</NavLink>
              </FooterLinks>
            </StyledForm>
          </FormSection>
        </LoginCard>
      </Container>
      
        <ToastContainer />
    </>
  );
}
