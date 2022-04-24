import React, { useEffect, useState } from "react";
import App from "./App";
import RegisterPage from "../User_Auth/Register_Page";
import LoginPage from "../User_Auth/Login";
import JobsDashboard from "../Dashboard/Jobs_Dashboard";
import PostJob from "../POST_JOB/PostJob";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CompanyRegister from "../User_Auth/CompanyRegister";
import Error404 from "../Components/404Error";
import ApplyForJob from "../ApplyForJob/ApplyForJob";
import About from "../Components/About";
import ContactUs from "../Components/ContactUs";

function Home() {
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  
  useEffect(()=>{
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
  },[currentUser])


  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const WelcomeAuth = ({ children }) => {
    return currentUser ? <Navigate to="/job-list" /> : children;
  };
  return (
    <BrowserRouter>
      
        <Routes>
          <Route
            path="/"
            element={
              <WelcomeAuth>
                <App />
              </WelcomeAuth>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/job-list"
            element={
              <RequiredAuth>
                <JobsDashboard setCurrentUser={setCurrentUser} />
              </RequiredAuth>
            }
          />
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
          <Route
            path="/post-job"
            element={
              <RequiredAuth>
                <PostJob />
              </RequiredAuth>
            }
          />
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route
            path="/job/apply/:id"
            element={
              <RequiredAuth>
                <ApplyForJob />
              </RequiredAuth>
            }
          />
          <Route path="*" element={<Error404 />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Home;
