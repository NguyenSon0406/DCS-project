import { createTheme } from "@mui/material";

const primary = "#18E1D9";
const secondary = "#0B0B15";

export default createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightLight:1000
  },
  palette: {
    // primary: {
    //   main: primary,
    // },
    // secondary: {
    //   main: secondary,
    // },
  },
  
    DialogActions: {
      root: {
        padding: "8px 24px 16px 24px",
      },
    },
    MuiButton: {
      root: {
        fontWeight: 600,
        textTransform: "none",
        color: secondary,
        padding: "6px 24px",
      },
      outlined: {
        borderRadius: "35px",
        borderColor: secondary,
        padding: "6px 20px",
      },
    },
    MuiSelect: {
      filled: {
        padding: "15px 0 15px 15px",
      },
      fontWeight:"bold",
    },
    MuiFilledInput: {
      input: {
        height: "49px",
        padding: "0px 0 0 10px",
      },
    },
    
});