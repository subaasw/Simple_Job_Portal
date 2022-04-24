import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../Firebaase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import {useNavigate} from "react-router-dom"

function ApplyForJob() {
  let navigate = useNavigate()
  const usersCollectionRef = collection(db, "users_CV");

  const [applyData, setApplydata] = useState({
    fullName: "",
    email: "",
    jobPosition: "",
  });

  const [docFile, setDocFile] = useState("");

  let curName, curValue;
  const onChangedHandler = (e) => {
    curName = e.target.name;
    curValue = e.target.value;
    setApplydata({ ...applyData, [curName]: curValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    uploadCV(docFile);
  };

  const createCV = async (url) => {
    await addDoc(usersCollectionRef, {...applyData,cvURL:url});
    navigate(-1)
  };

  const uploadCV = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => console.log(` wher are you ? =>  ${err}`),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // setApplydata({ ...applyData, cv: url });
          createCV(url);
        });
      }
    );
  };

  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Submit Your Details</Typography>
      <form
        onSubmit={onSubmitHandler}
        style={{
          marginTop: "20px",
          maxWidth: "550px",
        }}
      >
        <Stack spacing={3} direction="column">
          <TextField
            name="fullName"
            label="Full Name"
            value={applyData.fullName}
            onChange={onChangedHandler}
          />
          <TextField
            name="email"
            label="Email"
            value={applyData.email}
            onChange={onChangedHandler}
          />
          <TextField
            name="jobPosition"
            label="Job Position"
            value={applyData.jobPosition}
            onChange={onChangedHandler}
          />
          <label>Upload your CV:</label>
          <br />
          <input
            onChange={(e) => setDocFile(e.target.files[0])}
            style={{
              // height:"0px",
              marginTop: "10px",
            }}
            type="file"
          />

          <Button type="submit" variant="contained">
            Submit Form
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default ApplyForJob;
