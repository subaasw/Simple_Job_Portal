import {
  BusinessCenter,
  Edit,
  Home,
  Inbox,
  LogoutOutlined,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useContext } from "react";
import JobsFeed from "./Components/JobsFeed";
import RightSide from "./Components/RightSide";
import { db } from "../Firebaase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  feed: {
    backgroundColor: "rgb(240, 240, 240)",
  },
}));
function JobsDashboard({setCurrentUser}) {
  const navigate = useNavigate();

  const classes = useStyles();

  const postCollectionRef = collection(db, "jobs_post");
  const userCollectionRef = collection(db, "users_data");
  const companyCollectionRef = collection(db, "company_data");
  const userEmail = JSON.parse(localStorage.getItem("user"));

  const [posts, setPost] = useState([]);
  const [isCompany, setIsCompany] = useState(false);
  const [userORcompanyData, setUserOrCompanyData] = useState({});
  const [details, setDetails] = useState({});

  // console.log("From Daashboard");
  // console.log(email);

  useEffect(() => {
    const getUsersData = async () => {
      const totalUsers = [];

      try {
        const data = await getDocs(userCollectionRef);

        totalUsers.push(
          data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((user) => user.email === userEmail)
        );

        if (totalUsers[0] == "") {
          const totalCompany = [];
          try {
            const cData = await getDocs(companyCollectionRef);
            totalCompany.push(
              cData.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))
                .filter((user) => user.email === userEmail)
            );
            setIsCompany(true);
            setUserOrCompanyData(totalCompany[0][0]);
          } catch (e) {
            alert(e.message);
          }
        } else {
          setIsCompany(false);
          setUserOrCompanyData(totalUsers[0][0]);
          // console.log(totalUsers);
        }
      } catch (e) {
        alert(e.message);
      }
    };

    getUsersData();
  }, []);

  useEffect(() => {
    const getpostData = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (e) {
        alert(e.message);
      }
    };
    getpostData();
  }, []);

  return (
    <Grid container>
      <Grid item lg={2.6}>
        <Container
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            height: "630px",
            // justifyItems:"space-around"
          }}
        >
          <Toolbar
            sx={{
              height: 100,
              marginBottom: "25px",
            }}
          >
            <img
              height="80px"
              width="150px"
              src="./Assets/logo_.png"
              alt="Company logo"
            />
          </Toolbar>

          <List
            sx={{
              flexGrow: 1,
              width: "250px",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {isCompany && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/post-job")}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Post Job" />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BusinessCenter />
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="My Activity" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  setCurrentUser(null)
                  localStorage.clear();
                }}
              >
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={
                    isCompany
                      ? "./Assets/undraw_coming_home_re_ausc.svg"
                      : userORcompanyData.gender == "Male"
                      ? "./Assets/male.svg"
                      : "./Assets/undraw_female_avatar_w3jk.svg"
                  }
                  alt="Profile Image"
                />
              </ListItemAvatar>
              <ListItemText
                primary={userORcompanyData.name}
                secondary={
                  isCompany
                    ? userORcompanyData.location
                    : userORcompanyData.position
                }
              ></ListItemText>
            </ListItem>
          </List>
        </Container>
      </Grid>
      <Grid className={classes.feed} item lg={5.1}>
        {posts ? <JobsFeed setDetails={setDetails} posts={posts} /> : ""}
      </Grid>
      <Grid item lg={4.2}>
        <RightSide details={details} />
      </Grid>
    </Grid>
  );
}

export default JobsDashboard;
