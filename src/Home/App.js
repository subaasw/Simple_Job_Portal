import {
  Button,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "../Components/NavBar";

// import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({}));

function App() {
  const [search, setSearch] = useState({
    title: "",
    location: "",
  });
  const onChangedHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    console.log(search);
  };
  return (
    <>
      <NavBar isLoggedIn={false} />
      <Grid
        container
        sx={{
          paddingTop: 10,
          paddingLeft: 10,
        }}
      >
        <Grid item lg={6}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            variant="h2"
          >
            Get The
            <Typography marginLeft="6px" variant="h2" color="primary">
              Right Job
            </Typography>
          </Typography>
          <Typography gutterBottom fontSize="60px">
            You Deserve.
          </Typography>
          <Typography gutterBottom variant="caption" fontSize={22}>
            Many jobs listed here!
            <br />
            Your dream job is waiting.
          </Typography>
          <div
            style={{
              width: "fit-content",
              display: "flex",
              justifyItems: "center",
              //   paddingLeft: "10px",
              marginTop: "40px",
              height: "40px",
              //   border: "1px solid gray",
              borderRadius: "8px",
            }}
          >
            <InputBase
              sx={{
                padding: "1px 10px",
                border: "1px solid #ccc5c5",
                borderRight: "0px",
              }}
              value={search.title}
              name="title"
              onChange={onChangedHandler}
              placeholder="Job title or keyword"
            />
            <FormControl>
              <Select
                name="location"
                value={search.location === "" ? "title" : search.location}
                onChange={onChangedHandler}
                // defaultValue="title"
                sx={{
                  flexGrow: 1,
                  width: "200px",
                  height: "100%",
                  borderRadius: "0px",
                  //   border: "0px solid red",
                }}
              >
                <MenuItem disabled value="title">
                  <em>Location</em>
                </MenuItem>
                <MenuItem value="Ghorahi">Ghorahi</MenuItem>
                <MenuItem value="pyuthan">pyuthan</MenuItem>
                <MenuItem value="butwal">butwal</MenuItem>
                <MenuItem value="Deukhuri">Deukhuri</MenuItem>
                <MenuItem value="Tulsipur">Tulsipur</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={onSubmit}
              sx={{
                height: "100%",
                paddingX: "20px",
                border: "0px",
                borderRadius: "0px",
              }}
              variant="contained"
            >
              Search
            </Button>
          </div>
        </Grid>
        <Grid item lg={6}>
          <img width="100%" src="./Assets/interview.png" alt="background" />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
