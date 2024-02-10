import { useTheme } from "styled-components";

const textfieldTheme = () => {
  const theme = useTheme();
  return {
    width: "100%",
    m: 0.5,
    "& fieldset": {
      borderColor: theme.light.secondary,
    },
    "& input": {
      color: theme.light.secondary,
    },
    "& label": {
      color: theme.light.secondary,
    },
    // "& .MuiOutlinedInput-root": {
    //   "&.Mui-focused": {
    //     borderColor: "#fff",
    //   },
    // },
  };
};

export default textfieldTheme;
