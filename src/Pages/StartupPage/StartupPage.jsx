import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { EfficiencyTab } from "./components/EfficiencyTab";
import { RisksTab } from "./components/RisksTab";

const StartupPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const renderContent = useMemo(() => {
    switch (currentTab) {
      case 0:
        return <EfficiencyTab />;
      case 1:
        return <RisksTab />;
      default:
        return <></>;
    }
  }, [currentTab]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          pt: "300px",
          flexDirection: "column",
          gap: "10px",
          borderRight: "1px solid #658DAF",
          background: "rgba(207, 226, 241, 0.5)",
          minWidth: "240px",
        }}
      >
        <Box p="20px">
          <Typography fontSize="20px" color="#7B7B7B" textAlign="center">
            Startup calculations
          </Typography>
        </Box>
        <Tabs
          value={currentTab}
          onChange={(e, newVal) => setCurrentTab(newVal)}
          orientation="vertical"
        >
          <Tab value={0} label="Startup efficiency" />
          <Tab value={1} label="Startup risks" />
        </Tabs>
      </Box>
      <Box sx={{ p: "30px 30px 40px 30px", width: "100%" }}>
        {renderContent}
      </Box>
    </Box>
  );
};

export default StartupPage;
