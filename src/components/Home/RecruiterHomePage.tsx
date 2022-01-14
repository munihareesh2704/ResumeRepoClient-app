import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { AddJob } from "../pages/Recruiter/AddJob";
import { RecruiterJobs } from "../pages/Recruiter/Jobs";


export const RecruiterHomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Create Job" id="create-job" />
          <Tab label="My Jobs" id="my-jobs" />
        </Tabs>
      </Box>
      {value === 0 && <AddJob />}
      {value === 1 && <RecruiterJobs />}
    </>
  );
};
