import { FmdGood } from "@mui/icons-material";
import { Container, Button, Divider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

function RightSide({ details }) {
  // let id = ;
  // console.log(details);
  return (
    <Container
      sx={{
        mt: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            background: "#4dd33398",
            borderRadius: "10px",
          }}
        >
          <img
            height={90}
            width={70}
            src="./Assets/undraw_login_re_4vu2.svg"
            alt="Company Logo"
          />
        </Toolbar>
        <Typography color="primary" marginTop={2} variant="h6">
          {details?.category}
        </Typography>

        <Typography gutterBottom alignItems="center" color="textSecondary">
          {details?.company_name} <FmdGood fontSize="inherit" />
          {details?.location}
        </Typography>
      </div>
      <Divider
        flexItem
        sx={{
          mb: 2,
          mt: 1,
        }}
      />

      <Typography variant="h6">Description</Typography>
      <Typography
        sx={{
          marginBottom: "19px",
        }}
        gutterBottom
        variant="body2"
        fontSize={13}
      >
        {details?.desc}
      </Typography>

      <Typography variant="h6">Responsibilities</Typography>
      <ul
        style={{
          //   color:"gray",
          fontWeight: "normal",
          fontSize: 13,
          marginLeft: "10px",
        }}
      >
        {details?.responsibilities}
      </ul>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "25px 25px",
          marginTop: "25px",
          borderRadius: "15px",
        }}
      >
        <Typography marginTop={1} variant="body1" fontSize={18}>
          Employment Status : {details?.employment_status}
        </Typography>
        <Typography marginTop={1} variant="body1" fontSize={18}>
          No of vacancy : {details?.noOfVacancy}
        </Typography>
        <Typography marginTop={1} variant="body1" fontSize={18}>
          Location : {details?.location}
        </Typography>
        <Typography marginTop={1} variant="body1" fontSize={18}>
          Gender : {details?.gender}
        </Typography>
        <Typography marginTop={1} variant="body1" fontSize={18}>
          Salary : {details?.salary}
        </Typography>
        <Typography marginTop={1} variant="body1" fontSize={18}>
          Dead Line : {details?.deadline}
        </Typography>
      </Box>
      <Link to={`/job/apply/${details?.id}`}>
        <Button
          sx={{
            marginTop: 2,
            mb: 4,
            p: "5px 25px",
          }}
          variant="contained"
        >
          Apply for the Job
        </Button>
      </Link>
    </Container>
  );
}

export default RightSide;
