import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saved as studentSaved } from "../../state/studentSlice";
import { saved as instituteSaved } from "../../state/instituteSlice";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";

import TextField from "@mui/material/TextField";

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

export default function Login() {
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
      .then((res) => {
        console.log("res.data", res.data);

        if (res.data.instituteName) {
          dispatch(instituteSaved(res.data));
        } else {
          dispatch(studentSaved(res.data));
        }

        navigate(`/profile/${res.data._id}`);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>
      Login page
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
        <FormGroup>
          <FormControlLabel
            name="isInstitute"
            checked={checked}
            onChange={handleChecked}
            control={<Checkbox />}
            label="Login as Institute"
          />
        </FormGroup>
        <Button type="submit" text="Login" />
      </form>
    </div>
  );
}
