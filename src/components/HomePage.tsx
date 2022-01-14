import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  LoggedInUserDetails,
  CandidateDetails,
  IsCandidateDetails,
} from "../models/types/auth";
import { CandidateHomePage } from "./Home/CandidateHomePage";
import { RecruiterHomePage } from "./Home/RecruiterHomePage";

interface card {
  header: string;
  body: string;
}

interface HomeProps {
  LoginDetails?: LoggedInUserDetails;
}

const HomePage = (props: HomeProps) => {
  document.title = "Resume Git";

  const { LoginDetails } = props;
  const cards: card[] = [
    {
      header: "Salary Meter",
      body: "Click here to check your salary is on par with industry standards. Never settle for less when you worth better",
    },
    {
      header: "Remote Working",
      body: "Post pandemic, remote/hybrid model of working is normal. Enjoy the freedom. Upload resume to find one.",
    },
    {
      header: "Find a better work culture",
      body: `Don't like your boss? Just quitting is not a solution, find an empty employer with a good work culture.`,
    },
    {
      header: "Hot Skills Meter",
      body: "Why to work in fading technologies? Know which skills are in demand, upskill, get paid well",
    },
  ];
  if (LoginDetails && LoginDetails.userDetails) {
    if (IsCandidateDetails(LoginDetails.userDetails)) {
      return <CandidateHomePage LoginDetails={LoginDetails} />;
    } else {
      return <RecruiterHomePage />;
    }
  } else {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button variant="outlined">Post your Resume</Button>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button variant="text" href="/candidatelogin">
            Sign In
          </Button>
        </Box>
        <br />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          {cards.map((card) => (
            <Grid key={card.header} item xs={6} lg={3} md={4} sm={6}>
              <Card sx={{ minWidth: 200, maxWidth: 300 }}>
                <CardHeader sx={{ height: 20 }} title={card.header} />
                <CardContent>
                  <Typography variant="body1">{card.body}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default HomePage;
