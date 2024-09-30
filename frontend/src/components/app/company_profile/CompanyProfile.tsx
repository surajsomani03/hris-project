import { AppBar, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CompanyAddress from "./CompanyAddress";
import CompanyPolicies from "./CompanyPolicies";
import Overview from "./Overview";
import TabPanel from "./TabPanel";

export default function CompanyProfile() {
  const [value, setValue] = useState(0);

  const handleTabs = (event: React.SyntheticEvent, value: number) => {
    setValue(value);
  };

  return (
    <>
      <AppBar position="relative" sx={{ mt: 2 }}>
        <Tabs textColor="inherit" value={value} onChange={handleTabs} centered>
          <Tab label="Overview" sx={{ color: "white" }} />
          <Tab label="Address" sx={{ color: "white" }} />
          <Tab label="Policies" sx={{ color: "white" }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompanyAddress />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CompanyPolicies />
      </TabPanel>
    </>
  );
}
