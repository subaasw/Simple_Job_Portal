import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const colorBlack = {
    color: "black",
    fontWight: "bold",
  };
  return (
    <>
      <AppBar
        position="relative"
        sx={{
          paddingTop: "17px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            marginLeft: 8,
          }}
        >
          <Link to="/">
            <img
              height="80px"
              width="150px"
              src="./Assets/logo_.png"
              alt="Company logo"
            />
          </Link>
          <Stack
            sx={{
              marginLeft: 15,
              flexGrow: 1,
            }}
            spacing={2}
            direction="row"
          >
            <Link to="/job-list">
              <Button sx={colorBlack}>Job list</Button>
            </Link>
            <Link to="/about">
              <Button sx={colorBlack}>about US</Button>
            </Link>
            <Link to="/contact">
              <Button sx={colorBlack}>Contact us</Button>
            </Link>

            <Link to="/company/register">
              <Button sx={colorBlack}>Register Company</Button>
            </Link>
          </Stack>

          <div
            style={{
              margin: "auto",
              paddingRight: "90px",
            }}
          >
            {currentUser ? (
             ""
            ) : (
              <>
                <Link to="/login">
                  <Button
                    sx={{
                      marginRight: "20px",
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outlined">join us</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
