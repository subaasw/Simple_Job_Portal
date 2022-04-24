import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebaase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "block",
    backgroundColor: theme.palette.primary.main,
    height: "700px",
    paddingTop: "20px",
  },
  textInput: {
    marginBottom: 10,
  },
}));

function LoginPage({setCurrentUser}) {
  const classes = useStyles();
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;

  const onChangedHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const getLoginData = (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      const signIn = async () => {
        try {
          const currentUser = await signInWithEmailAndPassword(
            auth,
            user.email,
            user.password
          );
          if (currentUser.user.email) {
            let email = currentUser.user.email
            setCurrentUser(email)
            localStorage.setItem("user",JSON.stringify(email))
            navigate("/job-list");
          }
          // console.log(currentUser.user.email);
        } catch (e) {
          alert(e.message);
        }
      };
      signIn();
    } else {
      alert("Please fill all the fields");
    }
  };

  const textInput = {
    marginBottom: "20px",
    marginRight: "50px",
  };

  return (
      <Grid container>
        <Grid item lg={4}>
          <Container className={classes.container}>
            <Typography padding="35px 55px" variant="h3" color="white">
              Discover the suitable job for you
            </Typography>
            <img
              height="350px"
              width="90%"
              alt="Login BG"
              src="./Assets/undraw_login_re_4vu2.svg"
            />
          </Container>
        </Grid>
        <Grid item lg={4.5}>
          <Container
            sx={{
              marginTop: 15,
            }}
          >
            <form onSubmit={getLoginData}>
              <Stack spacing={3} direction="column">
                <Typography gutterBottom variant="h3">
                  Login
                </Typography>

                <TextField
                  required
                  name="email"
                  value={user.email}
                  onChange={onChangedHandler}
                  sx={textInput}
                  label="Email Address"
                  variant="outlined"
                />
                <TextField
                  required
                  name="password"
                  value={user.password}
                  onChange={onChangedHandler}
                  sx={textInput}
                  label="Password"
                  variant="outlined"
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember me"
                    sx={{
                      color: "rgba(0,0,0,0.7)",
                    }}
                  />
                </FormGroup>
                <Button
                  type="submit"
                  sx={{
                    width: "200px",
                    padding: "7px 15px",
                    fontSize: 16,
                  }}
                  variant="contained"
                >
                  LogIn
                </Button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize={16} variant="caption">
                    Don't have an account yet?
                  </Typography>
                  <Link to="/register">
                    <Button
                      sx={{
                        textTransform: "none",
                        fontSize: 18,
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </Stack>
            </form>
          </Container>
        </Grid>
      </Grid>
  );
}

export default LoginPage;
