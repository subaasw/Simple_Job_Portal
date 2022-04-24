import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState,useContext } from "react";
import NavBar from "../Components/NavBar";
import { db } from "../Firebaase/firebase-config";
import { addDoc, collection } from "firebase/firestore";


function PostJob() {
  

  const jobPostCollectionRef = collection(db, "jobs_post");

  const [jobPostData, setJobPostData] = useState({
    title: "",
    company_name: "",
    employment_status: "",
    noOfVacancy: "",
    gender: "",
    category: "",
    desc: "",
    responsibilities: "",
    experience: "",
    location: "",
    salary: "",
    deadline: "",
  });
// console.log(email);
  let curname, curvalue;
  const onChangedHandler = (e) => {
    curname = e.target.name;
    curvalue = e.target.value;
    setJobPostData({ ...jobPostData, [curname]: curvalue });
  };

  const submitData = (e) => {
    e.preventDefault();
    const {
      title,
      company_name,
      employment_status,
      noOfVacancy,
      gender,
      category,
      desc,
      responsibilities,
      experience,
      location,
      salary,
      deadline,
    } = jobPostData;
    if (
      title !== "" &&
      company_name !== "" &&
      employment_status !== "" &&
      noOfVacancy !== "" &&
      gender !== "" &&
      category !== "" &&
      desc !== "" &&
      responsibilities !== "" &&
      experience !== "" &&
      location !== "" &&
      salary !== "" &&
      deadline !== ""
    ) {
      const postToDatabase = async () => {
        try {
          await addDoc(jobPostCollectionRef, jobPostData);
          setJobPostData({
            title: "",
            company_name: "",
            employment_status: "",
            noOfVacancy: "",
            gender: "",
            category: "",
            desc: "",
            responsibilities: "",
            experience: "",
            location: "",
            salary: "",
            deadline: "",
          });
        } catch (e) {
          console.log(e.message);
        }
      };
      postToDatabase();
    }
    else{
      alert("Please fill all the fields")
    }
  };

  return (
    <>
      <NavBar isLoggedIn={true} />

      <Container
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Post a Job
        </Typography>
        <Stack marginBottom={4} spacing={3} direction="column">
          <TextField
            name="title"
            value={jobPostData.title}
            onChange={onChangedHandler}
            label="Title"
          />
          <TextField
            name="company_name"
            value={jobPostData.company_name}
            onChange={onChangedHandler}
            label="Company Name"
          />

          <FormControl fullWidth>
            <InputLabel>Employment status</InputLabel>
            <Select
              name="employment_status"
              value={jobPostData.employment_status}
              label="Employment status"
              onChange={onChangedHandler}
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Freelancer">Freelancer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="noOfVacancy"
            value={jobPostData.noOfVacancy}
            onChange={onChangedHandler}
            label="No. of Vacancy"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={jobPostData.gender}
              label="Gender"
              onChange={onChangedHandler}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Any">Any</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={jobPostData.category}
              label="Category"
              onChange={onChangedHandler}
            >
              <MenuItem value="Web Design">Web Design</MenuItem>
              <MenuItem value="Graphics Design">Graphics Design</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Software Engineering">
                Software Engineering
              </MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="desc"
            value={jobPostData.desc}
            onChange={onChangedHandler}
            label="Description"
            multiline
            rows={7}
          />
          <TextField
            name="responsibilities"
            value={jobPostData.responsibilities}
            onChange={onChangedHandler}
            label="Responsibilities"
            multiline
            rows={7}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Experience</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="experience"
              value={jobPostData.experience}
              label="Experience"
              onChange={onChangedHandler}
            >
              <MenuItem value="junior">Junior </MenuItem>
              <MenuItem value="mid">Mid</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="location"
            value={jobPostData.location}
            onChange={onChangedHandler}
            label="Job Location"
            placeholder="Ghorahi-15,Dang"
          />
          <TextField
            name="salary"
            value={jobPostData.salary}
            onChange={onChangedHandler}
            label="Salary"
          />
          <TextField
            name="deadline"
            value={jobPostData.deadline}
            onChange={onChangedHandler}
            label="Application deadline"
            placeholder="for eg. 2022-10-01"
          />
          <Button
            onClick={submitData}
            sx={{
              maxWidth: "120px",
              fontSize: "20px",
              height: "50px",
            }}
            variant="contained"
          >
            Post
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default PostJob;
