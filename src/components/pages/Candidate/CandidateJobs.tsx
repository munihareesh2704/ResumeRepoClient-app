import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { SavedAndAppliedJobs } from "./SavedAndAppliedJobs";
import { SearchJobs } from "./SearchJobs";

export const CandidateJobs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Search Jobs" id="search-jobs" />
          <Tab label="Jobs" id="applied-jobs" />
        </Tabs>
      </Box>
      {value === 0 && <SearchJobs />}
      {value === 1 && <SavedAndAppliedJobs />}
    </>
  );
};
