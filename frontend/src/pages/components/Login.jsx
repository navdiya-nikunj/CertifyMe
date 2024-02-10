import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saved as studentSaved } from "../../state/studentSlice";
import { saved as instituteSaved } from "../../state/instituteSlice";
import { restored as templateRestored } from "../../state/templateSlice";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import { StyledDiv } from "../../styles/jsx/login.styles";
import textfieldTheme from "../../styles/jsx/textfield.styles";

import TextField from "@mui/material/TextField";

import loginImage from "/login.svg";

import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "styled-components";

export default function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isInstitute: false,
  });
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

  function handleChecked(e) {
    setChecked(e.target.checked);
    setFormData({
      ...formData,
      [e?.target?.name]: e.target.checked,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    await axios
      .post("/auth/login", formData, { withCredentials: true })
      .then((res) => res.data)
      .then((user) => {
        console.log("user", user);

        if (user.instituteName) {
          dispatch(templateRestored(user.templateIds));
          delete user.templateIds;
          dispatch(instituteSaved(user));
        } else {
          dispatch(studentSaved(user));
        }

        navigate(`/profile/${user._id}`);
      })
      .catch((e) => {
        console.log(e.response.data);
        toast.error(e.response.data, {
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
      });
  }

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <h1>Welcome Back!!</h1>
        <h4>Please Login using your credentials</h4>
        <TextField
          sx={textfieldTheme}
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
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
            required
          />
        </FormControl>
        <h4>Password must contain at least 8 Characters, 1 lowercase, 1 uppercase, 1 Number, 1 Special Character </h4>
        <FormGroup sx={{ width: "100%" }}>
          <FormControlLabel
            name="isInstitute"
            checked={checked}
            onChange={handleChecked}
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: theme.light.secondary,
                  },
                }}
              />
            }
            label="Login as Institute"
          />
        </FormGroup>
        <Button type="submit" text="Login" />
        <ToastContainer />
      </form>
    </StyledDiv>
  );
}
