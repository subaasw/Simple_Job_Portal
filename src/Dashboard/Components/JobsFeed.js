import { FmdGood, MoreHoriz, Search } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Container,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function JobsFeed({ setDetails, posts }) {
  const [search, setSearch] = useState("");
  const [filterFeed, setFilterFeed] = useState([]);

  const fiterResult = () => {
    if (search !== "") {
      const newList = posts.filter((curElem) => {
        return Object.values([
          curElem.title,
          curElem.category,
          curElem.location,
          curElem.company_name,
        ])
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilterFeed(newList);
    } else {
      setFilterFeed(posts);
      setDetails(posts[0])
    }
  };

  useEffect(() => {
    fiterResult();
  }, [search]);

  useEffect(() => {
    fiterResult();
  }, [posts]);

  return (
    <Container>
      <Paper
        component="form"
        sx={{
          mt: 3,
          mb: 4,
          pr: 1,
          // height:"70px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            ml: 1,
            p: "5px 6px",
            flex: 1,
          }}
          placeholder="Search by keyword or name"
        />
        <Button
          onClick={() => fiterResult()}
          variant="contained"
          sx={{
            height: "100%",
            boxShadow: "none",
          }}
        >
          <Search />
        </Button>
      </Paper>
      <Typography fontWeight="bold" variant="h5" gutterBottom>
        Jobs For You
      </Typography>
      {filterFeed.map((post) => {
        return (
          <Card
            key={post.id}
            sx={{
              mr: 2,
              mb: 2,
              //   height:"200px"
              //   paddingBottom:"0px"
            }}
          >
            <CardActionArea onClick={()=>setDetails(post)} >
            <CardHeader
              component="div"
              avatar={<Avatar src=".Assets/" alt={post.company_name} />}
              action={<MoreHoriz />}
              title={post.company_name}
              subheader={post.title}
              titleTypographyProps={{
                fontWeight: "bold",
                fontSize: 22,
              }}
              subheaderTypographyProps={{
                fontSize: 13,
              }}
              sx={{
                paddingBottom: "0px",
                "&:hover": {
                  cursor:"pointer"
                },
              }}
            />
            <CardContent >
              <Typography
                textAlign="flex-start"
                gutterBottom
                variant="body2"
                color="textSecondary"
                sx={{
                  display:"block",
                  "&:hover": {
                    cursor:"pointer"
                  },
                }}
              >
                {post.desc}
              </Typography>
              <Stack marginTop={0.4} direction="row" spacing={1}>
                {[
                  `${post.employment_status}`,
                  `Min 1 year`,
                  `${post.experience}`,
                ].map((label, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      sx={{
                        backgroundColor: "#433ddd21",
                        color: "#433ddd",
                        fontWeight: "600",
                        fontSize: 10.8,
                      }}
                      label={label}
                    />
                  );
                })}
              </Stack>
              <Stack marginTop={0.2} direction="row" spacing={1}>
                <Chip
                  sx={{
                    border: "0px",
                  }}
                  //   color="info"
                  variant="outlined"
                  icon={<FmdGood fontSize="inherit" />}
                  label={post.location}
                />
                <Chip
                  sx={{
                    border: "0px",
                  }}
                  //    color="info"
                  variant="outlined"
                  label={post.salary}
                />
              </Stack>
            </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Container>
  );
}

export default JobsFeed;
