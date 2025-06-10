// import { useTheme } from "styled-components";

const textfieldTheme = {
  width: "100%",
  margin: "0.5rem 0",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#3498db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2c3e50",
      borderWidth: "2px",
    },
    "&.Mui-error fieldset": {
      borderColor: "#e74c3c",
    }
  },
  "& .MuiInputLabel-root": {
    color: "#7f8c8d",
    fontWeight: "500",
    "&.Mui-focused": {
      color: "#2c3e50",
    },
    "&.Mui-error": {
      color: "#e74c3c",
    }
  },
  "& .MuiInputBase-input": {
    padding: "14px 16px",
    fontSize: "1rem",
    color: "#2c3e50",
  },
  "& .MuiFormHelperText-root": {
    marginTop: "8px",
    fontSize: "0.875rem",
    "&.Mui-error": {
      color: "#e74c3c",
    }
  }
};

export default textfieldTheme;
