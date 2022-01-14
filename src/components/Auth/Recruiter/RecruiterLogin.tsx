import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Paper,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { navigationPaths } from "../../../routes/Route";
import { GetProfile, SignIn } from "../../../services/Recruiter/auth";
import { RecruiterProfile } from "../../../models/RecruiterProfile";
import { useSnackbar } from "notistack";
import {
  LoggedInUserDetails,
  RecruiterDetails,
} from "../../../models/types/auth";
import { useNavigate } from "react-router-dom";

interface RecruiterSignInState {
  userId: string;
  password: string;
}

interface SignInResponse {
  isActive: boolean;
  isMatched: boolean;
  isUserExists: boolean;
}

const initialState: RecruiterSignInState = {
  userId: "",
  password: "",
};

interface LoginPageProps {
  OnLoginSuccess(userDetails: LoggedInUserDetails): void;
}

export const RecruiterLogin = ({ OnLoginSuccess }: LoginPageProps) => {
  const uniqueId = uuid();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(initialState);

  const onInPutChange = (e: any) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
  };

  const onSignin = (e: any) => {
    e.preventDefault();
    const onSuccess = (response: SignInResponse) => {
      if (response) {
        if (response.isUserExists) {
          if (response.isMatched) {
            if (response.isActive) {
              enqueueSnackbar("Successfully signed in.", {
                variant: "success",
              });
              // Get User Details
              UpdateUserSession();
            } else {
              enqueueSnackbar("Profile is not activated yes.", {
                variant: "info",
              });
            }
          } else {
            enqueueSnackbar("Incorrect Password", { variant: "error" });
          }
        } else {
          enqueueSnackbar("No profile exists, Please create profile", {
            variant: "warning",
          });
        }
      } else {
        enqueueSnackbar("No profile exists, Please create profile", {
          variant: "warning",
        });
      }
      console.log(response);
    };

    const onError = (error: any) => {
      console.log(error);
    };

    SignIn(signIn, onSuccess, onError);
  };

  const UpdateUserSession = () => {
    const onSuccess = (response: RecruiterDetails) => {
      const userDetails: LoggedInUserDetails = {
        userDetails: response,
        IsGoogleAuthenticated: false,
      };
      enqueueSnackbar("Recruiter details fetched successfully", {
        variant: "success",
      });
      OnLoginSuccess(userDetails);
      navigate(navigationPaths.HomePage);
    };
    const onError = (error: any) => {
      enqueueSnackbar("Error while fetching ", { variant: "success" });
      console.log('Error while fetching Recruiter details');
      console.log(error);
    };
    GetProfile(signIn.userId, onSuccess, onError);
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper variant="outlined" sx={{ padding: 3, width: 400 }}>
        <Typography
          component="h1"
          variant="h5"
          color="primary"
          fontWeight="bold"
        >
          Employer Sign In
        </Typography>
        <Box component="form" onSubmit={onSignin} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id={uniqueId + "userId"}
            label="userId Id"
            name="userId"
            type="userId"
            size="small"
            value={signIn.userId}
            margin="normal"
            onChange={onInPutChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            id={uniqueId + "password"}
            label="Password"
            name="password"
            type="password"
            size="small"
            value={signIn.password}
            onChange={onInPutChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href={navigationPaths.RecruiterPasswordReset}
                variant="body2"
              >
                Reset password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={navigationPaths.RecruiterSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
