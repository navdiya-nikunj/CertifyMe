import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saved as studentSaved } from "../../state/studentSlice";
import { saved as instituteSaved } from "../../state/instituteSlice";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import { StyledDiv } from "../../styles/jsx/signup.styles";

import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
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

export default function SignUp() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    instituteName: "",
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
    if (!e.target.checked)
      setFormData({
        ...formData,
        instituteName: "",
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    await axios
      .post("/auth/signup", formData, { withCredentials: true })
      .then((res) => {
        console.log("res.data", res.data);

        if (res.data.instituteName) {
          dispatch(instituteSaved(res.data));
        } else {
          dispatch(studentSaved(res.data));
        }

        navigate(`/profile/${res.data._id}`);
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
      <div></div>
      <form onSubmit={handleSubmit}>
        <h1>SignUp page</h1>
        <TextField
          sx={{ m: 1, width: "100%" }}
          name="email"
          id="outlined-basic"
          label="Email"
          type="email"
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
        <FormGroup sx={{ width: "100%" }}>
          <FormControlLabel
            sx={{ m: 1, width: "100%" }}
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
            label="Register as Institute"
          />
        </FormGroup>
        {checked ? (
          <TextField
            sx={{ m: 1, width: "100%" }}
            name="instituteName"
            id="outlined-basic"
            label="Institute Name"
            variant="outlined"
            onChange={handleChange}
            value={formData.instituteName}
            required
          />
        ) : (
          <></>
        )}

        <Button type="submit" text="Sign Up" />
        <ToastContainer />
      </form>
    </StyledDiv>
  );
}
