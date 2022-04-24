import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import NavBar from './NavBar'

function ContactUs() {
  return (
    <>
    <NavBar />
    <div style={{
      display:"flex",
      flexDirection:"column",
      // justifyItems:"center",
      alignItems:"center",
      marginTop:4
    }}>
    <Typography gutterBottom color="primary" variant='h3'  >Contact US</Typography>
    <form style={{
      width:"300px"
    }} >
      <Stack spacing={2.0} direction="column" >
      <TextField label="Full Name" type="text" />
      <TextField label="Email" type="email" />
      <TextField label="Subject" type="text" />
      <TextField multiline rows={5}  label="Message Body" type="text" />
      <Button variant="contained">Submit</Button>
      </Stack>
    </form>
    </div>
    </>
  )
}

export default ContactUs