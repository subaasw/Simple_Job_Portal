import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./Home/Home";


const theme = createTheme({
  palette: {
    primary: {
      main: "#433ddd",
    },
  },
});



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById("root")
);
