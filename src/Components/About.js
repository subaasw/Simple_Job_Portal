import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function About() {
  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography marginTop={5} gutterBottom color="primary" variant="h2">
          About US
        </Typography>
        <Typography
          fontSize={22}
          margin="40px 390px"
          variant="body2"
          color="textSecondary"
        >
          {" "}
          We are here for you to provide best and suitable for you ! And For
          Company We help you to find best talent.. Lets get connected and apply
          or post job.{" "}
        </Typography>
        <Link to="/contact">
          <Button
            sx={{
              width: "300px",
              height: "50px",
              fontSize: "18.5px",
            }}
            variant="contained"
          >
            Contact Us For More{" "}
          </Button>
        </Link>
      </div>
    </>
  );
}

export default About;
