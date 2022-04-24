import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../Firebaase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "block",
    backgroundColor: theme.palette.primary.main,
    height: "700px",
    paddingTop: "20px",
  },
}));

function CompanyRegister() {
  const classes = useStyles();
  const userCollectionRef = collection(db, "company_data");

  const [registerUser, setRegisterUser] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    password: "",
    retypePassword: "",
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
      alert("Password must be same ");
    } else if (
      registerUser.email !== "" ||
      registerUser.name !== "" ||
      registerUser.phone !== "" ||
      registerUser.gender !== "" ||
      registerUser.password !== "" ||
      registerUser.position !== ""
    ) {
      console.log(registerUser);

    
      const signUpWithEmail = async () => {
        try {
          const company = await createUserWithEmailAndPassword(
            auth,
            registerUser.email,
            registerUser.password
          );
          addRegisterData();
        } catch (e) {
          console.log(e.message);
        }
      };
      signUpWithEmail();


      const addRegisterData = async () => {
      await addDoc(userCollectionRef, {
          email: registerUser.email,
          name: registerUser.name,
          location: registerUser.location,
          phone: registerUser.phone,
        });
        
        setRegisterUser({
          name: "",
          phone: "",
          email: "",
          location: "",
          password: "",
          retypePassword: "",
        });
      };
    }
    else{
      alert("Please Fill all the fields")
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
            src="../Assets/undraw_enter_uhqk.svg"
          />
        </Container>
      </Grid>
      <Grid item lg={8}>
        <Container
          sx={{
            marginTop: 16,
          }}
        >
          <Typography gutterBottom variant="h4">
            Register as a Company
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
                label="Company Name"
                variant="outlined"
              />
              <TextField
                required
                name="phone"
                value={registerUser.phone}
                onChange={getRegisterData}
                label="Contact Number"
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
              <TextField
                required
                name="location"
                value={registerUser.location}
                onChange={getRegisterData}
                label="Location"
                variant="outlined"
              />
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

export default CompanyRegister;
