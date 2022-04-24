import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebaase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "block",
    backgroundColor: theme.palette.primary.main,
    height: "700px",
    paddingTop: "20px",
  },
}));

function RegisterPage() {
  const classes = useStyles();

  const userCollectionRef = collection(db, "users_data");

  const [registerUser, setRegisterUser] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    retypePassword: "",
    position: "",
  });

  let curname, curvalue;
  const getRegisterData = (e) => {
    curname = e.target.name;
    curvalue = e.target.value;
    setRegisterUser({ ...registerUser, [curname]: curvalue });
  };

  const submit_Result = (e) => {
    e.preventDefault();
    if (registerUser.password !== registerUser.retypePassword) {
      alert("Password Must be Same");
    } else if (
      registerUser.email !== "" ||
      registerUser.name !== "" ||
      registerUser.phone !== "" ||
      registerUser.gender !== "" ||
      registerUser.password !== "" ||
      registerUser.position !== ""
    ) {
      console.log(registerUser);

      // sign Up using email
      const emailSignUp = async () => {
        try {
           await createUserWithEmailAndPassword(
            auth,
            registerUser.email,
            registerUser.password
          );

          addUserData();
          setRegisterUser({
            name: "",
            phone: "",
            email: "",
            position: "",
            gender: "",
            password: "",
            retypePassword: "",
          });
        } catch (error) {
          console.log(error.message);
        }
      };

      emailSignUp();

      const addUserData = async () => {
        await addDoc(userCollectionRef, {
          name: registerUser.name,
          phone: registerUser.phone,
          email: registerUser.email,
          gender: registerUser.gender,
          position: registerUser.position,
        });
      };
    } else {
      alert("Something went wrong!");
    }
  };
  return (
    <Grid container>
      <Grid item lg={4}>
        <Container className={classes.container}>
          <Typography
            textTransform="uppercase"
            padding="35px 25px"
            variant="h4"
            color="white"
          >
            A few clicks away from creating your account
          </Typography>
          <img
            height="350px"
            width="100%"
            alt="background"
            src="./Assets/undraw_enter_uhqk.svg"
          />
        </Container>
      </Grid>
      <Grid item lg={8}>
        <Container
          sx={{
            marginTop: 11.5,
          }}
        >
          <Typography gutterBottom variant="h3">
            Register
          </Typography>
          <form onSubmit={submit_Result}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gridRowGap: "20px",
                gridColumnGap: "50px",
                marginBottom: 25,
              }}
            >
              <TextField
                required
                name="name"
                value={registerUser.name}
                onChange={getRegisterData}
                label="Full Name"
                variant="outlined"
              />
              <TextField
                required
                name="phone"
                value={registerUser.phone}
                onChange={getRegisterData}
                label="Phone Number"
                variant="outlined"
              />
              <TextField
                required
                type="email"
                name="email"
                value={registerUser.email}
                onChange={getRegisterData}
                label="Email"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  required
                  name="gender"
                  value={registerUser.gender}
                  label="Gender"
                  onChange={getRegisterData}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                name="password"
                value={registerUser.password}
                onChange={getRegisterData}
                label="Password"
                variant="outlined"
              />
              <TextField
                required
                name="retypePassword"
                value={registerUser.retypePassword}
                onChange={getRegisterData}
                label="Retype Password"
                variant="outlined"
              />
              <TextField
                required
                name="position"
                value={registerUser.position}
                onChange={getRegisterData}
                label="Job Position"
                variant="outlined"
                placeholder="React Developer , Software Engineer "
              />
            </div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Yes, I want to receive emails."
                sx={{
                  color: "rgba(0,0,0,0.7)",
                }}
              />
            </FormGroup>

            <Button
              type="submit"
              sx={{
                padding: "10px 25px",
                margin: "10px 0px",
              }}
              variant="contained"
              onClick={submit_Result}
            >
              Create Account
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography fontSize={16} variant="caption">
              Already have an account?
            </Typography>
            <Link to="/login">
              <Button
                sx={{
                  textTransform: "none",
                  fontSize: 18,
                }}
              >
                LogIn
              </Button>
            </Link>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
