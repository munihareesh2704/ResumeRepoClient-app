import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
import { CandidateLogin } from "./components/Auth/CandidateLogin";
import { SnackbarProvider } from "notistack";
import { AppHeader } from "./components/Header";
import { LoggedInUserDetails } from "./models/types/auth";
import { CandidateJobs } from "./components/pages/Candidate/CandidateJobs";
import { AddJob } from "./components/pages/Recruiter/AddJob";
import { navigationPaths } from "./routes/Route";
import { RecruiterLogin } from "./components/Auth/Recruiter/RecruiterLogin";
import { RecruiterSignUp } from "./components/Auth/Recruiter/SignUp";
import { ResetRecruiterPassword } from "./components/Auth/Recruiter/ResetPassword";
import {
  ClearStorage,
  GetLoggedInUserDetails,
  SetLoggedInUserDetails,
} from "./AuthStore";
import { SearchResumes } from "./components/pages/Recruiter/SearchResumes";
import { RecruiterHomePage } from "./components/Home/RecruiterHomePage";

const maxNotifications: number = 5;

function App() {
  const [userDetails, setUserDetails] = useState<LoggedInUserDetails>({
    IsGoogleAuthenticated: false,
  });

  useEffect(() => {
    updateUserDetailsFromStorage();
  }, []);

  const updateUserDetailsFromStorage = () => {
    const currentLoggedInUser = GetLoggedInUserDetails();
    setUserDetails(currentLoggedInUser);
  };

  const onLogout = () => {
    ClearStorage();
    setUserDetails({
      IsGoogleAuthenticated: false,
    });
    updateUserDetailsFromStorage();
    window.location.reload();
  };

  const onLoginSuccess = (userDetails: LoggedInUserDetails) => {
    setUserDetails(userDetails);
    SetLoggedInUserDetails(userDetails);
  };

  return (
    <SnackbarProvider
      maxSnack={maxNotifications}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Router>
        <Container sx={{ width: "100%" }}>
          <AppHeader OnLogout={onLogout} LoginDetails={userDetails} />
          <br />
          <Routes>
            <Route
              path={navigationPaths.RecruiterLogin}
              element={<RecruiterLogin OnLoginSuccess={onLoginSuccess} />}
            />
            <Route
              path={navigationPaths.RecruiterSignUp}
              element={<RecruiterSignUp />}
            />
            <Route
              path={navigationPaths.RecruiterPasswordReset}
              element={<ResetRecruiterPassword />}
            />
            <Route
              path={navigationPaths.SearchJobs}
              element={<CandidateJobs />}
            />
            <Route
              path={navigationPaths.CandidateLogin}
              element={<CandidateLogin OnLoginSuccess={onLoginSuccess} />}
            />
            <Route
              path={navigationPaths.RecruiterAddJob}
              element={<AddJob />}
            />
            <Route
              path={navigationPaths.SearchResumes}
              element={<SearchResumes />}
            />
            <Route
              path={navigationPaths.RecruiterJobs}
              element={<RecruiterHomePage />}
            />
            <Route
              path={navigationPaths.HomePage}
              element={<HomePage LoginDetails={userDetails} />}
            />
          </Routes>
        </Container>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
